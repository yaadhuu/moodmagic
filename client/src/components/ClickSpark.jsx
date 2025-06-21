import React, { useCallback } from 'react';
import '../styles/ClickSpark.css';

const ClickSpark = ({
  children,
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) => {
  const createSpark = useCallback((e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-effect';
      spark.style.backgroundColor = sparkColor;
      spark.style.width = `${sparkSize}px`;
      spark.style.height = `${sparkSize}px`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--spark-radius', `${sparkRadius}px`);
      spark.style.setProperty('--spark-duration', `${duration}ms`);

      const angle = (360 / sparkCount) * i;
      const radians = angle * (Math.PI / 180);
      const startX = x + Math.cos(radians) * 0; // Start at the click point
      const startY = y + Math.sin(radians) * 0; // Start at the click point
      const endX = x + Math.cos(radians) * sparkRadius;
      const endY = y + Math.sin(radians) * sparkRadius;

      spark.style.setProperty('--start-x', `${startX}px`);
      spark.style.setProperty('--start-y', `${startY}px`);
      spark.style.setProperty('--end-x', `${endX}px`);
      spark.style.setProperty('--end-y', `${endY}px`);

      target.appendChild(spark);

      spark.animate(
        [
          {
            opacity: 1,
            transform: `translate(-50%, -50%) translate(${startX - x}px, ${startY - y}px) scale(1)`,
          },
          {
            opacity: 0,
            transform: `translate(-50%, -50%) translate(${endX - x}px, ${endY - y}px) scale(0)`,
          },
        ],
        {
          duration: duration,
          easing: 'ease-out',
          fill: 'forwards',
        }
      ).onfinish = () => {
        spark.remove();
      };
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div
      onClick={createSpark}
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
};

export default ClickSpark;