
export interface ProExample {
  basque: string;
  french: string;
}

export interface CorrectionResult {
  original: string;
  corrected: string;
  rule: string;
  proExamples: ProExample[];
  timestamp: number;
}

export enum View {
  NEW = 'NEW',
  HISTORY = 'HISTORY',
  GRAMMAR = 'GRAMMAR',
  SETTINGS = 'SETTINGS'
}

export interface GrammarRule {
  title: string;
  description: string;
  category: string;
}
