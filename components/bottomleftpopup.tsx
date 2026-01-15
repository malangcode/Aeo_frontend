"use client";

import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarClock,
  MessageSquareText,
  Settings,
  X,
  LogOut,
  TrendingUp,
  Workflow
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {useRouter} from "next/navigation";

const BottomLeftQuickPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {user, logout, loading} = useAuth();
  const router = useRouter();
  const visible = user?.authenticated;
  

  return (
    <>
    {visible && (
      <div className="fixed bottom-5 left-6 z-50">
      {/* Floating Button */}
  
      <button
        onClick={() => setOpen(true)}
        className="flex bg-white items-center flex-row animate-bounce [animation-duration:2s] gap-2 rounded-xl shadow-md p-2 pr-6"
      >

        {/* <Settings className="h-7 w-7 hover:text-slate-900 animate-spin [animation-duration:3s] cursor-pointer" /> */}
        <span className="h-9 w-9 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center ">{user?.username.toUpperCase().charAt(0)}</span>
        <p className="flex flex-col items-baseline">
          <span className="text-gray-600 text-sm font-bold">
            Account
          </span>
          <span className="text-[13px]">
            @{user?.username}
          </span>
        </p>
      </button>
    

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[80px] left-0 w-64 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b-gray-200 border-b">
              <span className="font-semibold text-sm">Quick Actions</span>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            {/* Options */}
            <div className="p-2 space-y-1">
              <PopupItem icon={TrendingUp} onClickAction={() => router.push("/analytics")} label="Analytics" />
              <PopupItem icon={CalendarClock} onClickAction={()=> router.push("/task-scheduling")} label="Schedule Task" />
              <PopupItem icon={Workflow} onClickAction={()=> router.push("/ai-page")} label="Workspace" />
              <PopupItem icon={MessageSquareText} onClickAction={()=> router.push("/faq")} label="FAQ" />
              <PopupItem icon={Settings} onClickAction={()=> router.push("/settings")} label="Settings" />
              <PopupItem icon={LogOut} onClickAction={logout} label={loading ? "Loggingout...": "Logout"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    )}
    
    </>
  );
};

interface PopupItemProps {
  icon: React.ElementType;
  label: string;
  onClickAction: () => void;
}

const PopupItem: React.FC<PopupItemProps> = ({ icon: Icon, label, onClickAction }) => {
  return (
    <button onClick={onClickAction} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-50 transition">
      <Icon className="h-4 w-4 text-indigo-600" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default BottomLeftQuickPopup;
