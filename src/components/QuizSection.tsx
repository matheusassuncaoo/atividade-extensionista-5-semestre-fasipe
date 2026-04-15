import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { perguntasCuiaba } from '../data';
import { AudioNarrator } from './AudioNarrator';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function QuizSection() {
  const [etapa, setEtapa] = useState<'pergunta' | 'resultado'>('pergunta');
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [respondeu, setRespondeu] = useState(false);

  const perguntaAtual = perguntasCuiaba[indicePergunta];

  useGSAP(() => {
    // Fade in amigável quando surgir nova etapa ou pergunta
    gsap.fromTo('.quiz-container', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
  }, [indicePergunta, etapa]);

  const lidarComResposta = (index: number) => {
    if (respondeu) return;

    setOpcaoSelecionada(index);
    setRespondeu(true);

    if (index === perguntaAtual.respostaCorretaIndex) {
      setPontuacao((prev) => prev + 1);
    }
  };

  const proximaPergunta = () => {
    if (indicePergunta < perguntasCuiaba.length - 1) {
      setIndicePergunta((prev) => prev + 1);
      setOpcaoSelecionada(null);
      setRespondeu(false);
      // Auto rolagem leve até o início do Quiz para focar na nova pergunta
      document.getElementById('quiz-ancora')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setEtapa('resultado');
      window.speechSynthesis.cancel();
    }
  };

  const reiniciar = () => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
     setTimeout(() => {
        setEtapa('pergunta');
        setIndicePergunta(0);
        setPontuacao(0);
        setOpcaoSelecionada(null);
        setRespondeu(false);
     }, 1000);
  };

  if (etapa === 'resultado') {
    return (
      <div id="quiz-ancora" className="quiz-container flex flex-col items-center text-center bg-white p-8 md:p-12 rounded-[2rem] shadow-xl w-full">
         <h2 className="text-4xl md:text-5xl font-bold text-[#4A3B32] mb-6">
            Chegamos ao fim da caminhada!
         </h2>
         <p className="text-3xl text-gray-700 mb-10 leading-relaxed">
            Você validou <span className="font-extrabold text-green-700">{pontuacao}</span> de {perguntasCuiaba.length} tradições históricas.
         </p>
         <div className="bg-[#FAF7F2] p-8 rounded-3xl mb-10 w-full text-center">
             <p className="text-2xl text-gray-800 italic leading-relaxed">
               {pontuacao >= 4 
                 ? "Parabéns! Nosso povo e nossa cultura vivem forte na sua memória." 
                 : "Muito obrigado por interagir conosco hoje. O mais importante é manter nossa história sempre viva e protegida!"}
             </p>
         </div>
         <button
            onClick={reiniciar}
            className="w-full flex items-center justify-center gap-4 p-6 bg-[#C05A16] hover:bg-[#A34A10] text-white text-2xl font-bold rounded-2xl shadow-lg transition-colors active:scale-95"
         >
            Voltar ao Início do Scrollytelling
            <RotateCcw className="w-8 h-8 flex-shrink-0" />
         </button>
      </div>
    );
  }

  return (
    <div id="quiz-ancora" className="quiz-container flex flex-col items-center w-full bg-white p-6 md:p-12 rounded-[2rem] shadow-xl">
      <div className="w-full text-center mb-6">
        <span className="text-xl md:text-2xl font-bold text-gray-500 tracking-wider uppercase text-sm md:text-base">
          Desafio da Memória: {indicePergunta + 1} de {perguntasCuiaba.length}
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl font-semibold text-[#4A3B32] mb-6 text-center leading-relaxed">
        {perguntaAtual.texto}
      </h2>

      {/* Botão para LER a pergunta em voz alta */}
      <div className="max-w-md w-full mx-auto mb-10">
        <AudioNarrator texto={perguntaAtual.texto} />
      </div>

      <div className="w-full flex flex-col gap-4">
        {perguntaAtual.opcoes.map((opcao, index) => {
          let classCores = "bg-[#EAE4D9] text-[#4A3B32] hover:bg-[#DED5C5]";
          let Icone = null;

          if (respondeu) {
            if (index === perguntaAtual.respostaCorretaIndex) {
              classCores = "bg-green-600 text-white ring-4 ring-green-300";
              Icone = CheckCircle;
            } else if (index === opcaoSelecionada) {
              classCores = "bg-orange-500 text-white";
              Icone = XCircle;
            } else {
              classCores = "bg-gray-100 text-gray-400 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              disabled={respondeu}
              onClick={() => lidarComResposta(index)}
              className={`w-full flex items-center justify-between p-6 rounded-2xl text-2xl md:text-3xl font-medium transition-all duration-300 shadow-sm ${classCores}`}
            >
              <span>{opcao}</span>
              {Icone && <Icone className="w-8 h-8 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {respondeu && (
        <div className="w-full mt-10 p-6 md:p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-blue-900">Na Realidade...</h3>
          <p className="text-xl md:text-2xl text-blue-800 leading-relaxed">
            {perguntaAtual.curiosidade}
          </p>
          <div className="max-w-md mx-auto">
            <AudioNarrator texto={perguntaAtual.curiosidade} />
          </div>

          <button
            onClick={proximaPergunta}
            className="w-full flex items-center justify-center gap-3 p-6 bg-blue-700 hover:bg-blue-800 text-white text-2xl md:text-3xl font-bold rounded-2xl shadow transition-colors active:scale-95"
          >
            {indicePergunta < perguntasCuiaba.length - 1 ? "Próxima Questão" : "Ver Resultados Finais"}
            <ArrowRight className="w-8 h-8 flex-shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}
