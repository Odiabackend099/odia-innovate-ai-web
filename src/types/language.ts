
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇳🇬' },
  { code: 'pcm', name: 'Pidgin', flag: '🗣️' },
  { code: 'yo', name: 'Yoruba', flag: '🧡' },
  { code: 'ig', name: 'Igbo', flag: '💚' },
  { code: 'ha', name: 'Hausa', flag: '💙' },
  { code: 'bin', name: 'Ẹdo', flag: '🟥' },
  { code: 'ish', name: 'Esan', flag: '🟩' },
  { code: 'afe', name: 'Afemai', flag: '🟦' },
];
