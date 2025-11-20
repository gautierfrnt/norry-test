import React from 'react';
import '../styles/navbar.css';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="#accueil">
          <Image src="/images/logo-marque-white.png" alt="Logo Oneiric Tales" width={50} height={50} />
        </Link>
      </div>
      <ul className="nav-links">
        <Link href="#services"><li>Services</li></Link>
        <Link href="#realisations"><li>Réalisations</li></Link>
        <Link href="#le-studio"><li>Le Studio</li></Link>
        <Link href="#ressources"><li>Ressources</li></Link>
      </ul>
      <div className="contact-button">
        <Link href="/contact">Contactez-nous</Link>
      </div>
    </nav>
  );
};

export default Navbar;
