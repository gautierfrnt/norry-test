import Navbar from '@/components/NavBar';
import IntroSections from '@/components/IntroSections';
import Sections from '@/components/Sections';
import ParallaxSections from '@/components/ParallaxSections';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <IntroSections />
        <Sections />
        <ParallaxSections />  
        <CTA />
      </main>
      <Footer />
    </>
  );
}
