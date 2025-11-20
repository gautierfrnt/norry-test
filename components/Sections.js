"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../styles/HeadingSections.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);


const sectionsData = [
  {
    id: "cadrage",
    number: "1/6",
    stage: "Pré - Production",
    title: "Cadrage",
    text: "On commence par cerner vos enjeux : publics, objectifs, contraintes techniques et narratifs. Un moment de clarification.",
    tags: ["cadrage", "problématique", "public", "objectif", "narratif...", "contrainte"],
  },
  {
    id: "ideation",
    number: "2/6",
    stage: "Pré - Production",
    title: "Idéation & intentions",
    text: "On explore des concepts, mécaniques, formats. On pose les premières bases interactives : ambiance, gameplay, narration.",
    tags: null,
  },
  {
    id: "prototype",
    number: "3/6",
    stage: "Pré - Production",
    title: "Prototype jouable",
    text: "On produit un MVP rapide, un vertical slice. Assez pour tester, ajuster, décider.",
    tags: null,
  },
  {
    id: "iteration",
    number: "4/6",
    stage: "Production",
    title: "Itération & design final",
    text: "On affine mécaniques, interface, rythme. C'est ici que tout prend sa forme complète.",
    tags: null,
  },
  {
    id: "production",
    number: "5/6",
    stage: "Production",
    title: "Production & intégration",
    text: "On entre dans le dur. Unity, unreal, animations, assets, son. Tout s'assemble.",
    tags: null,
  },
  {
    id: "delivery",
    number: "6/6",
    stage: "Production",
    title: "Livraison & suivi",
    text: "On livre une expérience stable, cohérente, documentée. Et on reste disponibles pour la faire évoluer.",
    tags: null,
  },
];


export default function Sections() {
  const sliderRef = useRef(null);
  const sliderTagsRef = useRef([]);
  const currentSplitTitleRef = useRef(null);
  const currentSplitTextRef = useRef(null);


  const animateNewSlide = (index) => {
    if (index >= sectionsData.length) return;

    const data = sectionsData[index];
    const sliderSlideRef = sliderRef.current?.querySelector(".slider-slide");
    const sliderTitleRef = sliderRef.current?.querySelector(".heading-section__title");
    const sliderTextRef = sliderRef.current?.querySelector(".heading-section__text");
    const sliderMetaNumberRef = sliderRef.current?.querySelector(".heading-section__meta-item:first-child");
    const sliderMetaStageRef = sliderRef.current?.querySelector(".heading-section__meta-item:last-child");

    // 1. Changer le background
    if (sliderSlideRef) {
      sliderSlideRef.className = `slider-slide heading-section ${data.id}`;
      
      gsap.to(sliderSlideRef, {
        opacity: 0.95,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Mettre à jour numéro et étape
    if (sliderMetaNumberRef) sliderMetaNumberRef.textContent = data.number;
    if (sliderMetaStageRef) sliderMetaStageRef.textContent = data.stage;

    // Animer le titre
    if (currentSplitTitleRef.current) currentSplitTitleRef.current.revert();
    if (sliderTitleRef) {
      sliderTitleRef.textContent = data.title;
      currentSplitTitleRef.current = new SplitText(sliderTitleRef, { type: "lines" });
      gsap.set(currentSplitTitleRef.current.lines, { yPercent: 100, opacity: 0 });
      gsap.to(currentSplitTitleRef.current.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    // Animer le texte
    if (currentSplitTextRef.current) currentSplitTextRef.current.revert();
    if (sliderTextRef) {
      sliderTextRef.textContent = data.text;
      currentSplitTextRef.current = new SplitText(sliderTextRef, { type: "lines" });
      gsap.set(currentSplitTextRef.current.lines, { yPercent: 50, opacity: 0 });
      gsap.to(currentSplitTextRef.current.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Afficher/masquer les tags
    sliderTagsRef.current.forEach((tag) => {
      if (tag) {
        gsap.to(tag, {
          opacity: data.tags ? 1 : 0,
          duration: 0.5,
        });
      }
    });
  };


  useGSAP(
    () => {
      let activeSlide = 0;
      // Règler le scroll
      const pinDistance = 2 * window.innerHeight * sectionsData.length;

      animateNewSlide(0);

      ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const currentSlide = Math.floor(self.progress * sectionsData.length);
          if (activeSlide !== currentSlide && currentSlide < sectionsData.length) {
            activeSlide = currentSlide;
            animateNewSlide(activeSlide);
          }
        },
      });

      return () => {
        if (currentSplitTitleRef.current) currentSplitTitleRef.current.revert();
        if (currentSplitTextRef.current) currentSplitTextRef.current.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sliderRef }
  );

  return (
    <section className="slider" ref={sliderRef}>
      <div className="slider-content">
        <div className={`slider-slide heading-section ${sectionsData[0].id}`}>
          <div className="heading-section__container">
            {/* Métadonnées */}
            <div className="heading-section__meta">
              <p className="heading-section__meta-item">{sectionsData[0].number}</p>
              <div className="heading-section__separator"></div>
              <p className="heading-section__meta-item">{sectionsData[0].stage}</p>
            </div>

            {/* Titre et texte */}
            <h2 className="heading-section__title">{sectionsData[0].title}</h2>
            <p className="heading-section__text">{sectionsData[0].text}</p>
          </div>

          {/* Tags */}
          {sectionsData[0].tags && (
            <>
              {sectionsData[0].tags.map((tag, i) => (
                <p
                  key={i}
                  ref={(el) => (sliderTagsRef.current[i] = el)}
                  className="heading-section__tag"
                >
                  {tag}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
