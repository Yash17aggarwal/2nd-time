import { useEffect, useState, useRef } from 'react';
import CONFIG from '../config';

export default function FloatingMessages() {
  const [messages, setMessages] = useState([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = CONFIG.floatingMessages[Math.floor(Math.random() * CONFIG.floatingMessages.length)];
      const id = idCounter.current++;
      const newMsg = {
        id,
        text: msg,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
      };

      setMessages(prev => [...prev, newMsg]);

      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, 8000);
    }, 6000 + Math.random() * 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {messages.map(msg => (
        <div
          key={msg.id}
          className="floating-love-msg"
          style={{ left: `${msg.x}%`, top: `${msg.y}%` }}
        >
          {msg.text}
        </div>
      ))}
    </>
  );
}
