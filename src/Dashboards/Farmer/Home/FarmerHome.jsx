import React, { useState } from 'react';
import {
  LayoutGrid,
  Sprout,
  Bug,
  ShoppingBag,
  Store,
  Users,
  HelpCircle,
  FileText,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon
} from 'lucide-react';
import Dashboard from './Dashboard/Dashboard';
import { GenericContent } from './GenericContent';
import './farmstyles.css';
import MyCrops from './MyCrops/MyCrops';
import Pesticides from './Pesticides/Pesticides';
import Documents from './Documents/Documents';
import DiseaseDetection from './DiseaseDetection/DiseaseDetection';
import Support from './Support/Support';
import CommunityForum from './CommunityForum/CommunityForum';
import Market from './Market/Market';
import Profile from './Profile/Profile';

function FarmerHome() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCattleMode, setIsCattleMode] = useState(false);

  const menuItems = [
    { icon: <LayoutGrid size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <ShoppingBag size={20} />, label: 'Pesticides', id: 'pesticides' },
    { icon: <Bug size={20} />, label: 'Disease-Detection', id: 'disease' },
    { icon: <Sprout size={20} />, label: 'My Crops', id: 'crops' },
    { icon: <FileText size={20} />, label: 'Documents', id: 'documents' },
    { icon: <Store size={20} />, label: 'Market', id: 'market' },
    { icon: <Users size={20} />, label: 'Community Forum', id: 'forum' },
    { icon: <HelpCircle size={20} />, label: 'Support', id: 'support' },
    
    { icon: <User size={20} />, label: 'Profile', id: 'profile' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    window.location.href = '/';
  };

  const handleCattleSwitch = () => {
    setIsCattleMode(!isCattleMode);
    window.location.href = '/cattle';
  };

  const handleNavigation = (id) => {
    setActiveItem(id);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'pesticides':
        return <Pesticides onNavigate={handleNavigation} />;
      case 'disease':
        return <DiseaseDetection onNavigate={handleNavigation} />;
      case 'crops':
        return <MyCrops onNavigate={handleNavigation} />;
      case 'market':
        return <Market onNavigate={handleNavigation} />;
      case 'forum':
        return <CommunityForum onNavigate={handleNavigation} />;
      case 'support':
        return <Support onNavigate={handleNavigation} />;
      case 'documents':
        return <Documents onNavigate={handleNavigation} />;
      case 'profile':
        return <Profile onNavigate={handleNavigation} />;
      default:
        return <GenericContent />;
    }
  };

  return (
    <div className="h-screen w-full flex relative overflow-hidden bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="absolute left-0 top-0 w-[600px] h-screen pointer-events-none">
        <div className="gradient-ball w-[400px] h-[400px] -top-20 -left-20 from-blue-400 to-purple-500"></div>
        <div className="gradient-ball w-[350px] h-[350px] top-1/3 -left-10 from-green-300 to-emerald-500"></div>
        <div className="gradient-ball w-[450px] h-[450px] top-2/3 -left-32 from-yellow-300 to-orange-500"></div>
      </div>
      
      <div className={`glass rounded-3xl m-4 transition-all duration-300 flex flex-col z-10 h-[calc(100vh-2rem)] ${isExpanded ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dzymyjltu/image/upload/v1738604827/WhatsApp_Image_2025-02-03_at_23.16.45_88a860de_pgp8in.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              {isExpanded && (
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium text-sm">Hello Aarthi</span>
                  <span className="text-gray-600 text-xs">12.5 Acers(ac)</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-700 hover:bg-white/40 rounded-lg p-1 transition-colors"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Cattle Switch Card */}
          <div 
            onClick={handleCattleSwitch}
            className="mb-6 cursor-pointer"
          >
            <div className={`relative rounded-xl p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden group ${!isExpanded ? 'p-2' : ''}`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Moon size={isExpanded ? 24 : 20} className="text-white" />
                  <div className={`absolute ${isCattleMode ? 'bg-green-400' : 'bg-gray-600'} w-2 h-2 rounded-full -top-0.5 -right-0.5`}></div>
                </div>
                {isExpanded && (
                  <div>
                    <p className="font-medium text-sm">Switch to Cattle</p>
                    <p className="text-xs text-white/80">Manage your cattle</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 rounded-lg p-2 transition-colors ${
                  activeItem === item.id 
                    ? 'bg-white/50 text-gray-800 font-medium shadow-sm' 
                    : 'text-gray-700 hover:bg-white/30'
                }`}
              >
                {item.icon}
                {isExpanded && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-300/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-gray-700 hover:bg-white/30 rounded-lg p-2 transition-colors"
          >
            <LogOut size={20} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto content-scroll">
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default FarmerHome;