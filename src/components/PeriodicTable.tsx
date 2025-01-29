import React from 'react';
import { Element } from '../data/chemicals';

interface PeriodicTableProps {
  elements: Element[];
  onElementClick: (element: Element) => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements, onElementClick }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'alkali-metal': '#ff6b6b',
      'alkaline-earth': '#ffd93d',
      'transition-metal': '#4dabf7',
      'post-transition': '#63e6be',
      'metalloid': '#a9e34b',
      'nonmetal': '#ff9d9d',
      'noble-gas': '#ffbcbc',
      'lanthanoid': '#cc5de8',
      'actinoid': '#845ef7'
    };
    return colors[category as keyof typeof colors] || '#fff';
  };

  // Define grid positions for each element based on their periodic table position
  const getGridPosition = (atomicNumber: number) => {
    const positions: Record<number, { row: number; col: number }> = {
      1: { row: 1, col: 1 },
      2: { row: 1, col: 18 },
      3: { row: 2, col: 1 },
      4: { row: 2, col: 2 },
      5: { row: 2, col: 13 },
      6: { row: 2, col: 14 },
      7: { row: 2, col: 15 },
      8: { row: 2, col: 16 },
      9: { row: 2, col: 17 },
      10: { row: 2, col: 18 },
      // Add all element positions...
    };
    return positions[atomicNumber] || { row: Math.floor(atomicNumber / 18) + 1, col: atomicNumber % 18 || 18 };
  };

  return (
    <div className="grid grid-cols-18 gap-1 p-4 bg-gray-800 rounded-xl overflow-x-auto">
      {elements.map(element => {
        const position = getGridPosition(element.atomicNumber);
        return (
          <button
            key={element.atomicNumber}
            onClick={() => onElementClick(element)}
            className="aspect-square p-1 rounded-lg transition-transform hover:scale-105 hover:z-10 relative group"
            style={{
              backgroundColor: getCategoryColor(element.category),
              gridRow: position.row,
              gridColumn: position.col,
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-900">
              <span className="text-xs opacity-75">{element.atomicNumber}</span>
              <span className="text-lg font-bold">{element.symbol}</span>
              <span className="text-xs truncate w-full text-center">{element.name}</span>
              <span className="text-xs opacity-75">{element.atomicMass.toFixed(1)}</span>
            </div>
            <div className="absolute inset-0 bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-2">
              <div className="text-xs">
                <p className="font-bold">{element.name}</p>
                <p>Block: {element.block}</p>
                <p>Category: {element.category}</p>
                <p>Mass: {element.atomicMass.toFixed(4)}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};