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
    fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `re_SPJmPSaz_D41MCiNDBxPqnggw7ut1dCPv`, // Replace with your key
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev", // You need to verify this domain in Resend
          to: "alexelo.swift@gmail.com.com", // Where you want to receive the email
          subject: "She Said Yes! ❤️",
          text: "Your Valentine’s request was accepted! 🎉",
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Email sent:", data))
        .catch((error) => console.error("Error sending email:", error));

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
      <h1 className="text-4xl font-bold text-pink-600 mb-8">Yay! You made my day! 💖</h1>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWF2ODh3ZnlzbmpmcXF4cGVwc3N0b2xwaHpjcW9qdXd4OGVzZjlkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P3CZolxd8DeRy4g4fM/giphy.gif"
        alt="Happy GIF"
        className="mb-8"
      />
            <FloatingHearts />

      <audio autoPlay loop>
        <source src="/onlyyou.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}