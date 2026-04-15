import { useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioNarratorProps {
  texto: string;
}

export function AudioNarrator({ texto }: AudioNarratorProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Quando desmontar o componente, garantir que a voz pare
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleFala = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Pare qualquer outro áudio tocando
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      
      // Ajustes sensíveis para o público Idoso
      // Velocidade levemente reduzida para fácil assimilação
      utterance.rate = 0.95; 
      utterance.pitch = 1.0;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  }, [texto, isPlaying]);

  return (
    <button 
      onClick={toggleFala}
      className={`mt-6 p-4 rounded-2xl flex items-center justify-center gap-4 w-full border-2 transition-all duration-300 ${
        isPlaying 
          ? 'bg-blue-100 border-blue-500 text-blue-900 shadow-md ring-4 ring-blue-300' 
          : 'bg-[#EAE4D9] border-transparent text-[#4A3B32] hover:bg-[#DED5C5] shadow-sm'
      }`}
      aria-label={isPlaying ? "Parar leitura em voz alta" : "Ouvir trecho em voz alta"}
      aria-pressed={isPlaying}
    >
      {isPlaying ? <VolumeX className="w-8 h-8 flex-shrink-0" /> : <Volume2 className="w-8 h-8 flex-shrink-0" />}
      <span className="text-xl md:text-2xl font-bold">
        {isPlaying ? 'Pausar Narrador' : 'Ouvir História'}
      </span>
    </button>
  );
}
