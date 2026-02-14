
import React from 'react';
import { CorrectionResult } from '../types';

interface HistoryListProps {
  items: CorrectionResult[];
  onSelectItem: (item: CorrectionResult) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ items, onSelectItem, onClear }) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-gray-400">Ez dago historiarik oraindik...</h3>
        <p className="text-gray-400">Aucun historique pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <p className="text-gray-500 font-medium">{items.length} elementu / éléments</p>
        <button 
          onClick={onClear}
          className="text-red-400 hover:text-red-600 text-sm font-bold flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Guztia ezabatu / Tout effacer
        </button>
      </div>
      
      <div className="grid gap-4">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectItem(item)}
            className="w-full text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-jakinola-yellow/50 transition-all flex justify-between items-center group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="text-green-500 text-[10px] font-bold uppercase">Zuzenduta</span>
              </div>
              <p className="text-lg font-serif text-gray-800 line-clamp-1 group-hover:jakinola-blue transition-colors">
                {item.corrected}
              </p>
              <p className="text-sm text-gray-400 line-clamp-1 italic">
                {item.original}
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-jakinola-yellow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
