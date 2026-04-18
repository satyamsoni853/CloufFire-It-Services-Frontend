import React from 'react';
import IndustriesHero from '../components/IndustriesHero';
import MoodleServices from '../components/MoodleServices';
import IndustriesServe from '../components/IndustriesServe';
import WorkWithPeople from '../components/WorkWithPeople';

const IndustriesPage = () => {
  return (
    <div className="page pt-20">
      <IndustriesHero />
     
      <IndustriesServe />
       <MoodleServices />
      <WorkWithPeople />
    </div>
  );
};

export default IndustriesPage;
