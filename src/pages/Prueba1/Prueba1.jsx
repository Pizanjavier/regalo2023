import { useState } from 'react';
import { Link } from 'react-router-dom';
import WriteAnimatedText from '../../components/WriteAnimatedText/WriteAnimatedText';
import './Prueba1.css';

const palabraAAdivinar = 'PIJIPPIE'

const texts1 = [
  'Tienes que adivinar una palabrita jugando al típico juego del AHORCADO.',
  '(dibujarlo aqui es un lío, así que tienes 10 vidas)',
];

const winText = [
  '🎉 LA PALABRA ERA 🎉',
  '...',
  palabraAAdivinar,
  '...',
  '🎉 OLE 🎉',
  '🎉 OLE 🎉',
  '🎉 OLE 🎉',
  '...',
  'Por fin… como te ha costado…',
];

const summaryText = [
  'Fíjate en la forma de la hoja de donde has escaneado este QR, a que se parece?',
  '...',
  'Tienes 3 oportunidades para adivinar que regalo es, si fallas, le das un besito a cuchicu o te quitas una prenda de ropa. (Y luego ya lo abres, que si no no acabamos…)',
];

const finalHintText = [
  'ESTE ES EL EMOJI DE ESTA PRUEBA: 👳🏾‍♂️',
  'Recuerda que es una pista para el acertijo final',
];

const loseText = ['Inténtalo otra vez...'];

const gameSteps = {
  welcome: { text: texts1, showAhorcado: true, key: Math.random() },
  win: { text: winText, next: 'summary', key: Math.random() },
  lose: { text: loseText, showAhorcado: true, key: Math.random() },
  summary: { text: summaryText, next: 'final', key: Math.random() },
  final: {
    text: finalHintText,
    showNextPruebaButton: true,
    key: Math.random(),
  },
};

const Prueba1 = () => {
  const [
    { text, showAhorcado, next, showNextPruebaButton, key },
    setActualGameStep,
  ] = useState(gameSteps.welcome);

  const [updatedTexts, setUpdatedTexts] = useState([text[0]]);
  const [textAnimationEnds, setTextAnimationEnds] = useState(false);

  const goWithNextText = () => {
    if (text[updatedTexts.length]) {
      setTextAnimationEnds(false);
      setUpdatedTexts([...updatedTexts, text[updatedTexts.length]]);
    } else {
      setTextAnimationEnds(true);
    }
  };

  return (
    <div className="prueba1">
      <WriteAnimatedText text={'PRUEBA 1️⃣'} speed={1} className="header" />
      {updatedTexts.map((updatedText, index) => (
        <WriteAnimatedText
          text={updatedText}
          onWrited={goWithNextText}
          key={`${index}-${key}`}
          speed={60}
        />
      ))}
      {textAnimationEnds && showAhorcado && (
        <Ahorcado
          word={palabraAAdivinar}
          onWin={() => {
            setActualGameStep(gameSteps.win);
            setUpdatedTexts([gameSteps.win.text[0]]);
            setTextAnimationEnds(false);
          }}
          onLose={() => {
            setActualGameStep(gameSteps.lose);
            setUpdatedTexts([gameSteps.lose.text[0]]);
            setTextAnimationEnds(false);
          }}
        />
      )}
      {next && textAnimationEnds && (
        <button
          className="button"
          onClick={() => {
            setActualGameStep(gameSteps[next]);
            setUpdatedTexts([gameSteps[next].text[0]]);
            setTextAnimationEnds(false);
          }}
        >
          Siguiente
        </button>
      )}
      {showNextPruebaButton && textAnimationEnds && (
        <Link className="button" to="/prueba2">
          Siguiente prueba {'>'}
        </Link>
      )}
    </div>
  );
};

const fullLives = 10;
const Ahorcado = ({ word = '', onWin, onLose }) => {
  const [lives, setLives] = useState(fullLives);
  const livesIcons = Array(lives).fill('❤️');
  const deadIcons = Array(fullLives - lives).fill('☠️');

  const [formValue, setFormValue] = useState('');

  const checkWord = () => {
    const wordElements = document.getElementsByClassName('huecos')[0]
      .childNodes;
    let wordArray = '';
    for (let letter of wordElements) {
      wordArray = wordArray + letter.innerHTML;
    }
    if (word === wordArray) {
      onWin();
    }
  };

  return (
    <div>
      <div className="lives">
        {livesIcons.map((live) => (
          <div>{live}</div>
        ))}
        {deadIcons.map((dead) => (
          <div>{dead}</div>
        ))}
      </div>
      <div className="huecos">
        {word.split('').map((letter, index) => (
          <div className={`letter-${letter}`} key={`letter-${letter}-${index}`}>
            _
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type={'text'}
          maxLength={1}
          value={formValue}
          onChange={({ target }) => setFormValue(target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            setFormValue('');
            const letters = document.getElementsByClassName(
              `letter-${formValue}`,
            );
            for (let letter of letters) {
              letter.innerHTML = formValue;
            }
            if (!letters.length) {
              setLives((prev) => {
                if (!(prev - 1)) {
                  onLose();
                  const wordElements = document.getElementsByClassName(
                    'huecos',
                  )[0].childNodes;
                  for (let letter of wordElements) {
                    letter.innerHTML = '_';
                  }
                  return fullLives;
                }
                return prev - 1;
              });
            }
            checkWord();
          }}
        >
          Probar
        </button>
      </div>
    </div>
  );
};

export default Prueba1;
