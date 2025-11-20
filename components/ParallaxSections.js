"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ParallaxImageSections.css';
import Image from 'next/image';
import SplitTextLines from './SplitTextLines';

gsap.registerPlugin(ScrollTrigger);

const parallaxSectionsData = [
  {
    id: "mondes",
    title: "Nos mondes suggèrent plus qu'ils ne montrent.",
    imageSrc: "/images/Img-Mondes.png",
    imageAlt: "Illustration des mondes",
    imageWidth: 300,
    imageHeight: 300,
    yValue: -100,
    scrubValue: 1
  },
  {
    id: "architectures",
    title: "Architectures oubliées, symboles anciens, lumières tamisées, nous puisons dans le gothique, le mythe, la mémoire.",
    imageSrc: "/images/Img-Architectures.png",
    imageAlt: "Illustration des architectures",
    imageWidth: 170,
    imageHeight: 418,
    scrubValue: 1.5
  },
  {
    id: "projects",
    title: "Chaque projet explore un imaginaire stylisé, sensoriel, narratif.",
    imageSrc: "/images/Img-Projet.png",
    imageAlt: "Illustration des projets",
    imageWidth: 310,
    imageHeight: 418,
    scrubValue: 1.2
  },
  {
    id: "interactions",
    title: "Ici, chaque interaction a du sens, chaque ambiance imprime une émotion.",
    imageSrc: "/images/Img-Interaction.png",
    imageAlt: "Illustration des interactions",
    imageWidth: 366,
    imageHeight: 418,
    scrubValue: 1.8
  }
];

const ParallaxSection = ({ data }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: data.scrubValue
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className={`parallax-section ${data.id}`}>
      <div className="parallax-section__container">
        <SplitTextLines className="parallax-section__title">
          {data.title}
        </SplitTextLines>
      </div>
      <div ref={imageRef} className="parallax-section__image">
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          width={data.imageWidth}
          height={data.imageHeight}
        />
      </div>
    </section>
  );
};

const ParallaxSections = () => {
  return (
    <>
      {parallaxSectionsData.map((data) => (
        <ParallaxSection key={data.id} data={data} />
      ))}
    </>
  );
};

export default ParallaxSections;
