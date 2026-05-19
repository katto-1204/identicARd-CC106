import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Image } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.55} position={[0, -0.2, 0]} />;
}

interface Character3DViewerProps {
  modelPath: string;
  cardImage?: string;
  gradient: string;
  colorFrom: string;
  colorTo: string;
  name: string;
}

export default function Character3DViewer({ modelPath, cardImage, gradient, colorFrom, colorTo, name }: Character3DViewerProps) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ minHeight: "clamp(260px, 50vw, 520px)" }}
      data-testid="character-3d-viewer"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-20">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Suspense fallback={null}>
            {modelPath ? (
              <Model url={modelPath} />
            ) : null}
            <Environment preset="city" />
            <ContactShadows position={[0, -0.2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={2} 
            maxPolarAngle={Math.PI / 2.5} 
            minPolarAngle={Math.PI / 3.5} 
          />
        </Canvas>
      </div>





    </div>
  );
}
