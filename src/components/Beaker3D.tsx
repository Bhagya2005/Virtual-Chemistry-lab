// import { useRef, useMemo } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { MeshTransmissionMaterial, MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
// import * as THREE from 'three';
// import { Chemical } from '../data/chemicals';

// interface Beaker3DProps {
//   chemicals: (Chemical & { quantity: number })[];
//   solution: {
//     color: string;
//     equation: string;
//     description: string;
//   } | null;
//   equipmentType: string;
// }

// export const Beaker3D = ({ chemicals, solution, equipmentType }: Beaker3DProps) => {
//   const liquidRef = useRef<THREE.Mesh>(null);
//   const glassRef = useRef<THREE.Mesh>(null);
//   const bubblesRef = useRef<THREE.Mesh>(null);

//   const geometry = useMemo(() => {
//     switch (equipmentType) {
//       case 'flask':
//         return new THREE.CylinderGeometry(0.7, 1, 2, 32, 1, true);
//       case 'test-tube':
//         return new THREE.CylinderGeometry(0.3, 0.3, 2, 32, 1, true);
//       default:
//         return new THREE.CylinderGeometry(1, 1, 2, 32, 1, true);
//     }
//   }, [equipmentType]);

//   useFrame((state) => {
//     if (liquidRef.current && chemicals.length > 0) {
//       liquidRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 - 0.5;
//       liquidRef.current.rotation.y += 0.002;
//     }
//     if (glassRef.current) {
//       glassRef.current.rotation.y += 0.001;
//     }
//     if (bubblesRef.current) {
//       bubblesRef.current.rotation.y += 0.01;
//       bubblesRef.current.position.y = (Math.sin(state.clock.elapsedTime) * 0.2) - 0.3;
//     }
//   });

//   const liquidColor = solution ? solution.color : chemicals[0]?.color || '#ffffff';

//   return (
//     <group position={[0, 0, 0]}>
//       {/* Glass container */}
//       <mesh ref={glassRef} geometry={geometry} castShadow receiveShadow>
//         <MeshTransmissionMaterial
//           backside
//           samples={16}
//           thickness={0.5}
//           chromaticAberration={0.3}
//           anisotropy={0.5}
//           distortion={0.4}
//           distortionScale={0.6}
//           temporalDistortion={0.2}
//           metalness={0.1}
//           roughness={0}
//           transmission={1}
//           clearcoat={1}
//           clearcoatRoughness={0.1}
//           ior={1.5}
//         />
//       </mesh>

//       {/* Liquid */}
//       {(chemicals.length > 0 || solution) && (
//         <>
//           <mesh
//             ref={liquidRef}
//             geometry={geometry}
//             scale={[0.98, 0.5, 0.98]}
//             position={[0, -0.5, 0]}
//           >
//             <MeshWobbleMaterial
//               color={liquidColor}
//               factor={0.2}
//               speed={1}
//               transparent
//               opacity={0.8}
//               metalness={0.3}
//               roughness={0.2}
//               envMapIntensity={0.5}
//             />
//           </mesh>

//           {/* Bubbles effect */}
//           <mesh
//             ref={bubblesRef}
//             geometry={new THREE.SphereGeometry(0.8, 32, 32)}
//             scale={[0.95, 0.4, 0.95]}
//             position={[0, -0.3, 0]}
//           >
//             <MeshDistortMaterial
//               color={liquidColor}
//               speed={2}
//               distort={0.3}
//               radius={1}
//               transparent
//               opacity={0.1}
//             />
//           </mesh>
//         </>
//       )}
//     </group>
//   );
// };
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Chemical } from '../data/chemicals';

interface Beaker3DProps {
  chemicals: (Chemical & { quantity: number })[];
  solution: {
    color: string;
    equation: string;
    description: string;
  } | null;
  equipmentType: string;
}

export const Beaker3D: React.FC<Beaker3DProps> = ({ chemicals, solution, equipmentType }) => {
  const liquidRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (equipmentType) {
      case 'flask':
        return new THREE.CylinderGeometry(0.7, 1, 2, 32, 1, true);
      case 'test-tube':
        return new THREE.CylinderGeometry(0.3, 0.3, 2, 32, 1, true);
      default:
        return new THREE.CylinderGeometry(1, 1, 2, 32, 1, true);
    }
  }, [equipmentType]);

  useFrame((state) => {
    if (liquidRef.current && chemicals.length > 0) {
      liquidRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 - 0.5;
      liquidRef.current.rotation.y += 0.002;
    }
    if (glassRef.current) {
      glassRef.current.rotation.y += 0.001;
    }
    if (bubblesRef.current) {
      bubblesRef.current.rotation.y += 0.01;
      bubblesRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 0.3;
    }
  });

  const liquidColor = solution ? solution.color : chemicals[0]?.color || 'white';

  return (
    <group position={[0, 0, 0]}>
      {/* Glass container */}
      <mesh ref={glassRef} geometry={geometry} castShadow receiveShadow>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropy={0.5}
          distortion={0.4}
          distortionScale={0.6}
          temporalDistortion={0.2}
          metalness={0.1}
          roughness={0}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Liquid */}
      {(chemicals.length > 0 || solution) && (
        <>
          <mesh
            ref={liquidRef}
            geometry={geometry}
            scale={[0.98, 0.5, 0.98]}
            position={[0, -0.5, 0]}
          >
            <MeshWobbleMaterial
              color={liquidColor}
              factor={0.2}
              speed={1}
              transparent
              opacity={0.8}
              metalness={0.3}
              roughness={0.2}
              envMapIntensity={0.5}
            />
          </mesh>

          {/* Bubbles effect */}
          <mesh
            ref={bubblesRef}
            geometry={new THREE.SphereGeometry(0.8, 32, 32)}
            scale={[0.95, 0.4, 0.95]}
            position={[0, -0.3, 0]}
          >
            <MeshDistortMaterial
              color={liquidColor}
              speed={2}
              distort={0.3}
              radius={1}
              transparent
              opacity={0.1}
            />
          </mesh>
        </>
      )}
    </group>
  );
};
export default Beaker3D;