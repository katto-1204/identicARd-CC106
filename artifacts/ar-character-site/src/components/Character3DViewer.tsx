import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import ClickSpark from "./ClickSpark";

function Model({ url, isMobile }: { url: string; isMobile: boolean }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={isMobile ? 1.85 : 1.55} position={[0, isMobile ? -0.4 : -0.2, 0]} />;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ minHeight: isMobile ? "480px" : "clamp(260px, 50vw, 520px)" }}
      data-testid="character-3d-viewer"
    >
      <ClickSpark
        sparkColor={colorFrom || "#fff"}
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-20">
          <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Suspense fallback={null}>
              {modelPath ? (
                <Model url={modelPath} isMobile={isMobile} />
              ) : null}
              <Environment preset="city" />
              <ContactShadows position={[0, isMobile ? -0.4 : -0.2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
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
      </ClickSpark>
    </div>
  );
}
