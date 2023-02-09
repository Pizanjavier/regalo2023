import { useState } from 'react';
import { Link } from 'react-router-dom';
import WriteAnimatedText from '../../components/WriteAnimatedText/WriteAnimatedText';
import './Welcome.css';

const texts = [
  'HOLA CUCHICU ❤️',
  '...',
  '...',
  'Soy tu regalo de cumpleaños. 🎁',
  '...',
  '😈 Como venganza por haber hecho pensar a cuchicu con los regalos de los reyes magos he venido a ponértelo difícil. 😈',
  '...',
  'El juego consiste en 3 PRUEBAS, cada prueba tendrá un regalito como premio cuando la soluciones.',
  '...',
  'Pero hay más.',
  'Cada vez que resuelvas una prueba recibirás un iconito de wpp, memorízalos bien, los necesitarás para la PRUEBA FINAL.',
];

const Welcome = () => {
  const [updatedTexts, setUpdatedTexts] = useState([texts[0]])
  const [allDisplayed, setAllDisplayed] = useState(false)

  const goWithNextText = () => {
    if (texts[updatedTexts.length]) {
      setUpdatedTexts([...updatedTexts, texts[updatedTexts.length]])
    } else {
      setAllDisplayed(true)
    }
  }


  return (
    <div className="welcome">
      {updatedTexts.map((updatedText, index) => 
        <WriteAnimatedText text={updatedText} onWrited={goWithNextText} key={index}/>
      )}
      {allDisplayed && <Link to={'prueba1'} className='prueba'>Prueba 1 {'>'}</Link>}
    </div>
  );
};

export default Welcome;
