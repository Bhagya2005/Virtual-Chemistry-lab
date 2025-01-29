import React from 'react';
import { Chemical } from '../data/chemicals';

interface BeakerProps {
  chemicals: (Chemical & { quantity: number })[];
  onDrop: (e: React.DragEvent) => void;
  solution: {
    color: string;
    equation: string;
    description: string;
  } | null;
  equipmentType: string;
}

export const Beaker: React.FC<BeakerProps> = ({ chemicals, onDrop, solution, equipmentType }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getContainerStyle = () => {
    switch (equipmentType) {
      case 'flask':
        return {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
          border: '4px solid #6B7280', // Example gray color for flask
          borderRadius: '0 0 24px 24px',
        };
      case 'test-tube':
        return {
          width: '100px',
          border: '3px solid #4F46E5', // Example indigo color for test-tube
          borderRadius: '0 0 24px 24px',
        };
      default:
        return {
          border: '5px solid #10B981', // Example green color for beaker
          borderRadius: '24px',
        };
    }
  };

  return (
    <div
      className="relative w-64 h-80 mx-auto group"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <div
        className="absolute bottom-0 w-full h-64 transition-all duration-500 backdrop-blur-sm"
        style={{
          ...getContainerStyle(),
          background: solution ? `${solution.color}dd` : 'rgba(255,255,255,0.3)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.4)',
        }}
      >
        {/* Message when no chemicals are present */}
        {chemicals.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
              <p className="text-gray-600">Drop chemicals here</p>
            </div>
          </div>
        )}
        {/* Message when chemicals are present but no solution */}
        {chemicals.length > 0 && !solution && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
              <p className="text-gray-600">Add more chemicals to see reaction</p>
            </div>
          </div>
        )}
      </div>

     {/* Top bar for beaker */}
     {equipmentType === 'beaker' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-300 rounded-t-lg" />
      )}
    </div>
  );
};
