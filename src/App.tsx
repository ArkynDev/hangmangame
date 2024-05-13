import React, { useState, useEffect } from "react";
import database from "./data.json";

import "./styles/App.css";
import { LifeProgressBar } from './components/lifeCount/LifeProgressBar';
import { ScoreCounter } from "./components/ScoreCounter/ScoreCounter";

export const App = () => {
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(100);
  const [word, setWord] = useState('');
  const [tip, setTip] = useState('');
  const [letrasDescobertas, setLetrasDescobertas] = useState<string[]>([]);
  const [letrasInvalidas, setLetrasInvalidas] = useState<string[]>([]);
  const [letrasClicadas, setLetrasClicadas] = useState<string[]>([]);
  const [stageInProgress, setStageInProgress] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const alfabeto = 'abcdefghijklmnopqrstuvwxyzáéíóúâêîôûàèìòùãẽĩõũ';

  const getWordAndTip = () => {
    let newWord = '';
    let newTip = '';

    if (score < 50) {
      const palavrasFacil = database.easy;
      const randomIndex = Math.floor(Math.random() * palavrasFacil.length);
      newWord = palavrasFacil[randomIndex].word;
      newTip = palavrasFacil[randomIndex].tip;
    } else if (score < 200) {
      const palavrasMedio = database.medium;
      const randomIndex = Math.floor(Math.random() * palavrasMedio.length);
      newWord = palavrasMedio[randomIndex].word;
      newTip = palavrasMedio[randomIndex].tip;
    } else {
      const palavrasDificil = database.hard;
      const randomIndex = Math.floor(Math.random() * palavrasDificil.length);
      newWord = palavrasDificil[randomIndex].word;
      newTip = palavrasDificil[randomIndex].tip;
    }

    setLife(100);
    //setStageInProgress(true);

    setWord(newWord.toLowerCase());
    setTip(newTip);
    setLetrasDescobertas([]);
    setLetrasInvalidas([]);
    setLetrasClicadas([]);
  };

  const incrementScore = () => {
    setScore(score + 1);
  };

    // Função para verificar se a letra está na palavra e atualizar as letras descobertas
    const verificarLetra = (letra: string) => {
      if (word.includes(letra)) {
        setLetrasDescobertas([...letrasDescobertas, letra]);
        if(life < 100) {
          setLife(life + 2);
        }
      } else {
        if (!letrasInvalidas.includes(letra)) {
          setLetrasInvalidas([...letrasInvalidas, letra]);
          setLife(life - 5);
          setErrorCount(errorCount + 1);
        }
      }
      if (!letrasClicadas.includes(letra)) {
        setLetrasClicadas([...letrasClicadas, letra]);
      }
    };

  // Função para renderizar os slots vazios para cada letra
  const renderizarSlots = () => {
    return word.split('').map((caracter, index) => {
      if (caracter === ' ') {
        return <span key={index}>&nbsp;&nbsp;</span>; // Adiciona espaço
      } else {
        const isDescoberto = letrasDescobertas.includes(caracter);
        return (
          <span key={index} className={`slot ${isDescoberto ? 'not-empty' : 'empty'}`}>
            {isDescoberto ? caracter : ' '}
          </span>
        );
      }
    });
  };
  
  // Função para renderizar os botões para cada letra do alfabeto
  const renderizarBotoesAlfabeto = () => {
    return [...alfabeto].map(letra => (
      <button 
        className={`slot ${letrasInvalidas.includes(letra) ? 'disabled' : 'letter'} ${letrasDescobertas.includes(letra) ? 'included' : 'letter'}`}
        key={letra}
        onClick={() => verificarLetra(letra)}
        disabled={letrasInvalidas.includes(letra) || letrasDescobertas.includes(letra) || letrasClicadas.includes(letra)}
      >
        {letra}
      </button>
    ));
  };

  const nextStage = () => {
    setStageInProgress(true);
  }

  useEffect(() => {
    const verificarTodasLetras = () => {
      return word.split('').every(caracter => letrasDescobertas.includes(caracter) || caracter === ' ');
    };

    if (stageInProgress === true && verificarTodasLetras()) {
      setStageInProgress(false);
    }

    console.log(stageInProgress);
  }, [letrasDescobertas, stageInProgress, word]);

  return (
    <div className='page'>
      <div className='top-page'>
        <div></div>
        <ScoreCounter score={score} />
        <LifeProgressBar widthValue={"200px"} value={life} />
      </div>
      <div className="middle-page">
        {word ? 
          <div className="w-100 flex flex-col justify-center item-center letters-container">
          {tip && <p>Dica: {tip}</p>}
          <p className="word-container flex justify-center item-center w-100">{renderizarSlots()}</p>
          <div className="letter-container">
            {renderizarBotoesAlfabeto()}
          </div>
        </div> : 
          <button onClick={getWordAndTip}>Iniciar</button>
        }
      </div>
      <div className={`newStage ${stageInProgress? 'modaldisable' : 'modaldisable'}`}>
        <h2>Parabéns</h2>
        <p>Erros:</p>
        <p>Dificuldade atual:</p>
        <button onClick={nextStage}>Proxima Palavra</button>
      </div>
    </div>
  )
};