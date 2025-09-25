import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import page images
import page1 from "@/assets/page-1.jpg";
import page2 from "@/assets/page-2.jpg";
import page3 from "@/assets/page-3.jpg";
import page4 from "@/assets/page-4.jpg";
import page5 from "@/assets/page-5.jpg";
import page6 from "@/assets/page-6.jpg";

interface Book3DProps {
  book: {
    title: string;
    author: string;
  };
  onClose: () => void;
}

const pageImages = [page1, page2, page3, page4, page5, page6];

// Individual page component
function BookPage({ 
  position, 
  rotation, 
  texture, 
  isFlipping = false, 
  flipProgress = 0,
  onClick 
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture;
  isFlipping?: boolean;
  flipProgress?: number;
  onClick?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isFlipping) {
      meshRef.current.rotation.y = rotation[1] + (Math.PI * flipProgress);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[2.4, 3.2]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        transparent={false}
      />
    </mesh>
  );
}

// Book cover component
function BookCover({ position, rotation, title, author }: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  author: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cover base */}
      <mesh castShadow>
        <planeGeometry args={[2.5, 3.3]} />
        <meshStandardMaterial color="#1a1f3a" />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 0.5, 0.01]}
        fontSize={0.2}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
      
      {/* Author */}
      <Text
        position={[0, -0.5, 0.01]}
        fontSize={0.12}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        by {author}
      </Text>
    </group>
  );
}

// Main 3D Book component
function Book3DScene({ 
  currentPage, 
  setCurrentPage, 
  book 
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  book: { title: string; author: string; };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  
  // Load textures
  const loadedTextures = useLoader(THREE.TextureLoader, pageImages);
  
  useEffect(() => {
    setTextures(loadedTextures);
  }, [loadedTextures]);

  // Animation for page flipping
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
    
    if (isFlipping) {
      setFlipProgress(prev => {
        const newProgress = prev + delta * 3;
        if (newProgress >= 1) {
          setIsFlipping(false);
          return 0;
        }
        return newProgress;
      });
    }
  });

  const handlePageClick = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setFlipProgress(0);
    
    setTimeout(() => {
      if (direction === 'next' && currentPage < pageImages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }, 166); // Half of flip animation
  };

  return (
    <group ref={groupRef}>
      {/* Book spine */}
      <mesh position={[-1.25, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 3.3, 0.3]} />
        <meshStandardMaterial color="#0f1419" />
      </mesh>
      
      {/* Front Cover */}
      <BookCover 
        position={[-1.2, 0, 0.15]} 
        rotation={[0, 0, 0]}
        title={book.title}
        author={book.author}
      />
      
      {/* Back Cover */}
      <mesh position={[-1.2, 0, -0.15]} rotation={[0, Math.PI, 0]} castShadow>
        <planeGeometry args={[2.5, 3.3]} />
        <meshStandardMaterial color="#1a1f3a" />
      </mesh>

      {/* Pages */}
      {textures.map((texture, index) => {
        const isCurrentPage = index === currentPage;
        const isVisible = index <= currentPage;
        
        return (
          <BookPage
            key={index}
            position={[
              -1.2 + (index * 0.002), 
              0, 
              0.14 - (index * 0.001)
            ]}
            rotation={[0, isVisible ? 0 : Math.PI, 0]}
            texture={texture}
            isFlipping={isCurrentPage && isFlipping}
            flipProgress={flipProgress}
            onClick={() => {
              if (index === currentPage) {
                handlePageClick('next');
              } else if (index === currentPage - 1) {
                handlePageClick('prev');
              }
            }}
          />
        );
      })}
      
      {/* Invisible click areas for page turning */}
      <mesh 
        position={[0.2, 0, 0]} 
        onClick={() => handlePageClick('next')}
        visible={false}
      >
        <planeGeometry args={[1.5, 3]} />
      </mesh>
      
      <mesh 
        position={[-2, 0, 0]} 
        onClick={() => handlePageClick('prev')}
        visible={false}
      >
        <planeGeometry args={[1.5, 3]} />
      </mesh>
    </group>
  );
}

export const Book3D = ({ book, onClose }: Book3DProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handle arrow keys
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < pageImages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleArrows);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrows);
      document.body.style.overflow = "unset";
    };
  }, [onClose, currentPage]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-10 bg-background/80 backdrop-blur hover:bg-background text-foreground"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* 3D Book Canvas */}
      <div className="w-full h-full relative">
        <Canvas
          shadows
          camera={{ 
            position: [3, 2, 5], 
            fov: 50 
          }}
          style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-2, 2, 2]} intensity={0.5} />

          {/* Book */}
          <Book3DScene 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            book={book}
          />

          {/* Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI * 0.7}
            minPolarAngle={Math.PI * 0.3}
          />

          {/* Ground plane for shadows */}
          <mesh 
            position={[0, -2, 0]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            receiveShadow
          >
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Canvas>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-background/80 backdrop-blur px-6 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm font-medium px-4">
            Page {currentPage + 1} of {pageImages.length}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(pageImages.length - 1, currentPage + 1))}
            disabled={currentPage === pageImages.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="absolute top-8 left-8 bg-background/80 backdrop-blur p-4 max-w-sm">
          <h3 className="font-semibold mb-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
          <p className="text-xs text-muted-foreground">
            • Click on pages to flip them<br/>
            • Use arrow keys to navigate<br/>
            • Drag to rotate the book<br/>
            • Scroll to zoom in/out
          </p>
        </div>
      </div>
    </div>
  );
};