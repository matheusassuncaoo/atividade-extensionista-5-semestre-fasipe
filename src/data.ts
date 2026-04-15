import audio1 from './assets/Card01-audio.mp3';
import audio2 from './assets/Card02-audio.mp3';
import audio3 from './assets/Card03-audio.mp3';
import audio4 from './assets/Card04-audio.mp3';

export const historiaCuiaba = [
  {
    id: 'intro',
    titulo: 'Muito prazer, sou o Seu Dito!',
    texto: 'Deixe-me contar uma história... Nas águas quentes do Rio Coxipó e nas sombras dos imensos ipês de Cuiabá, o ouro brilhou e nos uniu. Nossas ruas ainda guardam os passos valentes dos indígenas Bororos e Coxiponés, e o forte suor da nossa herança africana.',
    audioFile: audio1
  },
  {
    id: 'religiao',
    titulo: 'As Mãos que Ergueram Nossa Fé',
    texto: 'Ao passar pelo centro de Cuiabá, preste atenção à charmosa Igreja do Rosário e São Benedito. Ela foi construída com o próprio esforço de pessoas negras escravizadas há muito tempo. Hoje, vemos a força dessa cultura viva nas "Lavagens das Escadarias", um momento lindo de memória e respeito.',
    audioFile: audio2
  },
  {
    id: 'cultura',
    titulo: 'O Som da Nossa Mistura',
    texto: 'Nos quintais cuiabanos, o som festivo do Cururu e do Siriri levanta poeira! Sabia que a "viola de cocho", um instrumento tipicamente indígena, toca as notas marcadas pelas batidas e ritmos que chegaram de África? É uma mistura perfeita celebrando resistências de ambos os povos.',
    audioFile: audio3
  },
  {
    id: 'culinaria',
    titulo: 'O Tempero Que Ficou',
    texto: 'Até quando comemos nossa deliciosa "Maria Isabel", lembramos dessa união. O modo de curar a carne e de preparar os grãos tem rastros fortes da sabedoria africana quilombola, casada com os ingredientes que os povos originários dominavam em nosso cerrado pantaneiro.',
    audioFile: audio4
  }
];

export const perguntasCuiaba = [
  {
    id: 1,
    texto: "Qual instrumento, símbolo da cultura do Cururu e Siriri, tem suas raízes na cultura indígena mas guia os ritmos festivos herdados das tradições africanas?",
    opcoes: ["Sanfona", "Violão", "Viola de Cocho"],
    respostaCorretaIndex: 2,
    curiosidade: "A Viola de Cocho é esculpida artesanalmente em um tronco de madeira inteiro e hoje é reconhecida como Patrimônio Imaterial do Brasil!",
  },
  {
    id: 2,
    texto: "No coração do Centro de Cuiabá, qual igreja histórica foi financiada e construída pela resistência braçal da população negra escravizada?",
    opcoes: ["Catedral Basílica do Senhor Bom Jesus", "Igreja de Nossa Senhora do Rosário e São Benedito", "Igreja Nossa Senhora dos Passos"],
    respostaCorretaIndex: 1,
    curiosidade: "Até hoje as celebrações de São Benedito são o ápice do fervor popular, mantendo vivas memórias profundas da população afro-cuiabana.",
  },
  {
    id: 3,
    texto: "A culinária mato-grossense bebe muito da cultura negra, especialmente no uso da carne seca picada unida ao arroz. Qual o nome popular desse prato?",
    opcoes: ["Arroz Carreteiro", "Maria Isabel", "Arroz Doce"],
    respostaCorretaIndex: 1,
    curiosidade: "Diz a lenda popular que a adição de carne seca servia para prolongar a vida útil do alimento em longas viagens, tradição aprimorada nas cozinhas diversas da época colonial.",
  },
  {
    id: 4,
    texto: "Em grande parte do estado do Mato Grosso, especialmente perto de Livramento e Poconé, existem várias comunidades rurais fundadas historicamente por negros que resistiam à escravidão. Como são chamadas?",
    opcoes: ["Aldeias", "Capitanias", "Quilombos (Ex: Quilombo Mata Cavalo)"],
    respostaCorretaIndex: 2,
    curiosidade: "O Quilombo Mata Cavalo, em Nossa Senhora do Livramento, é uma das áreas quilombolas mais reconhecidas e ativas do país, mantendo ricas heranças agrícolas e musicais.",
  },
  {
    id: 5,
    texto: "Quem ocupava as terras nas margens do Rio Coxipó e sofria com a extração violenta antes de dividir seu território historicamente com colonos e as populações afrodescendentes?",
    opcoes: ["Os Bandeirantes e Paulistas", "As Tribos Indígenas (Coxiponés, Bororos)", "Os Jesuitas"],
    respostaCorretaIndex: 1,
    curiosidade: "A capital nasceu do encontro tenso dessas três pontas: nativos indígenas milenares, trabalhadores africanos subjugados e mineradores paulistas.",
  }
];
