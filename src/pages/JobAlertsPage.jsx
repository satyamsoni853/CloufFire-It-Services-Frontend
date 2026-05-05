import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { Bell, Search, MapPin, Briefcase, DollarSign, Plus, Trash2, ShieldCheck, Mail, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import GlobalLoader from '../components/GlobalLoader';

const JobAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    keyword: '',
    location: '',
    category: 'Software Development',
    min_salary: '',
    frequency: 'Daily'
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await apiRequest('/job-alerts');
      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/job-alerts', {
        method: 'POST',
        body: JSON.stringify(newAlert)
      });
      toast.success("Job alert created successfully!");
      setShowCreateModal(false);
      fetchAlerts();
      setNewAlert({ keyword: '', location: '', category: 'Software Development', min_salary: '', frequency: 'Daily' });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create alert");
    }
  };

  if (loading) return <GlobalLoader message="Loading Cloudfire job alerts..." />;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Job Alerts</h1>
          <p className="text-gray-500 font-medium">Get notified when new jobs match your preferences.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#ff7301] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <Plus size={20} /> Create New Alert
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff7301] shrink-0 border border-orange-100">
                      <Bell size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{alert.keyword || 'Any Position'}</h3>
                      <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-gray-300"/> {alert.location || 'Anywhere'}</span>
                        <span className="flex items-center gap-2"><Briefcase size={14} className="text-gray-300"/> {alert.category}</span>
                        <span className="flex items-center gap-2 text-[#ff7301]"><Mail size={14}/> {alert.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {alerts.length === 0 && (
            <div className="bg-white p-20 rounded-[40px] border border-dashed border-gray-200 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">No alerts configured</h3>
              <p className="text-gray-400 font-medium max-w-sm mx-auto mb-8">Set up personalized job alerts to stay ahead of the competition.</p>
              <button onClick={() => setShowCreateModal(true)} className="text-[#ff7301] font-black uppercase tracking-[0.2em] text-xs hover:underline cursor-pointer">Create your first alert</button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
        
         
            
    

          <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Pro Tips</h4>
            <ul className="space-y-4">
              <ProTip text="Use specific keywords like 'React Developer' instead of just 'Developer'." />
              <ProTip text="Set frequency to 'Daily' for competitive markets." />
              <ProTip text="Include remote as a location to expand your search." />
            </ul>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl border border-white"
          >
            <div className="p-10 border-b border-gray-50 bg-gradient-to-br from-gray-900 to-black text-white">
              <h2 className="text-2xl font-bold font-serif">Create Job Alert</h2>
              <p className="text-gray-400 text-sm mt-2 font-medium">Personalize your notification criteria</p>
            </div>
            <form onSubmit={handleCreateAlert} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Keywords" icon={<Search size={16}/>} value={newAlert.keyword} onChange={(v) => setNewAlert({...newAlert, keyword: v})} placeholder="e.g. React Developer" />
                <InputGroup label="Location" icon={<MapPin size={16}/>} value={newAlert.location} onChange={(v) => setNewAlert({...newAlert, location: v})} placeholder="e.g. New York or Remote" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Category</label>
                <select 
                  value={newAlert.category}
                  onChange={(e) => setNewAlert({...newAlert, category: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-sm"
                >
                  <option>Software Development</option>
                  <option>Design & UX</option>
                  <option>Marketing</option>
                  <option>Data Science</option>
                  <option>Product Management</option>
                </select>
              </div>

              <div className="flex gap-6">
                <div className="flex-1 space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Frequency</label>
                   <div className="flex gap-2">
                     {['Daily', 'Weekly'].map(f => (
                       <button
                         key={f}
                         type="button"
                         onClick={() => setNewAlert({...newAlert, frequency: f})}
                         className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border-2 ${newAlert.frequency === f ? 'bg-[#ff7301] text-white border-[#ff7301]' : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
                       >
                         {f}
                       </button>
                     ))}
                   </div>
                </div>
                <InputGroup label="Min. Salary (Annual)" icon={<DollarSign size={16}/>} value={newAlert.min_salary} onChange={(v) => setNewAlert({...newAlert, min_salary: v})} placeholder="e.g. 80k" />
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-4 text-gray-500 font-bold text-sm hover:bg-gray-50 rounded-2xl transition-all">Cancel</button>
                <button type="submit" className="flex-[2] bg-[#ff7301] text-white py-4 rounded-2xl font-bold shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95">Create Alert</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ProTip = ({ text }) => (
  <li className="flex gap-3 items-start">
    <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center text-[#ff7301] shrink-0 mt-0.5">
      <Sliders size={12} />
    </div>
    <span className="text-xs font-medium text-gray-600 leading-relaxed">{text}</span>
  </li>
);

const InputGroup = ({ label, icon, value, onChange, placeholder }) => (
  <div className="space-y-2 flex-1">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#ff7301] transition-colors">{icon}</div>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#ff7301] focus:bg-white rounded-2xl pl-12 pr-6 py-4 outline-none transition-all font-bold text-sm placeholder:text-gray-300"
      />
    </div>
  </div>
);

export default JobAlertsPage;
