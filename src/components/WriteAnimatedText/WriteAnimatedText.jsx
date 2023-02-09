import { useEffect, useState } from 'react';
import './WriteAnimatedText.css';

const WriteAnimatedText = ({ text, onWrited, speed=60, className }) => {
  const [typeWrited, setTypeWrited] = useState(text[0]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (typeWrited.length < text.length) {
      setTimeout(() => {
        setTypeWrited(typeWrited + text[typeWrited.length]);
      }, speed);
    } else {
      setTimeout(() => {
        setIsTyping(false)
      }, 60);
    }
    return () => {
      setIsTyping(true)
    }
  }, [speed, text, typeWrited]);

  useEffect(() => {
    if (!isTyping) {
      onWrited?.();
    }
  
    return () => {
      setIsTyping(true)
    }
  }, [isTyping, onWrited])
  

  return <div className={`write-animated-text ${className}`}>
    {typeWrited}
    {typeWrited !== text && <div className="blink-caret" />}
  </div>;
};

export default WriteAnimatedText;
