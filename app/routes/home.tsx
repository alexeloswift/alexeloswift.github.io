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
  const [gifPositions, setGifPositions] = useState<{ top: number; left: number; size: number; url: string }[]>([]);

  // List of GIFs
  const gifs = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FuaTUxaWxqMjg3MTV4emtieG8yajh0OHc5eXdrNng1YjZmdGhyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72F3zlbWvP4kJp4c/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHR4andoNG43Zm9kMDNvMzEycjN5eDVjdHIxZmRlOWl6NXJlajhkdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xFyn0emm4qvvAA/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjgwcW1pemxqOG9lYnFneGhvbmk2MzdpN2JjazkxcDk1b29weW53bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ikXcqqlSNH2Mw/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2g3N2UydjQyNng4Mnh3aDVibzBycG0zdmdtd3hic2pqNjllbzBtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tZebYjE6ZhyfVpEac/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnl5cWc2ZnltNm55bWlhbjFwb3lzaHdmdzVmNXE3Y215d2loN3N4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qRtwZkH3TaQrJuAUmp/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGZpZHh1ZmFybnlpZHE1MzJ4Njh6OHpzcjluZDkwdTRxeGllY3FvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26xBBjZ35Q6CMtuI8/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXo4dTYzcWRwYWR0bjhrOW5hajhldXlsMTN2aWNxcnQxYXZkMHlwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gKHGnB1ml0moQdjhEJ/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBsdHB6ZHVkMTVmaXR6Z213eHRtYXU0ejBzeWMxZ2wxY21kbnJmMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ng03Ga4I8IL3YD64Yq/giphy.gif"
  ];

  const MIN_DISTANCE = 15; // Minimum distance in percentage

  function getNonOverlappingPositions(count: number): { top: number; left: number; size: number; url: string }[] {
    let positions: { top: number; left: number; size: number; url: string }[] = [];

    function isTooClose(newPos: { top: number; left: number }) {
      return positions.some(
        (pos) =>
          Math.abs(pos.top - newPos.top) < MIN_DISTANCE &&
          Math.abs(pos.left - newPos.left) < MIN_DISTANCE
      );
    }

    for (let i = 0; i < count; i++) {
      let newPos;
      let attempts = 0;
      do {
        newPos = {
          top: Math.random() * 80 + 10, // 10% - 90%
          left: Math.random() * 80 + 10, // 10% - 90%
        };
        attempts++;
      } while (isTooClose(newPos) && attempts < 20); // Prevent infinite loops

      positions.push({
        ...newPos,
        size: Math.floor(Math.random() * 100) + 150, // Random size 150px - 250px
        url: gifs[i],
      });
    }

    return positions;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        console.log("Autoplay was blocked, user interaction required.");
      });
    }

    setGifPositions(getNonOverlappingPositions(gifs.length));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-pink-100 pt-20 overflow-hidden">
      {/* GIF Background */}
      {gifPositions.map((gif, index) => (
        <img
          key={index}
          src={gif.url}
          alt="Valentine GIF"
          className="floating-gif"
          style={{
            position: "absolute",
            top: `${gif.top}%`,
            left: `${gif.left}%`,
            width: `${gif.size}px`,
            height: `${gif.size}px`,
          }}
        />
      ))}

      {/* Main Content */}
      <h1 className="text-9xl font-serif text-pink-600 mb-8 text-center z-10">
        Will you be my <br /> Valentine?
      </h1>

      <div className="space-x-4 pt-20 z-10">
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
