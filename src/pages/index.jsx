import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import queryString from 'query-string';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, TransformControls, Points, PointMaterial, Text } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import DatGui, { DatColor, DatNumber, DatSelect } from "react-dat-gui";

// import "react-dat-gui/dist/index.css";

// import { DragControls } from 'three/examples/jsm/controls/DragControls';
// import * as random from 'maath/random/dist/maath-random.esm'

import { TextGeometry } from 'three-stdlib'
extend({ TextGeometry })

import style from './index.less';
import "react-dat-gui/build/react-dat-gui.css";

const textloaderSrc = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

/**
 * TODO:
 * 3、undo、redo
 */
// function Stars(props) {
//   const ref = useRef()
//   const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1 }))
//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10
//     ref.current.rotation.y -= delta / 15
//   })
//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
//         <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
//       </Points>
//     </group>
//   )
// }
// const mode = ['translate', 'rotate', 'scale']
// const state = proxy({ current: null, mode: 0});

// const controls = () => {
//   const snap = useSnapshot(state)
// }

const IndexPage = () => {
  const font = useLoader(FontLoader, textloaderSrc);
  const [textOpt, setTextOpt] = useState({
    font,
    size: 0.2,
    height: 1,
  }); 
  const query = queryString.parse(window.location.search);
  const name = query.name;
  const cube = useRef(null);

  const controlsRef = useRef(null)
  // const config = useMemo(() => ({
  //   font,
  //   size: 0.2,
  //   height: 1,
  //   // curveSegments: 12,
  //   // curveSegments: 10,
  //   // bevelEnabled: false,
  //   // position: [0, 0, 0]
  // }), [font])
  const text = 'name'; 

  useEffect(() => {
    console.log('controlsRef', controlsRef)
  }, [controlsRef])
  return (
    <div className={style.ct}>
      <Canvas>
        {/* <ambientLight intensity={0.5} /> */}
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}
        {/* <Stars /> */}
        <mesh position={[-2, 0, 0]} ref={cube}>
          <textGeometry args={[text, textOpt]}/>
          {/* <Text font="https://fonts.gstatic.com/s/trirong/v3/7r3GqXNgp8wxdOdOn4so3g.woff">text test</Text> */}
          <meshNormalMaterial />
        </mesh>
        {/* <Suspense fallback={null}>
          <textGeometry args={[text, config]} />
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </Suspense> */}
        {/* <OrbitControls
          ref={controlsRef}
          makeDefault
          // autoRotate
          // onStart={e => {
          //   console.log('start', e)
          // }}
        /> */}
        <TransformControls object={cube}/>
      </Canvas>
      <DatGui data={textOpt} onUpdate={setTextOpt}>
        <DatNumber path="size" min={0.2} max={20} step={0.1} />
      </DatGui>
    </div>
  );
};

export default IndexPage;

