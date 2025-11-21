"use client";

import { useEffect, useRef } from 'react';
import '../styles/CTASection.css';
import Image from 'next/image';
import SplitTextLines from './SplitTextLines';

const CTASection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const updateCanvasSize = () => {
      // Utiliser clientWidth/Height pour plus de fiabilité
      const width = window.innerWidth || document.documentElement.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      drawCircles();
    };

    const drawCircles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 160;
      const halfCircleWidth = 320;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#030303';
      ctx.beginPath();
      ctx.arc(centerX - radius, centerY, halfCircleWidth, Math.PI / 2, -Math.PI / 2);
      ctx.fill();

      ctx.fillStyle = '#030303';
      for (let i = 2; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX - halfCircleWidth - radius * i, centerY, radius, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
      }
      
      ctx.fillStyle = '#030303';
      ctx.beginPath();
      ctx.arc(centerX + radius, centerY, halfCircleWidth, Math.PI / 2, -Math.PI / 2, true);
      ctx.fill();
      
      ctx.fillStyle = '#030303';
      for (let i = 2; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX + halfCircleWidth + radius * i, centerY, radius, Math.PI / 2, -Math.PI / 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Initialiser avec un délai pour s'assurer que le DOM est prêt
    setTimeout(updateCanvasSize, 100);

    // Ajouter les listeners pour le resize
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('orientationchange', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('orientationchange', updateCanvasSize);
    };
  }, []);

  return (
    <section className="cta-section">
      <canvas ref={canvasRef} className="cta-canvas"></canvas>
      <div className="cta-section__container">
        <SplitTextLines className="cta-section__title">Un projet en tête ? <br /> Faisons-en une expérience</SplitTextLines>
        <SplitTextLines className="cta-section__text">Prototype, jeu, expérience immersive ou projet hybride, on est prêt à écouter, réfléchir et créer avec vous.</SplitTextLines>
      </div>
      <div className="cta-section__cta">
        <p className="cta-section__cta-text">Réserver un échange</p>
        <div className="cta-section__badge">
          <Image src="/images/check.png" alt="Icône check" width={6} height={5} />
          <p>Gratuit, sans engagement</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;