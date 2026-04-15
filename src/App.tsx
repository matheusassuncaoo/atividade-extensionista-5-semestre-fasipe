import { StoryScroll } from './components/StoryScroll';
import { QuizSection } from './components/QuizSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-800 font-sans flex flex-col items-center p-4 xl:p-8">
      
      {/* Container de largura máxima para focar a leitura (acessibilidade) */}
      <div className="max-w-3xl w-full">
        
        {/* === HERO INTRO === */}
        <header className="text-center pt-24 pb-32">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#4A3B32] mb-8 leading-tight">
            Nossas <span className="text-[#C05A16]">Raízes</span> Cuiabanas
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed md:leading-[1.7] max-w-2xl mx-auto">
            Uma jornada guiada pelas memórias e heranças indígenas e negras que construíram a nossa Mato Grosso profunda.
          </p>
          
          <div className="mt-20">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-widest block mb-4 text-[#C05A16]">
              Comece a rolar a tela para baixo
            </span>
            <div className="inline-block p-4 bg-white rounded-full shadow-md animate-bounce border-2 border-[#EAE4D9]">
              <svg className="w-10 h-10 text-[#C05A16]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </header>

        {/* === HISTÓRIA (GSAP Scrollytelling) === */}
        <div id="narrativa">
          <StoryScroll />
        </div>

        {/* === QUIZ (Teste de conhecimento) === */}
        <div id="desafio" className="pt-24 pb-32 w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#4A3B32] mb-6 leading-tight">
              Agora, a sua vez!
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed">
              Você prestou a atenção na história? Vamos testar sua memória sobre nossa cultura.
            </p>
          </div>
          <QuizSection />
        </div>

      </div>
    </div>
  );
}
