import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import queryString from 'query-string';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber'
import { Center, Text3D, OrbitControls, TransformControls, Points, PointMaterial, Text, useMatcapTexture, useNormalTexture } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import DatGui, { DatColor, DatNumber, DatSelect, DatBoolean } from "react-dat-gui";

import debounce from 'lodash.debounce';
// import "react-dat-gui/dist/index.css"; 、

// import { DragControls } from 'three/examples/jsm/controls/DragControls';
// import * as random from 'maath/random/dist/maath-random.esm'

// import { TextGeometry } from 'three-stdlib'
// extend({ TextGeometry })

import style from './index.less';
import "react-dat-gui/build/react-dat-gui.css";

const textloaderSrc = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

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
  const query = queryString.parse(window.location.search);
  const name = query.name;
  const undoStack = useRef([
    {
      size: 0.5,
      height: 0.1,
      bevelEnabled: false,
      bevelSize: 0.01,
      bevelThickness: 0,
      color: '#FF718F',
      offset: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  ]);
  const redoStack= useRef([]);
  const transRef = useRef(null);

  // const font = useLoader(FontLoader, textloaderSrc);
  const [textOpt, setTextOpt] = useState({
    size: 0.5,
    height: 0.1,
    bevelEnabled: false,
    bevelSize: 0.01,
    bevelThickness: 0,
    color: '#FF718F',
    offset: {
      x: 0,
      y: 0,
      z: 0
    }
  }); 

  const materialColors = ['#FF718F', '#29C1A2', '#FF9060', '#823FFF', 'skyblue'];

  const cube = useRef(null);
  // const [matcap] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)

  const canvasRef = useRef(null);
  // const text = 'name'; 

  const onObjectChange = debounce(() => {
      const newData = {
        ...textOpt,
        offset: {
          ...cube.current.position
        }
      }
      setTextOpt({
        ...newData
      });

      undoStack.current.push({
        ...newData
      });
  }, 500, {
    trailing: true
  });

  const onUndo = () => {
    // 保留最初的快照
    if (undoStack.current.length > 1) {
      const opData = undoStack.current.pop();
      
      // 渲染上一份快照
      const nowData = undoStack.current[undoStack.current.length - 1];

      // 渲染快照
      setTextOpt({
        ...nowData
      })

      // redoStack保存移除的undoStack栈顶快照数据
      redoStack.current.push(opData);
    }
  }

  const onRedo = () => {
    if (redoStack.current.length > 0) {
      const opData = redoStack.current.pop();

      // 渲染快照
      setTextOpt({
        ...opData
      })
  
      undoStack.current.push(opData);
    }
  }

  const onKeyDown = (e) => {
    // 阻止chrome默认打开历史记录页面
    e.preventDefault();

    // 兼容windows、mac
    if (e.ctrlKey || e.metaKey) {
      if (e.code === 'KeyZ') {
          onUndo();
      } else if (e.code === 'KeyY') {
          onRedo();
      }
     }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className={style.ct}>
      <Canvas
        ref={canvasRef}>
        {/* <ambientLight intensity={0.5} /> */}
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}
        {/* <Stars /> */}

        {/* 文本内容 */}
        {/* <mesh position={[-3, 0, 0]} ref={cube}> */}
          {/* <textGeometry args={[text, textOpt]}/> */}
          {/* <Text font="https://fonts.gstatic.com/s/trirong/v3/7r3GqXNgp8wxdOdOn4so3g.woff">text test</Text> */}
          {/* <meshNormalMaterial color="red"/> */}
        {/* </mesh> */}

        <mesh
          position={[textOpt.offset.x, textOpt.offset.y, textOpt.offset.z]}
          ref={cube}>
          <Center>
            <Text3D
              {...textOpt}
              color="#FF9060"
              font={textloaderSrc}>
              {name}
              {/* <meshStandardMaterial color='red' /> */}
              {/* <meshNormalMaterial color='red' /> */}
              <meshMatcapMaterial color={textOpt.color} />
            </Text3D>
          </Center>
        </mesh>


        {/* <Suspense fallback={null}> */}
          {/* <textGeometry args={[text, config]} /> */}
          {/* <boxGeometry args={[1, 1, 1]} /> */}
          {/* <meshNormalMaterial /> */}
        {/* </Suspense> */}

        <OrbitControls
          makeDefault
          // autoRotate
          // onStart={e => {
          //   console.log('start', e)
          // }}
        />

        <TransformControls
          object={cube}
          onObjectChange={onObjectChange}
          ref={transRef} />
      </Canvas>
      <DatGui data={textOpt}
        onUpdate={(data) => {
        undoStack.current.push({
          ...data,
          offset: {
            ...cube.current.position
          }
        });

        setTextOpt(data);
      }}>
        <DatNumber path="size" min={0.2} max={20} step={0.1} />
        <DatNumber path="height" min={0.1} max={10} step={0.1} />
        <DatBoolean path="bevelEnabled" />
        <DatNumber path="bevelSize" min={0.01} max={10} step={0.01} />
        <DatNumber path="bevelThickness" min={0} max={10} step={0.1} />
        <DatSelect path="color" options={materialColors} />
      </DatGui>
    </div>
  );
};

export default IndexPage;

