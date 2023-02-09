import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WriteAnimatedText from '../../components/WriteAnimatedText/WriteAnimatedText';
import './Prueba3.css';

const texts1 = [
  'Ahora tienes que estar muy concentrada',
  '...',
  'Vas a ver 3 imágenes, cada imagen es una pista.',
  '...',
  'Pero no va a ser tan fácil, solo tienes 3 segundos para ver cada una...',
  'Suerte!',
];

const hint1Text = ['👀 Atenta... 👀'];
const hint2Text = ['👀 Segunda pista... 👀'];

const hint3Text = ['👀 Última pista... 👀'];

const question = ['Sabes ya lo que es? 😈'];

const summaryText = ['Espero que haya sido super difícil!'];

const finalHintText = [
  'ESTE ES EL EMOJI DE ESTA PRUEBA: 💃🏻',
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
    buttonText: 'Otra pista porfa',
    image: 'pista1.png',
  },
  hint2: {
    text: hint2Text,
    next: 'hint3',
    key: Math.random(),
    buttonText: 'Ni idea',
    image: 'pista2.png',
  },
  hint3: {
    text: hint3Text,
    next: 'summary',
    key: Math.random(),
    buttonText: 'Me rindo',
    image: 'pista2.png',
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

const Prueba3 = () => {
  const [
    { text, next, showNextPruebaButton, key, buttonText, image },
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
    const loadedImage = image ? require(`../../${image}`) : undefined

  return (
    <div className="prueba1">
      <WriteAnimatedText text={'PRUEBA 3️⃣'} speed={1} className="header" />
      {updatedTexts.map((updatedText, index) => (
        <WriteAnimatedText
          text={updatedText}
          onWrited={goWithNextText}
          key={`${index}-${key}`}
          speed={60}
        />
      ))}


      {image && textAnimationEnds && <MagicImage path={loadedImage}></MagicImage>}

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

      {image && textAnimationEnds && (
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
        <Link className="button" to="/prueba-final">
          Siguiente prueba {'>'}
        </Link>
      )}
    </div>
  );
};

const MagicImage = ({ path, timer = 3, onImageTimerEnded }) => {
  const [initTimer, setInitTimer] = useState(5);
  const [imageCountdown, setImageCountdown] = useState(0);

  useEffect(() => {
    if (initTimer > 0) {
      setTimeout(() => {
        setInitTimer(initTimer - 1);
      }, 1000);
    } else {
      setImageCountdown(timer)
    }
  }, [initTimer]);

  useEffect(() => {
    if (initTimer) {
      return
    }

    if (imageCountdown > 0) {
      setTimeout(() => {
        setImageCountdown(imageCountdown - 1);
      }, 1000);
    } else {
      onImageTimerEnded?.();
    }
  }, [imageCountdown, initTimer, onImageTimerEnded]);

  return (
    <div className='magic-image'>
      {!!initTimer && <div className='timer'>{initTimer}</div>}
      {!!imageCountdown && (
        <div className='image-container'>
          <img src={path} alt={path}/>
          <div className='image-timer'>{imageCountdown}</div>
        </div>
      )}
      {!initTimer && !imageCountdown && <WriteAnimatedText text={question[0]} speed={60} />}
    </div>
  );
};

export default Prueba3;
