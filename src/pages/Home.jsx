import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HireTalent from '../components/HireTalent';
import Interview from '../components/Interview';
import Workflow from '../components/Workflow';
import CoreOfferings from '../components/CoreOfferings';
import CTABanner from '../components/CTABanner';
import Industries from '../components/Industries';
import Clients from '../components/Clients';
import Network from '../components/Network';

function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Full Width Hero */}
      <Hero />
      
      {/* Sections handle their own width to allow background colors to span full page width */}
      <About />
      <HireTalent />
      <CoreOfferings />
      <Interview />
      <Workflow />
      <CTABanner />
      <Industries />
      <Clients />
      <Network />
    </main>
  );
}

export default Home;
