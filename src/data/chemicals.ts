export interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  type: 'acid' | 'base' | 'salt' | 'metal' | 'nonmetal' | 'organic' | 'inorganic' | 'other';
  state: 'solid' | 'liquid' | 'gas';
}

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  block: string;
  color: string;
}

// Helper function to generate reaction between chemicals
export function getReaction(chemicals: Chemical[]): {
  color: string;
  equation: string;
  description: string;
} | null {
  if (chemicals.length < 2) return null;

  // Sort chemicals by ID to ensure consistent reaction checking
  const ids = chemicals.map(c => c.id).sort().join('-');
  
  // Reaction database
  const reactions: Record<string, {
    color: string;
    equation: string;
    description: string;
  }> = {
    'hcl-naoh': {
      color: '#f0f8ff',
      equation: 'HCl + NaOH → NaCl + H₂O',
      description: 'Hydrochloric acid reacts with sodium hydroxide to form sodium chloride and water in a neutralization reaction.'
    },
    'cuso4-na': {
      color: '#a0522d',
      equation: '2Na + CuSO₄ → Cu + Na₂SO₄',
      description: 'Sodium metal displaces copper from copper sulfate solution, forming a brown copper precipitate.'
    },
    'agno3-nacl': {
      color: '#ffffff',
      equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
      description: 'Silver nitrate reacts with sodium chloride to form white silver chloride precipitate.'
    },
    'h2so4-naoh': {
      color: '#f0f8ff',
      equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
      description: 'Sulfuric acid reacts with sodium hydroxide to form sodium sulfate and water.'
    },
    'cuso4-naoh': {
      color: '#4169e1',
      equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
      description: 'Copper sulfate reacts with sodium hydroxide to form blue copper hydroxide precipitate.'
    },
    'fecl3-naoh': {
      color: '#8b4513',
      equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
      description: 'Iron(III) chloride reacts with sodium hydroxide to form brown iron(III) hydroxide precipitate.'
    },
    'k2cro4-agno3': {
      color: '#ff0000',
      equation: 'K₂CrO₄ + 2AgNO₃ → Ag₂CrO₄↓ + 2KNO₃',
      description: 'Potassium chromate reacts with silver nitrate to form red silver chromate precipitate.'
    }
  };

  return reactions[ids] || null;
}

export const chemicals: Chemical[] = [
  {
    id: 'hcl',
    name: 'Hydrochloric Acid',
    formula: 'HCl',
    color: '#e6f3ff',
    type: 'acid',
    state: 'liquid'
  },
  {
    id: 'h2so4',
    name: 'Sulfuric Acid',
    formula: 'H₂SO₄',
    color: '#f5f5f5',
    type: 'acid',
    state: 'liquid'
  },
  {
    id: 'naoh',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    color: '#ffffff',
    type: 'base',
    state: 'solid'
  },
  {
    id: 'cuso4',
    name: 'Copper Sulfate',
    formula: 'CuSO₄',
    color: '#4169e1',
    type: 'salt',
    state: 'solid'
  },
  {
    id: 'agno3',
    name: 'Silver Nitrate',
    formula: 'AgNO₃',
    color: '#ffffff',
    type: 'salt',
    state: 'solid'
  },
  {
    id: 'nacl',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    color: '#ffffff',
    type: 'salt',
    state: 'solid'
  },
  {
    id: 'fecl3',
    name: 'Iron(III) Chloride',
    formula: 'FeCl₃',
    color: '#8b4513',
    type: 'salt',
    state: 'solid'
  },
  {
    id: 'k2cro4',
    name: 'Potassium Chromate',
    formula: 'K₂CrO₄',
    color: '#ffff00',
    type: 'salt',
    state: 'solid'
  },
  {
    id: 'na',
    name: 'Sodium',
    formula: 'Na',
    color: '#c0c0c0',
    type: 'metal',
    state: 'solid'
  },
  {
    "id": "acetic_acid",
    "name": "Acetic Acid",
    "formula": "C₂H₄O₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "sulfuric_acid",
    "name": "Sulfuric Acid",
    "formula": "H₂SO₄",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "nitric_acid",
    "name": "Nitric Acid",
    "formula": "HNO₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "phosphoric_acid",
    "name": "Phosphoric Acid",
    "formula": "H₃PO₄",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "citric_acid",
    "name": "Citric Acid",
    "formula": "C₆H₈O₇",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "formic_acid",
    "name": "Formic Acid",
    "formula": "CH₂O₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "peracetic_acid",
    "name": "Peracetic Acid",
    "formula": "C₂H₄O₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "hydrofluoric_acid",
    "name": "Hydrofluoric Acid",
    "formula": "HF",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "hydrosulfuric_acid",
    "name": "Hydrosulfuric Acid",
    "formula": "H₂S",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "gas"
  },
  {
    "id": "chloric_acid",
    "name": "Chloric Acid",
    "formula": "HClO₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "boric_acid",
    "name": "Boric Acid",
    "formula": "H₃BO₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "tannic_acid",
    "name": "Tannic Acid",
    "formula": "C₇₆H₄₀O₁₉",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "acetohydroxamic_acid",
    "name": "Acetohydroxamic Acid",
    "formula": "C₂H₅NO₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "lactic_acid",
    "name": "Lactic Acid",
    "formula": "C₃H₆O₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "glycolic_acid",
    "name": "Glycolic Acid",
    "formula": "C₂H₄O₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "stearic_acid",
    "name": "Stearic Acid",
    "formula": "C₁₈H₃₆O₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "oleic_acid",
    "name": "Oleic Acid",
    "formula": "C₁₈H₃₄O₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "liquid"
  },
  {
    "id": "malic_acid",
    "name": "Malic Acid",
    "formula": "C₄H₆O₅",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "succinic_acid",
    "name": "Succinic Acid",
    "formula": "C₄H₆O₄",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "fumaric_acid",
    "name": "Fumaric Acid",
    "formula": "C₄H₄O₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "maleic_acid",
    "name": "Maleic Acid",
    "formula": "C₄H₄O₄",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "benzoic_acid",
    "name": "Benzoic Acid",
    "formula": "C₆H₆COOH",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "salicylic_acid",
    "name": "Salicylic Acid",
    "formula": "C₇H₆O₃",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "ascorbic_acid",
    "name": "Ascorbic Acid (Vitamin C)",
    "formula": "C₆H₈O₆",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "glutamic_acid",
    "name": "Glutamic Acid",
    "formula": "C₅H₉NO₄",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "aminobenzoic_acid",
    "name": "Aminobenzoic Acid",
    "formula": "C₇H₉NO₂",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "solid"
  },
  {
    "id": "hydrocyanic_acid",
    "name": "Hydrocyanic Acid",
    "formula": "HCN",
    "color": "#e6f3ff",
    "type": "acid",
    "state": "gas"
  },
  // {
  //   "id": "chlorine",
  //   "name": "Chlorine",
  //   "formula": "Cl₂",
  //   "color": "#ffcccc",
  //   "type": "halogen",
  //   "state": "gas"
  // },
  {
    "id": "sodium_hydroxide",
    "name": "Sodium Hydroxide",
    "formula": "NaOH",
    "color": "#cce6ff",
    "type": "base",
    "state": "solid"
  },
  {
    "id": "potassium_hydroxide",
    "name": "Potassium Hydroxide",
    "formula": "KOH",
    "color": "#cce6ff",
    "type": "base",
    "state": "solid"
  },
  {
    "id": "calcium_hydroxide",
    "name": "Calcium Hydroxide",
    "formula": "Ca(OH)₂",
    "color": "#cce6ff",
    "type": "base",
    "state": "solid"
  },
  {
    "id": "ammonium_hydroxide",
    "name": "Ammonium Hydroxide",
    "formula": "NH₄OH",
    "color": "#cce6ff",
    "type": "base",
    "state": "liquid"
  },
  {
    "id": "magnesium_hydroxide",
    "name": "Magnesium Hydroxide",
    "formula": "Mg(OH)₂",
    "color": "#cce6ff",
    "type": "base",
    "state": "solid"
  }
];

export const periodicTable: Element[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hydrogen",
    atomicMass: 1.008,
    category: "nonmetal",
    block: "s",
    color: "#ff9d9d"
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Helium",
    atomicMass: 4.003,
    category: "noble-gas",
    block: "s",
    color: "#ffbcbc"
  },
  // ... rest of the periodic table data remains the same
];