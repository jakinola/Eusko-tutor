
import React from 'react';

const GrammarPanel: React.FC = () => {
  const rules = [
    {
      title: "Artikulua: -a / -ak",
      sub: "L'article défini",
      desc: "En basque, l'article est un suffixe. -a pour le singulier, -ak pour le pluriel.",
      examples: ["Ikaslea (L'élève)", "Ikasleak (Les élèves)"]
    },
    {
      title: "Nor Kasua",
      sub: "L'Absolutif",
      desc: "Utilisé pour le sujet d'un verbe intransitif (ex: izan / être).",
      examples: ["Nor da? (Qui est-ce ?)", "Irakaslea da (C'est le professeur)"]
    },
    {
      title: "Nongo Kasua",
      sub: "Le Génitif Locatif",
      desc: "Indique la provenance ou l'appartenance à un lieu. On ajoute -ko ou -go.",
      examples: ["Baionakoa naiz (Je suis de Bayonne)", "Eskolako gela (La salle de l'école)"]
    },
    {
      title: "Iparraldeko berezitasunak",
      sub: "Spécificités du Nord",
      desc: "Vocabulaire courant en Iparralde.",
      examples: ["Egun on (Bonjour)", "Adixkide (Ami)", "Gela (Salle/Classe)"]
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {rules.map((rule, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="mb-4">
            <h3 className="text-xl font-serif jakinola-blue">{rule.title}</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{rule.sub}</p>
          </div>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {rule.desc}
          </p>
          <div className="space-y-1">
            {rule.examples.map((ex, i) => (
              <div key={i} className="text-xs font-mono bg-gray-50 p-2 rounded text-jakinola-blue">
                {ex}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrammarPanel;
