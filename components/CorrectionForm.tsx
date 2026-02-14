
import React, { useState } from 'react';
import { getCorrection } from '../services/geminiService';
import { CorrectionResult } from '../types';

interface CorrectionFormProps {
  onResult: (result: CorrectionResult) => void;
}

const CorrectionForm: React.FC<CorrectionFormProps> = ({ onResult }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getCorrection(input);
      onResult(result);
      setInput('');
    } catch (err) {
      console.error(err);
      setError("Errakuntza bat gertatu da. Proba ezazu berriro. (Une erreur est survenue. Veuillez réessayer.)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-jakinola-blue font-bold mb-2 block">
            Sartu hemen zure esaldia / Saisissez ici votre phrase :
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 h-32 border-2 border-gray-100 rounded-xl focus:border-jakinola-yellow focus:ring-0 transition-all text-lg resize-none"
            placeholder="Adibidez: Ikasleek etxean dira..."
            disabled={isLoading}
          />
        </label>
        
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
              isLoading || !input.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-jakinola-yellow text-jakinola-blue hover:bg-yellow-400 hover:-translate-y-1'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-jakinola-blue" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Zuzentzen... (Correction en cours...)
              </>
            ) : (
              <>
                Zuzendu / Corriger
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorrectionForm;
