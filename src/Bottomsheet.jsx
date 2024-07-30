import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Bottomsheet = () => {
  const [mode, setMode] = useState("DEFAULT");
  const [isDragging, setIsDragging] = useState(false);
  const [yPosition, setYPosition] = useState(window.innerHeight / 2);
  const [animatedYPosition, setAnimatedYPosition] = useState(
    window.innerHeight / 2
  );
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [timestamp, setTimestamp] = useState(new Date());

  const [draggingSpeed, setDraggingSpeed] = useState(0);

  const handleTouchStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setYPosition(rect.top);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const now = new Date();
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      const dt = now - timestamp;
      const distance =
        Math.abs(x - lastPosition.x) + Math.abs(y - lastPosition.y);
      const speed = (distance / dt).toFixed(2);

      setDraggingSpeed(0);

      if (y >= 100 && y <= window.innerHeight / 2) {
        setYPosition(y);
        setDraggingSpeed(speed);
        setLastPosition({ x, y });
        setTimestamp(now);
      }
    }
  };

  const handleTouchEnd = () => {
    if (mode === "DEFAULT" && draggingSpeed > 0.1) {
      setAnimatedYPosition(100);
      setYPosition(100);
      setMode("EXPANDED");
    } else if (
      Math.abs(100 - yPosition) < Math.abs(window.innerHeight / 2 - yPosition)
    ) {
      setAnimatedYPosition(100);
      setYPosition(100);
      setMode("EXPANDED");
    } else if (mode === "EXPANDED" && draggingSpeed > 0.1) {
      setAnimatedYPosition(window.innerHeight / 2);
      setYPosition(window.innerHeight / 2);
      setMode("DEFAULT");
    } else if (
      Math.abs(100 - yPosition) > Math.abs(window.innerHeight / 2 - yPosition)
    ) {
      setAnimatedYPosition(window.innerHeight / 2);
      setYPosition(window.innerHeight / 2);
      setMode("DEFAULT");
    }
    setIsDragging(false);
  };

  useEffect(() => {
    console.log(draggingSpeed);
  }, [draggingSpeed]);

  return (
    <Parent onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}>
      <div>bottomsheet test</div>
      <Child
        style={{
          top: `${isDragging ? yPosition : animatedYPosition}px`,
        }}
        $isDragging={isDragging}>
        <HandleArea onTouchStart={handleTouchStart}>
          <Handle />
        </HandleArea>
        <Body>Contents area</Body>
      </Child>
    </Parent>
  );
};

export default Bottomsheet;

const Parent = styled.div`
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  overflow: hidden;
`;

const Child = styled.div`
  width: 100%;
  height: 744px;
  touch-action: none; // 터치되었을 때 뒷 배경 스크롤 막기
  background-color: yellow;
  border-radius: 20px 20px 0 0;
  position: absolute;
  transition: ${(props) => !props.$isDragging && "top 0.25s ease-out"};
`;

const HandleArea = styled.div`
  width: 100%;
  padding: 16px;
`;

const Handle = styled.div`
  width: 100px;
  height: 10px;
  background-color: gray;
  border-radius: 9999px;
  margin: 0 auto;
`;

const Body = styled.div`
  padding: 16px;
`;
