import React, { useState, useEffect, useRef } from 'react';
import { apiRequest } from '../utils/api';
import { Send, Search, MoreVertical, Phone, Video, Info, User, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import GlobalLoader from '../components/GlobalLoader';

const MessagesPage = () => {
  const location = useLocation();
  const initialContact = location.state?.contact || null;
  
  const [contacts, setContacts] = useState(initialContact ? [initialContact] : []);
  const [activeContact, setActiveContact] = useState(initialContact);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (activeContact) {
      fetchMessages(activeContact.id);
      const interval = setInterval(() => fetchMessages(activeContact.id), 5000); // Poll every 5s
      return () => clearInterval(interval);
    }
  }, [activeContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchContacts = async () => {
    try {
      const data = await apiRequest('/chat-contacts');
      if (initialContact) {
        const exists = data.find(c => c.id === initialContact.id || c.email === initialContact.email);
        if (!exists) {
          setContacts([initialContact, ...data]);
        } else {
          setContacts(data);
          setActiveContact(exists);
        }
      } else {
        setContacts(data);
        if (data.length > 0 && !activeContact) {
          setActiveContact(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const data = await apiRequest(`/messages/${contactId}`);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    const tempMsg = {
      id: Date.now(),
      sender_id: 'me', // Temporary ID for immediate UI update
      message: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, tempMsg]);
    setNewMessage('');

    try {
      await apiRequest('/messages', {
        method: 'POST',
        body: JSON.stringify({ receiver_id: activeContact.id, message: tempMsg.message }),
      });
      fetchMessages(activeContact.id);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredContacts = contacts.filter(c => 
    c.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <GlobalLoader message="Loading Cloudfire messages..." />;

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* Sidebar - Contacts List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-50 flex flex-col bg-gray-50/20">
        <div className="p-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Messages</h1>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-[24px] border border-gray-100 focus:border-[#ff7301] outline-none transition-all text-xs font-medium shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-8">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full flex items-center gap-4 p-4 rounded-[28px] transition-all cursor-pointer group ${
                activeContact?.id === contact.id ? 'bg-white shadow-md border-gray-50' : 'hover:bg-white/40'
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-[20px] bg-gray-100 flex items-center justify-center text-lg border border-white">
                  {contact.profile_image_url ? (
                    <img src={contact.profile_image_url} alt="" className="w-full h-full object-cover rounded-[20px]" />
                  ) : (
                    <User size={18} className="text-gray-400" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`text-xs font-semibold truncate ${activeContact?.id === contact.id ? 'text-gray-900' : 'text-gray-700'}`}>
                    {contact.full_name}
                  </h3>
                  <span className="text-[9px] text-gray-400 font-medium">12:30 PM</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate font-medium">Preview message...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="px-10 py-5 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  {activeContact.profile_image_url ? (
                    <img src={activeContact.profile_image_url} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <User size={16} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">{activeContact.full_name}</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">Active now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeContact.mobile ? (
                  <a href={`tel:${activeContact.mobile}`} className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-all text-xs font-bold text-gray-700">
                    <Phone size={14} className="text-gray-400" />
                    <span>{activeContact.mobile}</span>
                  </a>
                ) : (
                  <span className="text-xs font-medium text-gray-400 italic px-2">No phone number</span>
                )}
                <button className="p-2.5 text-gray-400 hover:text-gray-900 transition-all cursor-pointer"><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-gray-50/10">
              {messages.map((msg, idx) => {
                const amITheSender = msg.sender_id !== activeContact.id;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${amITheSender ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[65%]">
                      <div className={`
                        px-6 py-4 rounded-[28px] text-[13px] font-medium leading-relaxed
                        ${amITheSender 
                          ? 'bg-gray-900 text-white rounded-tr-none' 
                          : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'}
                      `}>
                        {msg.message}
                      </div>
                      <div className={`flex items-center gap-1.5 mt-2.5 px-2 ${amITheSender ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {amITheSender && (
                          <CheckCheck size={12} className="text-[#ff7301]" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-8 border-t border-gray-50">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message ${activeContact.full_name.split(' ')[0]}...`}
                    className="w-full px-8 py-4 bg-gray-50 border border-gray-100 focus:border-[#ff7301] focus:bg-white rounded-[24px] outline-none transition-all text-sm font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gray-900 text-white px-8 rounded-[24px] shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-xs font-semibold"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/10">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-center text-3xl mb-8">💬</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h2>
            <p className="text-gray-400 max-w-xs text-xs font-medium leading-relaxed">Choose a recruiter or contact from the sidebar to view your message history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
