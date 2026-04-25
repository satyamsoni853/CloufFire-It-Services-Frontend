import React, { useState } from 'react';
import { apiRequest } from '../utils/api';
import toast from 'react-hot-toast';
import { Lock, Trash2, Mail, Save } from 'lucide-react';

const SettingsPage = () => {
  const [passwords, setPasswords] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await apiRequest('/change-password', {
        method: 'PUT',
        body: JSON.stringify({
          current_password: passwords.current_password,
          new_password: passwords.new_password
        })
      });
      toast.success(data.message);
      setPasswords({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    try {
      await apiRequest('/account', { method: 'DELETE' });
      toast.success('Account deleted successfully');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    } catch (err) {
      toast.error('Failed to delete account');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Lock size={20} /></div>
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
              <input type="password" required value={passwords.current_password} onChange={(e) => setPasswords({...passwords, current_password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <input type="password" required minLength="6" value={passwords.new_password} onChange={(e) => setPasswords({...passwords, new_password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
              <input type="password" required minLength="6" value={passwords.confirm_password} onChange={(e) => setPasswords({...passwords, confirm_password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7301] focus:ring-2 focus:ring-[#ff7301]/20 outline-none transition-all" />
            </div>
            <button disabled={loading} type="submit" className="flex items-center gap-2 bg-[#ff7301] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all cursor-pointer">
              <Save size={18} /> {loading ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Mail size={20} /></div>
          <h2 className="text-xl font-bold text-gray-900">Email Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-[#ff7301] border-gray-300 focus:ring-[#ff7301]" defaultChecked />
            <span className="text-gray-700 font-medium">Receive job alerts and recommendations</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded text-[#ff7301] border-gray-300 focus:ring-[#ff7301]" defaultChecked />
            <span className="text-gray-700 font-medium">Receive platform updates and news</span>
          </label>
          <button className="mt-4 flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all cursor-pointer">
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-red-100 flex items-center gap-3 bg-red-50">
          <div className="p-2 bg-white text-red-600 rounded-lg"><Trash2 size={20} /></div>
          <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button onClick={handleDeleteAccount} className="flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-200 transition-all cursor-pointer border border-red-200">
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
