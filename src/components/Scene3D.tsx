// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera, Environment, Stars, ContactShadows } from '@react-three/drei';
// import { Chemical } from '../data/chemicals';
// import { Beaker3D } from './Beaker3D';

// interface Scene3DProps {
//   chemicals: (Chemical & { quantity: number })[];
//   solution: {
//     color: string;
//     equation: string;
//     description: string;
//   } | null;
//   equipmentType: string;
// }

// export const Scene3D = ({ chemicals, solution, equipmentType }: Scene3DProps) => {
//   return (
//     <div className="w-full h-[600px] relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20 pointer-events-none" />
//       <Canvas shadows dpr={[1, 2]}>
//         <color attach="background" args={['#000']} />
//         <fog attach="fog" args={['#000', 5, 15]} />
        
//         {/* Lighting */}
//         <ambientLight intensity={0.2} />
//         <spotLight
//           position={[5, 5, 5]}
//           angle={0.15}
//           penumbra={1}
//           intensity={1}
//           castShadow
//           shadow-mapSize={[1024, 1024]}
//         />
//         <pointLight position={[-5, 5, -5]} intensity={0.5} />
        
//         {/* Camera & Controls */}
//         <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
//         <OrbitControls 
//           enablePan={false}
//           minPolarAngle={Math.PI / 4}
//           maxPolarAngle={Math.PI / 2}
//           minDistance={3}
//           maxDistance={8}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
        
//         {/* Environment & Effects */}
//         <Environment preset="night" />
//         <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
//         {/* Lab Equipment */}
//         <group position={[0, -0.5, 0]}>
//           <ContactShadows
//             opacity={0.4}
//             scale={10}
//             blur={2}
//             far={4}
//             resolution={256}
//             color="#000000"
//           />
//           <Beaker3D 
//             chemicals={chemicals}
//             solution={solution}
//             equipmentType={equipmentType}
//           />
//         </group>
        
//         {/* Grid */}
//         <gridHelper 
//           args={[30, 30, '#1a1a1a', '#0f0f0f']}
//           position={[0, -0.5, 0]}
//         />
//       </Canvas>
//     </div>
//   );
// };

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { Chemical } from '../data/chemicals';
// import { Beaker3D } from './Beaker3D';

// interface Scene3DProps {
//   chemicals: (Chemical & { quantity: number })[];
//   solution: {
//     color: string;
//     equation: string;
//     description: string;
//   } | null;
//   equipmentType: string;
// }

// export const Scene3D = ({ chemicals, solution, equipmentType }: Scene3DProps) => {
//   return (
//     <div className="w-full h-[600px] relative">
//       <Canvas shadows dpr={[1, 2]}>
//         {/* Basic Lighting */}
//         <ambientLight intensity={0.5} />
//         <spotLight
//           position={[5, 5, 5]}
//           angle={0.2}
//           penumbra={1}
//           intensity={0.8}
//           castShadow
//         />

//         {/* Camera & Controls */}
//         <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
//         <OrbitControls
//           enablePan={true}
//           minPolarAngle={0}
//           maxPolarAngle={Math.PI / 2}
//           minDistance={2}
//           maxDistance={10}
//         />

//         {/* Lab Equipment */}
//         <Beaker3D
//           chemicals={chemicals}
//           solution={solution}
//           equipmentType={equipmentType}
//         />
//       </Canvas>
//     </div>
//   );
// };

import { Beaker } from './Beaker'; // Import the 2D Beaker component
import { Chemical } from '../data/chemicals';

interface Scene3DProps {
  chemicals: (Chemical & { quantity: number })[];
  solution: {
    color: string;
    equation: string;
    description: string;
  } | null;
  equipmentType: string;
  onDrop: (e: React.DragEvent) => void;
}

export const Scene3D = ({ chemicals, solution, equipmentType, onDrop }: Scene3DProps) => {
  return (
    <div className="w-[400px] h-[350px] relative flex justify-center items-center bg-gradient-to-br from-blue-300 rounded-2xl shadow-lg shadow-blue-200/20">
      {/* Beaker rendered as 2D inside the scene */}
      <Beaker
        chemicals={chemicals}
        onDrop={onDrop}
        solution={solution}
        equipmentType={equipmentType}
      />
    </div>
  );
};
