import React, { useState } from 'react';
import { Copy, Plus, Search, FileText, MoreVertical, Edit, Trash2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const TEMPLATES = [
  { id: 1, title: 'Senior React Developer', category: 'Frontend', description: 'We are looking for an experienced React developer with 5+ years of experience in building large scale applications...' },
  { id: 2, title: 'Backend Python Engineer', category: 'Backend', description: 'Join our backend team to build robust APIs using FastAPI and PostgreSQL...' },
  { id: 3, title: 'Product UI/UX Designer', category: 'Design', description: 'Looking for a creative designer with a strong portfolio in mobile and web design...' },
];

const JobTemplatesPage = () => {
  const [templates, setTemplates] = useState(TEMPLATES);
  const [search, setSearch] = useState('');

  const handleUseTemplate = (template) => {
    toast.success(`Loaded "${template.title}" template`);
    // Logic to redirect to post job page with pre-filled data
  };

  const filtered = templates.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Job Templates</h1>
          <p className="text-gray-500 font-medium">Save and reuse your most common job descriptions.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-gray-100 hover:bg-gray-800 transition-all flex items-center gap-2 active:scale-95 cursor-pointer">
          <Plus size={20} /> Create New Template
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
        <input 
          type="text" 
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-[#ff7301] transition-all font-medium text-sm shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(template => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff7301] shrink-0 border border-orange-100">
                <Layers size={20} />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-[#ff7301] transition-colors"><Edit size={16}/></button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
            <p className="text-[10px] font-black text-[#ff7301] uppercase tracking-widest mb-4">{template.category}</p>
            <p className="text-sm text-gray-400 font-medium line-clamp-3 mb-8 flex-1">{template.description}</p>
            
            <button 
              onClick={() => handleUseTemplate(template)}
              className="w-full bg-gray-50 text-gray-900 py-4 rounded-xl font-bold text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Copy size={14} /> Use This Template
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobTemplatesPage;
