import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import FloatingHearts from "./floatinghearts";
import { Resend } from 'resend';

const resend = new Resend('re_SPJmPSaz_D41MCiNDBxPqnggw7ut1dCPv');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'alexelo.swift@gmail.com',
  subject: 'Congrats! She said yes',
  html: '<p>Congrats</p>'
});

export default function Yes() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <h1 className="text-4xl font-normal text-pink-600 mb-8 text-center">Somewhere, in another timeline, < br/>another version of me just found another version of you, < br/>and the same thing happened. < br/>Because no matter the universe, no matter the odds, < br/>I was always going to find you. < br/>And we were always going to have this moment. 💖</h1>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWF2ODh3ZnlzbmpmcXF4cGVwc3N0b2xwaHpjcW9qdXd4OGVzZjlkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P3CZolxd8DeRy4g4fM/giphy.gif"
        alt="Happy GIF"
        className="m-8"
      />
      <FloatingHearts />

      <audio autoPlay loop>
        <source src="/onlyyou.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}