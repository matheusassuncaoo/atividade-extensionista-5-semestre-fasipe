import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  Object.defineProperty(window, 'speechSynthesis', {
    writable: true,
    value: {
      cancel: vi.fn(),
      speak: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      getVoices: vi.fn().mockReturnValue([]),
    }
  });
  
  window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
  }));
  
  window.scrollTo = vi.fn();
});

describe('Jornada Ancestral Cuiabá e Quiz', () => {
  it('A tela hero inicial deve possuir alto contraste e convite à leitura', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Nossas Raízes/i);
    expect(screen.getByText(/Comece a rolar a tela para baixo/i)).toBeInTheDocument();
  });

  it('O Quiz no final da página deve ser pré-renderizado mostrando a pergunta 1', () => {
    render(<App />);
    // Verifica se os blocos de texto do Scrollytelling estão presentes (Ex: titulo da Seção 1)
    expect(screen.getByText(/Muito prazer, sou o Seu Dito!/i)).toBeInTheDocument();

    // Verifica a seção do Quiz no final
    expect(screen.getByText(/Desafio da Memória: 1 de/i)).toBeInTheDocument();
    expect(screen.getByText(/Qual instrumento, símbolo da cultura do Cururu/i)).toBeInTheDocument();
  });
  
  it('O Quiz avança fluxos perfeitamente', () => {
    render(<App />);
    
    // Encontra e Clica na resposta Correta: "Viola de Cocho"
    const opcaoCorreta = screen.getByText('Viola de Cocho');
    fireEvent.click(opcaoCorreta);

    // Feedback visual "Na Realidade..." deve aparecer com os botões de áudio do contexto
    expect(screen.getByText('Na Realidade...')).toBeInTheDocument();
    
    // Botão de Avanço surge
    const proxima = screen.getByRole('button', { name: /Próxima Questão/i });
    expect(proxima).toBeInTheDocument();
    
    // Avança para próxima tela (Pergunta 2)
    fireEvent.click(proxima);
    expect(screen.getByText(/Desafio da Memória: 2 de/i)).toBeInTheDocument();
  });
  
  it('A API de Acessibilidade em Áudio (tts) está ligada aos componentes', () => {
    render(<App />);
    // Vários botões espalhados pela tela devem habilitar áudio
    const narBottons = screen.getAllByRole('button', { name: /Ouvir trecho em voz alta/i });
    expect(narBottons.length).toBeGreaterThan(0);
  });
});
