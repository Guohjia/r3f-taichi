import { useRef, useState, Suspense, useMemo } from 'react';
import queryString from 'query-string';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import { TextGeometry } from 'three-stdlib'
extend({ TextGeometry })

const textloaderSrc = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

const IndexPage = () => {
  const query = queryString.parse(window.location.search);
  const name = query.name;

  const font = useLoader(FontLoader, textloaderSrc)
  const config = useMemo(() => ({
    font,
    size: 2.6,
    height: 1.5,
    curveSegments: 12,
    curveSegments: 10,
    bevelEnabled: false
  }), [font])
  const text = name; 

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh>
        <textGeometry args={[text, config]} />
          <meshNormalMaterial />
        </mesh>
        {/* <Suspense fallback={null}>
          <textGeometry args={[text, config]} />
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </Suspense> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default IndexPage;

