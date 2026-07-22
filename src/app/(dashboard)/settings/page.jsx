"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Trash2,
  Mail,
  Lock,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "profile", title: "Profile Settings", icon: User, desc: "Personal info & details" },
  { id: "notifications", title: "Notifications", icon: Bell, desc: "Hiring alerts & email updates" },
  { id: "security", title: "Password & Security", icon: Shield, desc: "Access settings & security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState(false);

  // Notification States
  const [notifs, setNotifs] = useState({
    candidateApplied: true,
    interviewReminder: true,
    weeklyReport: false,
    securityAlerts: true,
  });

  const toggleNotif = (key) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your HireTrack account configuration and workspace preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1 border border-border/40 rounded-xl bg-card/60 p-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left flex items-start gap-3 rounded-lg p-2.5 outline-none transition-all ${isActive
                    ? "bg-secondary text-secondary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <div className={`p-1.5 rounded-md border border-border/40 shrink-0 ${isActive ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground"
                  }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-tight">{tab.title}</p>
                  <p className="text-[10px] text-muted-foreground/80 mt-0.5 truncate leading-none">{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1 w-full border border-border/40 rounded-xl bg-card overflow-hidden">

          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="divide-y divide-border/20">
              <div className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border/20 pb-2">Profile Information</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                    <Input defaultValue="Rhythm Sharma" placeholder="Your Name" className="border-border/40" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Recruiter Role</label>
                    <Input defaultValue="Senior Talent Partner" placeholder="Role" className="border-border/40" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                    <Input defaultValue="rhythm@hiretrack.com" disabled className="pl-9 bg-muted border-border/30 opacity-70 cursor-not-allowed" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/60">Contact support to modify your organization email.</span>
                </div>
              </div>

              <div className="p-6 bg-muted/10 flex items-center justify-between gap-4">
                <div className="flex-1">
                  {saveStatus && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-fade-in">
                      <CheckCircle className="h-4 w-4" />
                      <span>Changes saved successfully</span>
                    </div>
                  )}
                </div>
                <Button type="submit" size="sm" className="h-8.5 px-4 font-semibold shrink-0">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="divide-y divide-border/20">
              <div className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border/20 pb-2">Notification Preferences</h3>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/30 bg-muted/10">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-foreground">New Candidates</span>
                      <p className="text-[10px] text-muted-foreground leading-normal">Email alerts immediately when a new candidate applies to your jobs.</p>
                    </div>

                    <button
                      onClick={() => toggleNotif("candidateApplied")}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 outline-none ${notifs.candidateApplied ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 mt-0.5 ${notifs.candidateApplied ? "translate-x-4.5" : "translate-x-0.5"
                        }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/30 bg-muted/10">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-foreground">Interview Reminders</span>
                      <p className="text-[10px] text-muted-foreground leading-normal">System and email notifications 15 minutes before scheduled reviews.</p>
                    </div>

                    <button
                      onClick={() => toggleNotif("interviewReminder")}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 outline-none ${notifs.interviewReminder ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 mt-0.5 ${notifs.interviewReminder ? "translate-x-4.5" : "translate-x-0.5"
                        }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/30 bg-muted/10">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-foreground">Weekly Digest</span>
                      <p className="text-[10px] text-muted-foreground leading-normal">Receive a consolidated weekly performance and funnel breakdown report.</p>
                    </div>

                    <button
                      onClick={() => toggleNotif("weeklyReport")}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 outline-none ${notifs.weeklyReport ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 mt-0.5 ${notifs.weeklyReport ? "translate-x-4.5" : "translate-x-0.5"
                        }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/10 flex justify-end">
                <Button size="sm" onClick={() => {
                  setSaveStatus(true);
                  setTimeout(() => setSaveStatus(false), 2000);
                }} className="h-8.5 px-4 font-semibold">
                  Update Preferences
                </Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleSave} className="divide-y divide-border/20">
              <div className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border/20 pb-2">Change Password</h3>

                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                      <Input type="password" placeholder="••••••••" className="pl-9 border-border/40" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">New Password</label>
                      <Input type="password" placeholder="Min. 8 characters" className="border-border/40" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Confirm New Password</label>
                      <Input type="password" placeholder="Confirm Password" className="border-border/40" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/10 flex items-center justify-between gap-4">
                <div className="flex-1">
                  {saveStatus && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-fade-in">
                      <CheckCircle className="h-4 w-4" />
                      <span>Password changed successfully</span>
                    </div>
                  )}
                </div>
                <Button type="submit" size="sm" className="h-8.5 px-4 font-semibold shrink-0">
                  Update Password
                </Button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Danger Zone Section */}
      <section className="rounded-xl border border-destructive/25 bg-destructive/5 p-6 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-destructive flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Danger Zone</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Permanently delete your personal profile data, configurations, and job applications.
            This action is irreversible.
          </p>
        </div>

        <Button
          variant="destructive"
          className="font-semibold text-xs h-8.5"
        >
          Delete Account
        </Button>
      </section>

    </div>
  );
}