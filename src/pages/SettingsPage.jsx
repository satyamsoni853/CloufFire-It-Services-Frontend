import React, { useState } from "react";
import { apiRequest, clearAuthTokens } from "../utils/api";
import toast from "react-hot-toast";
import {
  Lock,
  Trash2,
  Mail,
  Save,
  Shield,
  Eye,
  Moon,
  Bell,
} from "lucide-react";

const SettingsPage = () => {
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    job_alerts: true,
    platform_news: true,
    sms_notifications: false,
    profile_public: true,
    two_factor: false,
    dark_mode: false,
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = await apiRequest("/change-password", {
        method: "PUT",
        body: JSON.stringify({
          current_password: passwords.current_password,
          new_password: passwords.new_password,
        }),
      });
      toast.success(data.message);
      setPasswords({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
    toast.success("Preference updated");
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }
    try {
      await apiRequest("/account", { method: "DELETE" });
      toast.success("Account deleted successfully");
      clearAuthTokens();
      window.location.href = "/login";
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className=" py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">
          Account Settings
        </h1>
        <p className="text-gray-500">
          Manage your profile security, notifications, and privacy preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Security Section */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Security & Password
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Protect your account with a strong password.
                </p>
              </div>
            </div>
            <div className="p-8">
              <form onSubmit={handlePasswordChange} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.current_password}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          current_password: e.target.value,
                        })
                      }
                      className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff7301] focus:ring-4 focus:ring-[#ff7301]/5 outline-none transition-all font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength="6"
                        value={passwords.new_password}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            new_password: e.target.value,
                          })
                        }
                        className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff7301] focus:ring-4 focus:ring-[#ff7301]/5 outline-none transition-all font-medium"
                        placeholder="Min. 6 characters"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength="6"
                        value={passwords.confirm_password}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm_password: e.target.value,
                          })
                        }
                        className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff7301] focus:ring-4 focus:ring-[#ff7301]/5 outline-none transition-all font-medium"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center gap-2 bg-[#ff7301] text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-100 cursor-pointer"
                >
                  <Save size={18} />{" "}
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>

          {/* Communication Section */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shadow-sm">
                <Bell size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Communication Preferences
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Manage how you receive alerts and news.
                </p>
              </div>
            </div>
            <div className="p-8 space-y-2">
              <SettingToggle
                label="Job Alerts"
                desc="Daily emails about matching opportunities"
                active={preferences.job_alerts}
                onToggle={() => handlePreferenceChange("job_alerts")}
              />
              <SettingToggle
                label="Product News"
                desc="New features and platform improvements"
                active={preferences.platform_news}
                onToggle={() => handlePreferenceChange("platform_news")}
              />
              <SettingToggle
                label="SMS Alerts"
                desc="Critical interview and message reminders"
                active={preferences.sms_notifications}
                onToggle={() => handlePreferenceChange("sms_notifications")}
              />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50/30 rounded-[40px] border border-red-100 p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-white text-red-600 rounded-xl shadow-sm border border-red-50">
                <Trash2 size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-700">
                  Delete Account
                </h2>
                <p className="text-sm text-red-600/60 mt-1">
                  Once you delete your account, all your data will be
                  permanently wiped. There is no recovery.
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="w-full md:w-auto bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100 cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
            <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Eye className="text-[#ff7301]" size={20} /> Visibility
            </h3>
            <div className="space-y-8">
              <div>
                <SettingToggle
                  mini
                  label="Public Profile"
                  active={preferences.profile_public}
                  onToggle={() => handlePreferenceChange("profile_public")}
                />
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Allow employers to find you in the talent marketplace.
                </p>
              </div>
              <hr className="border-gray-50" />
              <div>
                <SettingToggle
                  mini
                  label="2-Step Verification"
                  active={preferences.two_factor}
                  onToggle={() => handlePreferenceChange("two_factor")}
                />
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Require an OTP code for every login attempt.
                </p>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
};

const SettingToggle = ({
  label,
  desc,
  active,
  onToggle,
  mini = false,
  dark = false,
}) => (
  <div
    className={`flex items-center justify-between gap-6 ${!mini ? "py-6 border-b border-gray-50 last:border-0 last:pb-0" : ""}`}
  >
    <div className="min-w-0">
      <p
        className={`font-bold ${dark ? "text-white" : "text-gray-900"} ${mini ? "text-sm" : "text-base"}`}
      >
        {label}
      </p>
      {desc && <p className="text-xs text-gray-400 mt-1 font-medium">{desc}</p>}
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out outline-none ${active ? (dark ? "bg-blue-500" : "bg-[#ff7301]") : "bg-gray-200"}`}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${active ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  </div>
);

export default SettingsPage;
