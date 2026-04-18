import React from 'react';

const DotGrid = ({ className = '', rows = 9, cols = 9 }) => {
  return (
    <div className={`inline-grid gap-4 ${className}`} 
         style={{ 
           gridTemplateColumns: `repeat(${cols}, min-content)`,
           gridTemplateRows: `repeat(${rows}, min-content)` 
         }}>
      {[...Array(rows * cols)].map((_, i) => (
        <div 
          key={i} 
          className="w-1 h-1 rounded-full bg-gray-300"
        />
      ))}
    </div>
  );
};

export default DotGrid;
