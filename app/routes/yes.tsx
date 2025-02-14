import { Link } from "react-router";
import FloatingHearts from "./floatinghearts";
import { useEffect, useRef, useState } from "react";

export function meta() {
  return [
    { title: "Will you be my Valentine?" },
    { name: "description", content: "A special Valentine's Day request!" },
  ];
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [gifPositions, setGifPositions] = useState<{ top: number; left: number; url: string }[]>([]);

  // List of Valentine-themed GIFs (URLs)
  const gifs = [
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWF2ODh3ZnlzbmpmcXF4cGVwc3N0b2xwaHpjcW9qdXd4OGVzZjlkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P3CZolxd8DeRy4g4fM/giphy.gif",
    "https://media.giphy.com/media/l0MYKDrj6SXHzkC3u/giphy.gif",
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://media.giphy.com/media/xT8qB2zHyX1t1k6hS8/giphy.gif",
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        console.log("Autoplay was blocked, user interaction required.");
      });
    }

    // Generate random positions for GIFs
    const newPositions = Array.from({ length: 5 }, () => ({
      top: Math.random() * 80 + 10, // Between 10% and 90% of screen height
      left: Math.random() * 80 + 10, // Between 10% and 90% of screen width
      url: gifs[Math.floor(Math.random() * gifs.length)],
    }));

    setGifPositions(newPositions);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-pink-100 pt-20 overflow-hidden">
      {/* Random GIFs */}
      {gifPositions.map((gif, index) => (
        <img
          key={index}
          src={gif.url}
          alt="Valentine GIF"
          className="absolute w-24 h-24 opacity-80 floating-gif"
          style={{ top: `${gif.top}%`, left: `${gif.left}%` }}
        />
      ))}

      {/* Main Content */}
      <h1 className="text-9xl font-serif text-pink-600 mb-8 text-center">
        Will you be my <br /> Valentine?
      </h1>

      <div className="space-x-4 pt-20">
        <Link
          to="/#/yes"
          className="bg-green-500 text-white px-12 py-4 rounded-lg hover:bg-green-600 text-2xl"
        >
          Yes
        </Link>
        <Link
          to="/#/no"
          className="bg-red-500 text-white px-12 py-4 rounded-lg hover:bg-red-600 text-2xl"
        >
          No
        </Link>
      </div>

      <audio ref={audioRef} autoPlay loop>
        <source src="/bemyvalentine.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <FloatingHearts />
    </div>
  );
}
