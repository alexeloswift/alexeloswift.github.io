import { useEffect, useState } from "react";

export default function floatinghearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        { id: Date.now(), left: Math.random() * 100 },
      ]);

      // Remove hearts after they finish animation
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{ left: `${heart.left}%` }}
        ></div>
      ))}
    </div>
  );
}
