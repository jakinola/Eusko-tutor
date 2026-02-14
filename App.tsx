
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CorrectionForm from './components/CorrectionForm';
import CorrectionResultDisplay from './components/CorrectionResultDisplay';
import HistoryList from './components/HistoryList';
import GrammarPanel from './components/GrammarPanel';
import { View, CorrectionResult } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.NEW);
  const [history, setHistory] = useState<CorrectionResult[]>([]);
  const [lastResult, setLastResult] = useState<CorrectionResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('eusko-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleNewCorrection = (result: CorrectionResult) => {
    const newHistory = [result, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('eusko-history', JSON.stringify(newHistory));
    setLastResult(result);
  };

  const handleSelectHistoryItem = (item: CorrectionResult) => {
    setLastResult(item);
    setCurrentView(View.NEW);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Navigation */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-serif jakinola-blue mb-2">
              {currentView === View.NEW && "Berria / Nouveau"}
              {currentView === View.HISTORY && "Historia / Historique"}
              {currentView === View.GRAMMAR && "Gramatika / Grammaire"}
              {currentView === View.SETTINGS && "Ezarpenak / Paramètres"}
            </h1>
            <p className="text-gray-600 italic">
              Zure laguntzaile akademikoa — Votre assistant académique
            </p>
          </header>

          {/* View Content */}
          {currentView === View.NEW && (
            <div className="space-y-8">
              <CorrectionForm onResult={handleNewCorrection} />
              {lastResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CorrectionResultDisplay result={lastResult} />
                </div>
              )}
              {!lastResult && (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-xl">Agur! Zure euskarazko tutorea naiz. Nola lagun zaitzaket gaur?</p>
                </div>
              )}
            </div>
          )}

          {currentView === View.HISTORY && (
            <HistoryList 
              items={history} 
              onSelectItem={handleSelectHistoryItem} 
              onClear={() => {
                setHistory([]);
                localStorage.removeItem('eusko-history');
              }}
            />
          )}

          {currentView === View.GRAMMAR && (
            <GrammarPanel />
          )}

          {currentView === View.SETTINGS && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif jakinola-blue mb-6">Konfigurazioa / Paramètres</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Niveau</p>
                    <p className="text-sm text-gray-500">A1 - Introduction (Bakarka 1)</p>
                  </div>
                  <span className="px-3 py-1 bg-jakinola-blue text-white text-xs rounded-full">Actif</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Variante</p>
                    <p className="text-sm text-gray-500">Iparralde (Pays Basque Nord)</p>
                  </div>
                  <span className="px-3 py-1 bg-jakinola-blue text-white text-xs rounded-full">Actif</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
