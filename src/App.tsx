import React, { useState } from 'react';
import { Scene3D } from './components/Scene3D';
import { Sidebar } from './components/Sidebar';


import { QuantityModal } from './components/QuantityModal';
import { chemicals, Chemical, getReaction } from './data/chemicals';
import { Beaker, FlaskConical, TestTubes, Copy, RotateCcw,  Sparkles } from 'lucide-react';

function App() {
  const [beakerChemicals, setBeakerChemicals] = useState<(Chemical & { quantity: number })[]>([]);
  const [selectedChemical, setSelectedChemical] = useState<Chemical | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState('beaker');

  const [solution, setSolution] = useState<{
    color: string;
    equation: string;
    description: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const chemical = JSON.parse(e.dataTransfer.getData('chemical')) as Chemical;
    setSelectedChemical(chemical);
  };

  const handleQuantityConfirm = (quantity: number) => {
    if (selectedChemical) {
      const newChemicals = [...beakerChemicals, { ...selectedChemical, quantity }];
      setBeakerChemicals(newChemicals);
      const reaction = getReaction(newChemicals);
      if (reaction) {
        setSolution(reaction);
      }
    }
    setSelectedChemical(null);
  };

  const getEquipmentIcon = () => {
    switch (selectedEquipment) {
      case 'flask':
        return FlaskConical;
      case 'test-tube':
        return TestTubes;
      default:
        return Beaker;
    }
  };

  const copyToClipboard = () => {
    if (solution) {
      const text = `Equation: ${solution.equation}\nDescription: ${solution.description}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetExperiment = () => {
    setBeakerChemicals([]);
    setSolution(null);
  };


  const CurrentEquipmentIcon = getEquipmentIcon();

  function scene3DHandleDrop(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Sidebar 
        chemicals={chemicals} 
        onEquipmentSelect={setSelectedEquipment}
      />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg shadow-blue-500/20">
                <CurrentEquipmentIcon className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  Virtual Chemistry Lab
                  <Sparkles className="text-yellow-400" size={24} />
                </h1>
               
              </div>
            </div>
            <div className="flex gap-3">
         
          
              <button
                onClick={resetExperiment}
                className="flex items-center gap-2 px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-colors shadow-lg"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>

         
          

          <div className="bg-white/5 backdrop-blur-md rounded-2xl display-flex shadow-2xl border border-white/10 p-8">
          <div className="flex justify-center mb-8" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
  <Scene3D
    chemicals={beakerChemicals}
    solution={solution}
    equipmentType={selectedEquipment}
    onDrop={scene3DHandleDrop}  // Pass the Scene3D specific drop handler
  />
</div>
            {solution && (
              <div className="mt-8 bg-black/30 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="p-4 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white">Reaction Details</h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors shadow-lg"
                    >
                      <Copy size={16} />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-200 mb-2">Equation</h4>
                    <p className="font-mono bg-black/20 p-3 rounded-lg text-white">{solution.equation}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-200 mb-2">Description</h4>
                    <p className="text-blue-100">{solution.description}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="font-semibold text-white mb-3">Current Chemicals</h3>
              {beakerChemicals.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {beakerChemicals.map((chemical, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2 rounded-xl text-sm backdrop-blur-sm shadow-lg"
                      style={{
                        backgroundColor: `${chemical.color}22`,
                        borderColor: chemical.color,
                        borderWidth: 1,
                        color: 'white'
                      }}
                    >
                      <div className="font-medium">{chemical.name}</div>
                      <div className="text-xs opacity-80">
                        {chemical.quantity} {chemical.state === 'liquid' ? 'mL' : 'g'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-blue-200">
                  <p>Drag chemicals from the sidebar to start experimenting!</p>
                </div>
              )}
             
             <div className="bg-gray-800 text-white py-6">
  <div className="container mx-auto text-center space-y-4">

   <h3 className="text-base font-semibold text-blue-400 mb-2">Reference</h3>
      <div className="flex justify-center gap-2 flex-wrap">
        <a
        
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
        HCl + NaOH → NaCl + H₂O
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
         2Na + CuSO₄ → Cu + Na₂SO₄
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
        AgNO₃ + NaCl → AgCl↓ + NaNO₃
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
         H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
         CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄0
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
        FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl
        </a>
        <a
         
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
        K₂CrO₄ + 2AgNO₃ → Ag₂CrO₄↓ + 2KNO₃
        </a>
       

       
      </div>


    {/* Developer Name */}
    <p className="text-lg mb-6">
      Developed by <span className="font-semibold text-blue-400">Bhagya Nitinkumar Patel</span>
    </p>

    {/* Portfolio Link */}
 <div className='mt-12'>
    <a
          href="https://bhagya-patel-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-blue-500 rounded-lg text-sm"
        >
           Visit My Portfolio
        </a>
        </div>
    {/* Description */}
    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
    Enthusiastic Computer Science Engineering student skilled in Java, Python, and web development with React.js. Experienced in building real-time applications and predictive models using scikit-learn and TensorFlow. Solved 500+ problems on LeetCode and achieved AIR 553 in the NSTSE.
    </p>

    
    
    {/* Social Links */}
    <div className="flex justify-center gap-4 mt-4">
      <a
        href="https://www.linkedin.com/in/bhagyapatel"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.285c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.285h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.242c.542-.867 1.502-1.242 2.458-1.242 2.186 0 3.542 1.624 3.542 3.75v5.25z" />
        </svg>
      </a>



    
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

      {selectedChemical && (
        <QuantityModal
          chemical={selectedChemical}
          onConfirm={handleQuantityConfirm}
          onClose={() => setSelectedChemical(null)}
        />
      )}
      
    </div>
    
  );
}

export default App;