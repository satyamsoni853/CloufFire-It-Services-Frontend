import React from 'react';
import ExpertiseHero from '../components/ExpertiseHero';
import ExpertiseIntro from '../components/ExpertiseIntro';
import ExpertiseGrid from '../components/ExpertiseGrid';

const ExpertisePage = () => {
  return (
    <div className="page pt-20">
      <ExpertiseHero />
      <ExpertiseIntro />
      <ExpertiseGrid />
    </div>
  );
};

export default ExpertisePage;
