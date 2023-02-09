import { useState } from 'react';
import { Link } from 'react-router-dom';
import WriteAnimatedText from '../../components/WriteAnimatedText/WriteAnimatedText';
import './Prueba2.css';

const texts1 = [
  'Este juego es sensorial 👻',
  'Vas a escuchar hasta 3 audios, son 3 pistas para el segundo regalo.',
  'Sube el volumen y...',
  'Suerte!',
];

const hint1Text = ['📢 Escucha atentamente 📢'];
const hint2Text = ['📢 Segundo audio 📢'];

const hint3Text = ['📢 Última pista 📢'];

const summaryText = ['Espero que haya sido super difícil!'];

const finalHintText = [
  'ESTE ES EL EMOJI DE ESTA PRUEBA: 🧴',
  'Recuerda que es una pista para el acertijo final',
];

const gameSteps = {
  welcome: {
    text: texts1,
    key: Math.random(),
    next: 'hint1',
    buttonText: 'Empezar',
  },
  hint1: {
    text: hint1Text,
    next: 'hint2',
    key: Math.random(),
    buttonText: 'Ni idea',
    audioName: 'audio1.m4a'
  },
  hint2: {
    text: hint2Text,
    next: 'hint3',
    key: Math.random(),
    buttonText: 'Ni idea',
    audioName: 'audio2.m4a'

  },
  hint3: {
    text: hint3Text,
    next: 'summary',
    key: Math.random(),
    buttonText: 'Me rindo',
    audioName: 'audio3.m4a'

  },
  summary: {
    text: summaryText,
    next: 'final',
    key: Math.random(),
    buttonText: 'Siguiente',
  },
  final: {
    text: finalHintText,
    showNextPruebaButton: true,
    key: Math.random(),
  },
};

const Prueba2 = () => {
  const [
    { text, next, showNextPruebaButton, key, buttonText, audioName },
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

  const audio = audioName ? require(`../../${audioName}`): undefined;


  return (
    <div className="prueba1">
      <WriteAnimatedText text={'PRUEBA 2️⃣'} speed={1} className="header" />
      {updatedTexts.map((updatedText, index) => (
        <WriteAnimatedText
          text={updatedText}
          onWrited={goWithNextText}
          key={`${index}-${key}`}
          speed={60}
        />
      ))}

      {audioName && textAnimationEnds &&
      <audio src={audio} controls autoPlay></audio>
      }

      {next && textAnimationEnds && (
          <button
            className="button"
            onClick={() => {
              setActualGameStep(gameSteps[next]);
              setUpdatedTexts([gameSteps[next].text[0]]);
              setTextAnimationEnds(false);
            }}
          >
            {buttonText}
          </button>
      )}

      {audioName && textAnimationEnds && (
        
          <button
            className="button"
            onClick={() => {
              setActualGameStep(gameSteps.summary);
              setUpdatedTexts([gameSteps.summary.text[0]]);
              setTextAnimationEnds(false);
            }}
          >
            Ya se lo que es!
          </button>
          
      )}
      {showNextPruebaButton && textAnimationEnds && (
        <Link className="button" to="/prueba3">
          Siguiente prueba {'>'}
        </Link>
      )}
    </div>
  );
};

export default Prueba2;
