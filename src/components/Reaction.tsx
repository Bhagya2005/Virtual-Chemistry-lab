import React from 'react';

// Define the type for the reaction data
type Reaction = {
  color: string;
  equation: string;
  description: string;
};

// reaction data
const reaction: { [key: string]: Reaction } = {
  'hcl-naoh': {
    color: '#f0f8ff',
    equation: 'HCl + NaOH → NaCl + H₂O',
    description:
      'Hydrochloric acid reacts with sodium hydroxide to form sodium chloride and water in a neutralization reaction.',
  },
  'cuso4-na': {
    color: '#a0522d',
    equation: '2Na + CuSO₄ → Cu + Na₂SO₄',
    description:
      'Sodium metal displaces copper from copper sulfate solution, forming a brown copper precipitate.',
  },
  'agno3-nacl': {
    color: '#ffffff',
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    description:
      'Silver nitrate reacts with sodium chloride to form white silver chloride precipitate.',
  },
  'h2so4-naoh': {
    color: '#f0f8ff',
    equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    description:
      'Sulfuric acid reacts with sodium hydroxide to form sodium sulfate and water.',
  },
  'cuso4-naoh': {
    color: '#4169e1',
    equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
    description:
      'Copper sulfate reacts with sodium hydroxide to form blue copper hydroxide precipitate.',
  },
  'fecl3-naoh': {
    color: '#8b4513',
    equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
    description:
      'Iron(III) chloride reacts with sodium hydroxide to form brown iron(III) hydroxide precipitate.',
  },
  'k2cro4-agno3': {
    color: '#ff0000',
    equation: 'K₂CrO₄ + 2AgNO₃ → Ag₂CrO₄↓ + 2KNO₃',
    description:
      'Potassium chromate reacts with silver nitrate to form red silver chromate precipitate.',
  },
};

// Define a single reaction component
const ReactionCard: React.FC<{ name: string; reaction: Reaction }> = ({
  name,
  reaction,
}) => {
  return (
    <div
      style={{
        border: `2px solid ${reaction.color}`,
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: `${reaction.color}30`, // Adds transparency for the background
      }}
    >
      <h2 style={{ color: reaction.color }}>{name.toUpperCase()}</h2>
      <p>
        <strong>Equation:</strong> {reaction.equation}
      </p>
      <p>
        <strong>Description:</strong> {reaction.description}
      </p>
    </div>
  );
};

// Main component
const Reaction: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4a90e2' }}>
        Chemical reaction Reference
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Explore a collection of chemical reaction with their equations and
        detailed descriptions.
      </p>
      <div>
        {Object.entries(reaction).map(([key, reaction]) => (
          <ReactionCard key={key} name={key} reaction={reaction} />
        ))}
      </div>
    </div>
  );
};

export default Reaction;
