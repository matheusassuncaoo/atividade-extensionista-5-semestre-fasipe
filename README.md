# 🌿 Cultura Afro e Indígena: Ancestralidade Cuiabana (MT)

Bem-vindo ao projeto do 5º Semestre da **FASIPE**. 
Esta aplicação foi desenvolvida pensando no público **60+ (Idosos)**, englobando altíssima acessibilidade visual e sonora com um formato imersivo em **Scrollytelling** de aprendizado cultural, focado nas riquezas de Mato Grosso.

## 🚀 Tecnologias Utilizadas
- **React (via Vite)** - Interface de usuário extremamente rápida.
- **Tailwind CSS v4** - Utilizado para estilização limpa e de alto-contraste em tons terrosos, evitando o branco absoluto para proteção contra cansaço visual do idoso.
- **GSAP (GreenSock)** - Biblioteca de animações complexas. Aqui, aplicado de forma inteligente e suave (sem *parallax agressivo*) para não gerar náuseas ou desorientação labiríntica.
- **Web Speech API** - Implementação de narração nativa (`AudioSpeech`). Os textos são falados ao usuário numa velocidade ajustada (`rate: 0.95`) para evitar a fadiga da auto-leitura.
- **Vitest & React Testing Library** - Suíte completa de Testes Unitários integrados implementando ambiente TDD com foco em validação de UI e acessibilidade.
- **GitHub Actions (CI/CD)** - Pipeline configurada (`.github/workflows`) para travar deploys de projetos que falhem na segurança da suíte de testes Vitest.

## 🎯 Por que a Arquitetura "Scrollytelling"?
Muitas abas, cliques invisíveis, pop-ups ou carregamentos brutos de páginas independentes desorientam pessoas de idade. Acessibilidade vai além do tamanho da fonte:
1. **História Guiada (Desce a tela)**: O usuário lê passivamente apenas rolando pelo celular, onde blocos textuais sobre o *Quilombo Mata Cavalo*, *Igreja do Rosário* e a origem do *Siriri* surgem um por um.
2. **Audio Ativo**: Se não conseguir ler, ele aciona o botão principal de "Ouvir História", que utiliza a inteligência de acessibilidade do aparelho.
3. **Ancoragem de Contexto**: O Quiz foi mantido num container próprio. Ao responder e revelar uma "curiosidade", a tela não pula ou colapsa bruscamente, mantendo o controle situacional.

## 📖 Como Rodar e Testar

1. Clone o projeto:
```bash
git clone https://github.com/matheusassuncaoo/atividade-extensionista-5-semestre-fasipe.git
```

2. Instale os pacotes:
```bash
npm install
```

3. Inicie o servidor interativo:
```bash
npm run dev
```

4. Valide a engenharia via Testes Automatizados da UI:
```bash
npm run test
```

## 🤝 Contexto do Projeto
Projeto desenvolvido como Atividade Extensionista. 
O resgate histórico é voltado inteiramente ao Mato Grosso, englobando os laços milenares Indígenas (Bororos/Coxiponés) com a força cultural construtiva e resistente da população afrodescendente em Cuiabá e região.
