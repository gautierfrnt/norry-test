"use client";

import React, { useRef, useEffect } from 'react';
import '../styles/footer.css';
import Image from 'next/image';
import Link from 'next/link'; 
import SplitTextLines from './SplitTextLines';

const Footer = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Définir la taille du canvas
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCircles();
    };
  
    const drawCircles = () => {
      const rightX = canvas.width * 0.8;
      const centerY = canvas.height / 2;
      const grey_radius = 100;
      const white_radius = 200;

      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Petits demi-cercles noirs à droite
      ctx.fillStyle = '#212121';
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(rightX, centerY - grey_radius - white_radius * i, grey_radius, Math.PI * 2, -Math.PI * 2);
        ctx.fill();
      }

      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(rightX, centerY + grey_radius + white_radius * i, grey_radius, Math.PI * 2, -Math.PI * 2);
        ctx.fill();
      }

      // Cercle blanc (centre)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(rightX, centerY, white_radius, 0, Math.PI * 2);
      ctx.fill();
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <footer className="footer">
      <canvas ref={canvasRef} className="cta-canvas2"></canvas>
      <div className='container'>
          <Image src="/images/oneiric-tales.png" alt="Background du footer" width={223} height={26} />
          <SplitTextLines className='title'>Jeux vidéo, expériences immersives et créations interactives</SplitTextLines>
          <div className='block_footer'>
            <div className="adresse"> 
              <h2>Adresse</h2>
              <div className='icone'>
                <Image src="/images/logo-maps.png" alt="Icône adresse" width={24} height={24} />
                <p className='underscore'>15 rue des Halles, 75001 Paris, France</p>
              </div>
              <div className='social-media'>
                <p>Suivez l&apos;aventure</p>
                <div className="social-icons">
                  <Link href="https://www.instagram.com/oneiric.tales/" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/logo-insta.png" alt="Icône Instagram" width={16} height={16} />
                  </Link>
                  <Link href="https://www.linkedin.com/company/oneiric-tales/" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/logo-linkedin.png" alt="Icône LinkedIn" width={16} height={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="adresse">
              <h2>Services</h2>
              <div>
                <p className='text'>Développement de jeux vidéo &amp; serious games</p>
                <p className='text'>Conception &amp; définition de vision</p>
                <p className='text'>Production artistique</p>
              </div>
            </div>
            <div className="adresse">
              <h2>Ressources</h2>
              <div>
                <p className='text'>Le Studio</p>
                <p className='text'>Réalisations</p>
                <p className='text'>Blog</p>
              </div>
            </div>
          </div>
      </div>

      <div className='project'>
        <h2>Parlez-nous de votre projet</h2>
        <Link href="/contact">Réserver un échange</Link>
        <div>
          <Image src="/images/check.png" alt="Icône check" width={6} height={5} />
          <p>Gratuit, sans engagement</p>
        </div>
      </div>

      <div className='underfooter'>
        <p>© 2024 Oneiric Tales. Tous droits réservés.</p>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/politique-confidentialite">Politique de confidentialité</Link>
        <Link href="/gestion-cookies">Gestion des cookies</Link>
        <div className='flex-norry'>
          <p>Un site fièrement réalisé par</p>
          <Link href="https://www.norry.fr/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/norry-logo.png" alt="Logo Norry" width={55} height={11} />
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
