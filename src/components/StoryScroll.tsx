import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { historiaCuiaba } from '../data';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function StoryScroll() {
  const container = useRef<HTMLDivElement>(null);
  
  // Array de referências reais pros elementos de áudio nativos do HTML5
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  // Estado para capturar se houve erro de bloqueio de AutoPlay
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean[]>(new Array(historiaCuiaba.length).fill(false));
  // Estado puramente visual
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useGSAP(() => {
    const blocos = gsap.utils.toArray<HTMLElement>('.story-block');
    
    blocos.forEach((block, index) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 70%', // Inicia a animação quando atinge o meio da tela
            toggleActions: 'play none none none',
            onEnter: () => {
              // Tocar som quando card entrar perfeitamente!
              const audioTag = audioRefs.current[index];
              if (audioTag) {
                audioTag.play().then(() => {
                  setPlayingIndex(index);
                  // Remove error state se existia
                  setAutoplayBlocked(prev => {
                     const novo = [...prev];
                     novo[index] = false;
                     return novo;
                  });
                }).catch((error) => {
                  console.warn("Autoplay bloqueado pelo Navegador:", error);
                  // Atualiza estado de "bloqueio" para mostrar botão manual de fallback
                  setAutoplayBlocked(prev => {
                     const novo = [...prev];
                     novo[index] = true;
                     return novo;
                  });
                });
              }
            },
            onLeave: () => {
              // Opcional: pausar áudio se a tela descer pro quiz
              const audioTag = audioRefs.current[index];
              if (audioTag) {
                audioTag.pause();
                setPlayingIndex(null);
              }
            },
            onLeaveBack: () => {
              // Pausar se voltar pra cima
              const audioTag = audioRefs.current[index];
              if (audioTag) {
                audioTag.pause();
                setPlayingIndex(null);
              }
            }
          }
        }
      );
    });
  }, { scope: container });

  // Fallback Play Method if AutoPlay fails
  const manualPlay = (index: number) => {
    const audioTag = audioRefs.current[index];
    if (audioTag) {
      if (playingIndex === index) {
        audioTag.pause();
        setPlayingIndex(null);
      } else {
        // Pausar anteriores
        if (playingIndex !== null && audioRefs.current[playingIndex]) {
           audioRefs.current[playingIndex]!.pause();
        }
        audioTag.play();
        setPlayingIndex(index);
        setAutoplayBlocked(prev => {
           const novo = [...prev];
           novo[index] = false;
           return novo;
        });
      }
    }
  };

  return (
    <div ref={container} className="w-full flex flex-col items-center gap-24 md:gap-40 py-10">
      {historiaCuiaba.map((secao, idx) => (
        <section key={secao.id} className="story-block w-full bg-white/80 p-8 md:p-12 rounded-[2rem] shadow-sm transform-gpu transition-all">
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#C05A16] mb-8 text-center leading-tight">
            {secao.titulo}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed md:leading-[1.7] mb-8 text-left md:text-center">
            {secao.texto}
          </p>

          {/* HTML5 Audio (Invisível) mas montado no DOM para referências */}
          <audio 
            ref={(el) => { audioRefs.current[idx] = el; }}
            src={secao.audioFile} 
            preload="auto"
            onEnded={() => setPlayingIndex(null)}
          />

          {/* Feedback Visual / Fallback de Erro de Política de Audio do Navegador */}
          <div className="max-w-md mx-auto mt-4">
            {autoplayBlocked[idx] ? (
              <button 
                onClick={() => manualPlay(idx)}
                className="w-full p-4 flex flex-col items-center justify-center gap-2 bg-orange-100 border-2 border-orange-400 text-orange-900 rounded-2xl animate-pulse"
              >
                <div className="flex items-center gap-2 font-bold text-xl">
                  <AlertCircle className="w-6 h-6" /> Clique aqui para Liberar o Áudio
                </div>
                <span className="text-sm">O seu celular bloqueou o som automático.</span>
              </button>
            ) : (
              <button
                 onClick={() => manualPlay(idx)}
                 className={`w-full p-4 rounded-2xl flex items-center justify-center gap-4 border-2 transition-all duration-300 ${
                   playingIndex === idx 
                     ? 'bg-blue-100 border-blue-500 text-blue-900 shadow-md ring-4 ring-blue-300' 
                     : 'bg-[#EAE4D9] border-transparent text-[#4A3B32] hover:bg-[#DED5C5] shadow-sm'
                 }`}
              >
                 {playingIndex === idx ? <VolumeX className="w-8 h-8 flex-shrink-0" /> : <Volume2 className="w-8 h-8 flex-shrink-0" />}
                 <span className="text-xl md:text-2xl font-bold">
                   {playingIndex === idx ? 'Pausar Narrador' : 'Ouvir a Voz'}
                 </span>
              </button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
