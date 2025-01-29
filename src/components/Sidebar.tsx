import React, { useState } from 'react';
import { Search, FlaskConical, TestTubes, Beaker as BeakerIcon } from 'lucide-react';
import { Chemical } from '../data/chemicals';

interface SidebarProps {
  chemicals: Chemical[];
  onEquipmentSelect: (type: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ chemicals, onEquipmentSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredChemicals = chemicals.filter(chemical => 
    (selectedType === 'all' || chemical.type === selectedType) &&
    (chemical.name.toLowerCase().includes(search.toLowerCase()) ||
     chemical.formula.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDragStart = (e: React.DragEvent, chemical: Chemical) => {
    e.dataTransfer.setData('chemical', JSON.stringify(chemical));
  };

  const labEquipment = [
    { id: 'beaker', icon: BeakerIcon, name: 'Beaker' },
    { id: 'flask', icon: FlaskConical, name: 'Flask' },
    { id: 'test-tube', icon: TestTubes, name: 'Test Tube' },
  ];

  // const chemicalTypes = [
  //   { id: 'all', name: 'All' },
  //   { id: 'acid', name: 'Acids' },
  //   { id: 'base', name: 'Bases' },
  //   { id: 'salt', name: 'Salts' },
  //   { id: 'metal', name: 'Metals' },
  //   { id: 'nonmetal', name: 'Non-metals' },
  //   { id: 'organic', name: 'Organic' },
  //   { id: 'inorganic', name: 'Inorganic' },
  // ];

  return (
    <div className="w-80 h-full bg-white/80 backdrop-blur-sm shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Lab Equipment</h2>
        <div className="grid grid-cols-3 gap-2">
          {labEquipment.map(equipment => (
            <button
              key={equipment.id}
              onClick={() => onEquipmentSelect(equipment.id)}
              className="p-3 border rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center gap-1 group"
            >
              <equipment.icon className="text-gray-600 group-hover:text-blue-500 transition-colors" size={24} />
              <span className="text-sm">{equipment.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search chemicals..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* <div className="flex flex-wrap gap-2 mb-4">
          {chemicalTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedType === type.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            > */}
              {/* {type.name}
            </button>
          ))} */}
        {/* </div> */}
      </div> 

      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-2">
          {filteredChemicals.map(chemical => (
            <div
              key={chemical.id}
              draggable
              onDragStart={(e) => handleDragStart(e, chemical)}
              className="p-4 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-all"
              style={{
                backgroundColor: chemical.color === 'colorless' ? 'white' : `${chemical.color}22`,
                borderColor: chemical.color === 'colorless' ? undefined : chemical.color
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{chemical.name}</h3>
                  <p className="text-sm font-mono text-gray-600">{chemical.formula}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{chemical.type}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{chemical.state}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};