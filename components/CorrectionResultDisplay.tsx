
import React from 'react';
import { CorrectionResult } from '../types';

interface CorrectionResultDisplayProps {
  result: CorrectionResult;
}

const CorrectionResultDisplay: React.FC<CorrectionResultDisplayProps> = ({ result }) => {
  // Simple logic to highlight changes (naive implementation for demo)
  // In a real app, you'd use a diff library.
  const getHighlightedCorrection = (original: string, corrected: string) => {
    const origWords = original.split(/\s+/);
    const corrWords = corrected.split(/\s+/);
    
    return corrWords.map((word, i) => {
      const isDifferent = i >= origWords.length || word.toLowerCase() !== origWords[i].toLowerCase();
      return (
        <span 
          key={i} 
          className={isDifferent ? "bg-jakinola-yellow/30 font-bold px-1 rounded" : ""}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Correction Card */}
      <div className="bg-white rounded-2xl shadow-lg border-l-8 border-jakinola-yellow overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-2 text-jakinola-blue mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold uppercase tracking-wider text-sm">Zuzenketa / Correction</h3>
          </div>
          <p className="text-2xl jakinola-blue leading-relaxed">
            {getHighlightedCorrection(result.original, result.corrected)}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2 items-center text-gray-400 text-sm">
            <span className="italic">Jatorrizkoa: {result.original}</span>
          </div>
        </div>
      </div>

      {/* Grammar Explanation Card */}
      <div className="bg-white rounded-2xl shadow-lg border-l-8 border-jakinola-blue overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-2 jakinola-blue mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="font-bold uppercase tracking-wider text-sm">Arau Gramatikala / Règle de Grammaire</h3>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {result.rule.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Examples */}
      <div className="bg-white rounded-2xl shadow-lg border-l-8 border-gray-300 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-bold uppercase tracking-wider text-sm">Ingurune Profesionala / Contexte Professionnel</h3>
          </div>
          <div className="grid gap-4">
            {result.proExamples.map((ex, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl hover:bg-jakinola-yellow/5 transition-colors border border-transparent hover:border-jakinola-yellow/20">
                <p className="font-bold jakinola-blue mb-1">{ex.basque}</p>
                <p className="text-sm text-gray-500 italic">{ex.french}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectionResultDisplay;
