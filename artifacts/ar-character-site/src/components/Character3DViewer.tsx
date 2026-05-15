import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Character3DViewerProps {
  modelPath: string;
  color: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

function Fallback({ color }: { color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color={color} 
          wireframe 
          emissive={color} 
          emissiveIntensity={2} 
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} opacity={0.5} transparent />
      </mesh>
    </Float>
  );
}

function ErrorFallback({ color }: { color: string }) {
  // If useGLTF fails (which it will since there are no real GLB models), we show the cool fallback
  return <Fallback color={color} />;
}

export default function Character3DViewer({ modelPath, color }: Character3DViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-full relative cursor-move">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color={color} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Suspense fallback={<Fallback color={color} />}>
          <ErrorBoundary FallbackComponent={() => <ErrorFallback color={color} />}>
            <Model url={modelPath} />
          </ErrorBoundary>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
