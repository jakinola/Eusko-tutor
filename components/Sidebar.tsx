
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.NEW, basque: 'Berria', french: 'Nouveau', icon: 'M12 4v16m8-8H4' },
    { id: View.HISTORY, basque: 'Historia', french: 'Historique', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: View.GRAMMAR, basque: 'Gramatika', french: 'Grammaire', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: View.SETTINGS, basque: 'Ezarpenak', french: 'Paramètres', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <aside className="w-64 bg-jakinola-blue text-white flex flex-col h-full shadow-2xl z-10">
      <div className="p-8 border-b border-blue-900 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-jakinola-yellow rounded-lg flex items-center justify-center">
            <span className="text-jakinola-blue font-bold text-2xl">E</span>
          </div>
          <div>
            <h2 className="text-xl font-serif leading-none">EuskoTutor</h2>
            <p className="text-[10px] text-blue-300 tracking-widest uppercase mt-1">Iparralde Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-jakinola-yellow text-jakinola-blue shadow-lg scale-[1.02]' 
                : 'hover:bg-blue-900 text-blue-100'
            }`}
          >
            <svg
              className={`w-6 h-6 ${currentView === item.id ? 'text-jakinola-blue' : 'text-blue-300'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <div className="text-left">
              <div className="font-bold text-sm leading-none">{item.basque}</div>
              <div className={`text-[11px] ${currentView === item.id ? 'text-jakinola-blue/70' : 'text-blue-400'}`}>
                {item.french}
              </div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-blue-900">
        <div className="flex items-center gap-3 p-3 bg-blue-900/50 rounded-xl">
          <img 
            src="https://picsum.photos/seed/principal/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-jakinola-yellow"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Jaun Zuzendaria</p>
            <p className="text-[10px] text-blue-300">Nivel A1 • Batua</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
