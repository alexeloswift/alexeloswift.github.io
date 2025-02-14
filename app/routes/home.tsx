import { Link } from "react-router";
import FloatingHearts from "./floatinghearts";
import { useEffect, useRef } from "react";


export function meta() {
  return [
    { title: "Will you be my Valentine?" },
    { name: "description", content: "A special Valentine's Day request!" },
  ];
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        console.log("Autoplay was blocked, user interaction required.");
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-pink-100 pt-20">
      <h1 className="text-9xl font-serif text-pink-600 mb-8 text-center">Will you be my <br /> Valentine?</h1>

      <div className="space-x-4 pt-20">
        <Link
          to="/yes"
          className="bg-green-500 text-white px-12 py-4 rounded-lg hover:bg-green-600 text-2xl"
        >
          Yes
        </Link>
        <Link
          to="/no"
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
