import React from 'react';
import Hero from '../components/ServiceHero';
import WebTechnologies from '../components/WebTechnologies';
import CMSBuilders from '../components/CMSBuilders';
import AISection from '../components/AISection';
import AdditionalServices from '../components/AdditionalServices';
import ResourceAugmentation from '../components/ResourceAugmentation';

function ServicePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <WebTechnologies />
      <CMSBuilders />
      <AISection />
      <AdditionalServices />
      <ResourceAugmentation />
    </main>
  );
}

export default ServicePage;

