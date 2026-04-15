import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { historiaCuiaba } from '../data';
import { AudioNarrator } from './AudioNarrator';

// Registrar o plugin crucial do GSAP
gsap.registerPlugin(ScrollTrigger);

export function StoryScroll() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Para ACESSIBILIDADE em 60+: 
    // Opacidade suave e eixo-Y curto, sem efeitos agressivos de enjoo (Parallax parallax).
    const blocos = gsap.utils.toArray<HTMLElement>('.story-block');
    
    blocos.forEach((block) => {
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
            start: 'top 85%', // Aciona quando 15% do bloco aparece na tela (facilita p/ telas pequenas)
            toggleActions: 'play none none none', // Toca apenas na ida, não refaz ao subir
          }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col items-center gap-24 md:gap-40 py-10">
      {historiaCuiaba.map((secao) => (
        <section key={secao.id} className="story-block w-full bg-white/70 p-8 md:p-12 rounded-[2rem] shadow-sm transform-gpu">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#C05A16] mb-8 text-center leading-tight">
            {secao.titulo}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed md:leading-[1.7] mb-8 text-left md:text-center">
            {secao.texto}
          </p>
          <div className="max-w-md mx-auto">
            {/* O Narrador que lê exatamente aquele trecho histórico para o idoso */}
            <AudioNarrator texto={secao.texto} />
          </div>
        </section>
      ))}
    </div>
  );
}
