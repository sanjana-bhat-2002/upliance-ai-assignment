import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(() => {
    return Number(localStorage.getItem("count")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());

    document.body.style.transition = "background 0.7s ease-in-out";

    const percentage = Math.min(count, 100);

    document.body.style.background = `linear-gradient(to top, #2b84e3 ${percentage}%, #343434 ${percentage}%)`;

    return () => {
      document.body.style.background = "#343434";
    };
  }, [count]);

  return (
    <div className="w-1/2 flex flex-col justify-center items-center gap-4 overflow-hidden border-white rounded-xl">
      <div className="p-6 rounded-lg text-center overflow-hidden w-60 h-40 border-4 flex flex-col justify-center items-center gap-6">
        <div className="flex justify-center items-center gap-4 z-10">
          <button
            onClick={() => setCount(count + 1)}
            className="p-2 border rounded-xl"
          >
            +
          </button>

          <div>{count}</div>

          <button
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
            className="p-2 border rounded-xl"
          >
            -
          </button>
        </div>

        <button
          onClick={() => {
            setCount(0);
            localStorage.removeItem("count");
          }}
          className="p-4 mt-4 border rounded-lg z-10 relative"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
