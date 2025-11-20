"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../styles/IntroSections.css';
import Image from 'next/image';
import SplitTextLines from './SplitTextLines';

gsap.registerPlugin(ScrollTrigger, SplitText);


const IntroSection1 = () => {
  const sectionRef = useRef(null);
  const characterRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animation du conteneur principal
    tl.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    }, 0);

    // SplitText animation sur le titre
    const titleSplit = new SplitText(titleRef.current, { type: "chars" });
    tl.from(titleSplit.chars, {
      opacity: 0.5,
      yPercent: 100,
      stagger: 0.08,
      duration: 0.8,
      ease: "power2.out",
      autoAlpha: 0,
    }, 0.2);

    // SplitText animation sur la description (lignes)
    const descSplit = new SplitText(descriptionRef.current, { type: "lines" });
    tl.from(descSplit.lines, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    }, 1.0);
  }, []);


  const handleCharacterClick = () => {
    characterRef.current?.classList.add('clicked');
    
    setTimeout(() => {
      characterRef.current?.classList.remove('clicked');
    }, 800);
  };

  return (
      <section ref={sectionRef} className="intro-section-1">
      <h2 ref={titleRef} className="intro-section-1__title">
        Nous Façonnons <br /> l&apos;invisible
      </h2>
      <p ref={descriptionRef} className="intro-section-1__description">Nous concevons des expériences interactives où la narration devient tangible, où la technique s&apos;efface derrière le sensible, où l&apos;on joue pour comprendre, ressentir, se souvenir.</p>
      <div className="intro-section-1__breadcrumb">
        <p>Accueil</p>
        <p>|</p>
        <p>Le Studio</p>
      </div>
      <Image 
        ref={characterRef}
        onClick={handleCharacterClick}
        src="/images/personnage.png" 
        alt="Personnage de la section héro" 
        width={202} 
        height={340} 
        className="intro-section-1__character"
        style={{ cursor: 'pointer' }}
      />
    </section>
  );
};

const IntroSection2 = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du conteneur principal
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      // Animation de déroulement horizontal des images
      gsap.from(imagesRef.current.filter(el => el !== null), {
        x: -100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Parallax effect au mouvement de la souris
      const handleMouseMove = (e) => {
        if (!galleryRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        imagesRef.current.forEach((imageContainer, index) => {
          if (!imageContainer) return;
          
          const parallaxIntensity = 15 + (index * 5); 
          
          gsap.to(imageContainer, {
            x: xPercent * parallaxIntensity,
            y: yPercent * (parallaxIntensity / 2),
            duration: 0.8,
            ease: "power2.out"
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="intro-section-2">
      <div className="intro-section-2__header">
        <h2 className="intro-section-2__header-title">Le jeu comme langage</h2>
        <div className="intro-section-2__header-content">
            <SplitTextLines className="intro-section-2__header-text">Chez Oneiric Tales, nous croyons que le jeu permet de dire autrement. Il capte l&apos;attention, fait ressentir, engage plus profondément. Chaque expérience est pensée comme un dialogue.</SplitTextLines>
            <SplitTextLines className="intro-section-2__header-text">Nous concevons des formes interactives qui traduisent des idées complexes en moments clairs, sensibles, mémorables.</SplitTextLines>
        </div>
      </div>
      <div ref={galleryRef} className="intro-section-2__gallery">
        <div ref={el => imagesRef.current[0] = el}>
          <Image src="/images/list-img0.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
        <div ref={el => imagesRef.current[1] = el}>
          <Image src="/images/list-img1.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
        <div ref={el => imagesRef.current[2] = el}>
          <Image src="/images/list-img2.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
        <div ref={el => imagesRef.current[3] = el}>
          <Image src="/images/list-img3.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
        <div ref={el => imagesRef.current[4] = el}>
          <Image src="/images/list-img4.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
        <div ref={el => imagesRef.current[5] = el}>
          <Image src="/images/list-img5.jpg" alt="Illustration du jeu comme langage" width={300} height={300} />
        </div>
      </div>
    </section>
  );
};


const IntroSection3 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  return (
    <section ref={sectionRef} className="intro-section-3">
      <SplitTextLines className="intro-section-3__label">Comment conçoit-on ?</SplitTextLines>
      <SplitTextLines className="intro-section-3__title">Un processus fluide, précis et organique</SplitTextLines>
      <Image src="/images/Arrow.png" alt="Flèche du processus de conception" width={10} height={100} className="intro-section-3__arrow" />
    </section>
  );
};

// Composant principal
const IntroSections = () => {
  return (
    <>
      <IntroSection1 />
      <IntroSection2 />
      <IntroSection3 />
    </>
  );
};

export default IntroSections;
