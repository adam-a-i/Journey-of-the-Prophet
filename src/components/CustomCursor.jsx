import { useEffect, useState } from "react";
import "../styles/CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let moveTimer;

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      setIsPointer(
        hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.tagName === "A" ||
          hoveredElement?.closest("button") ||
          hoveredElement?.closest("a")
      );
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", updateCursorType);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", updateCursorType);
      clearTimeout(moveTimer);
    };
  }, [position.x, position.y]);

  return (
    <>
      <div
        className={`cursor-core ${isMoving ? "moving" : ""} ${
          isPointer ? "pointer" : ""
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-ring ${isMoving ? "moving" : ""} ${
          isPointer ? "pointer" : ""
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-trail ${isMoving ? "moving" : ""} ${
          isPointer ? "pointer" : ""
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
