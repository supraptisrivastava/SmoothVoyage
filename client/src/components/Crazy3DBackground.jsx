// import React, { useMemo, useRef, useState } from "react";
// import { useGLTF } from "@react-three/drei";
// import { Canvas, useFrame, extend } from "@react-three/fiber";
// import { Float, Points, PointMaterial, shaderMaterial } from "@react-three/drei";
// import * as THREE from "three";

// const NOISE_GLSL = `
// vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
// vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
// vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);} 
// vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
// float snoise(vec3 v){
//   const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//   const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
//   vec3 i  = floor(v + dot(v, C.yyy) );
//   vec3 x0 = v - i + dot(i, C.xxx) ;
//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy; 
//   vec3 x3 = x0 - D.yyy;      
//   i = mod289(i);
//   vec4 p = permute( permute( permute(
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
//   float n_ = 0.142857142857; // 1/7
//   vec3  ns = n_ * D.wyz - D.xzx;
//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );
//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);
//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));
//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a1.xy,h.y);
//   vec3 p2 = vec3(a1.zw,h.z);
//   vec3 p3 = vec3(a0.zw,h.w);
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
//   p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m*m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
//                                 dot(p2,x2), dot(p3,x3) ) );
// }`;

// // Create a custom shader material with drei's helper
// const WaveMaterial = shaderMaterial(
//   { uTime: 0, uMouse: new THREE.Vector2(0, 0), uIntensity: 0.6, uColorA: new THREE.Color("#1e293b"), uColorB: new THREE.Color("#0f172a"), uLight: new THREE.Color("#22c55e") },
//   /* vertex */ `
//   uniform float uTime; 
//   uniform vec2 uMouse; 
//   uniform float uIntensity;
//   varying vec3 vPos;
//   varying float vNoise;
//   ${NOISE_GLSL}
//   void main(){
//     vec3 pos = position;
//     float wave = snoise(vec3(pos.xz * 0.6, uTime * 0.2)) * 0.4;
//     float mouseBump = exp(-length(uv - uMouse) * 6.0) * uIntensity; // bump near cursor
//     pos.z += wave + mouseBump; // displace along z (since plane will be rotated)
//     vPos = pos;
//     vNoise = wave;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
//   `,
//   /* fragment */ `
//   precision highp float;
//   uniform vec3 uColorA; 
//   uniform vec3 uColorB; 
//   uniform vec3 uLight;
//   varying vec3 vPos;
//   varying float vNoise;
//   void main(){
//     // smooth gradient based on height + noise
//     float h = vPos.z * 0.5 + 0.5;
//     vec3 base = mix(uColorA, uColorB, h);
//     // subtle light streaks
//     float fres = pow(1.0 - abs(normalize(vPos).z), 1.5);
//     vec3 col = base + uLight * fres * 0.15 + vec3(vNoise * 0.05);
//     gl_FragColor = vec4(col, 0.9);
//   }
//   `
// );
// extend({ WaveMaterial });

// // THREE.ShaderLib.WaveMaterial = WaveMaterial;

// function DistortedPlane({ mouse, intensity = 0.8 }) {
//   const ref = useRef();
//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     ref.current.uTime = clock.getElapsedTime();
//     ref.current.uMouse.set(mouse.current.x, mouse.current.y);
//     ref.current.uIntensity = THREE.MathUtils.lerp(ref.current.uIntensity, intensity, 0.05);
//   });
//   return (
//     <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]}>
//       <planeGeometry args={[30, 30, 256, 256]} />
//       {/* @ts-ignore */}
//       <waveMaterial ref={ref} transparent />
//     </mesh>
//   );
// }

// function FloatingShapes({ mouse }) {

//   const count = 1800;
//   const positions = useMemo(() => {
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const r = 6 + Math.random() * 8;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
//       arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
//       arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
//       arr[i * 3 + 2] = r * Math.cos(phi);
//     }
//     return arr;
//   }, []);

//   const pointsRef = useRef();
//   useFrame((state) => {
//     if (!pointsRef.current) return;
//     const t = state.clock.getElapsedTime();
//     pointsRef.current.rotation.y = t * 0.02 + mouse.current.x * 0.2;
//     pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05 + mouse.current.y * 0.15;
//   });

//   return (
//     <group>
//       <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
//         <PointMaterial size={0.03} sizeAttenuation depthWrite={false} transparent opacity={0.7} />
//       </Points>

    
//       <Float floatIntensity={1.6} speed={2.2} rotationIntensity={0.5}>
//         <mesh position={[0, 0.5, -2]}>
//           <torusKnotGeometry args={[0.7, 0.24, 128, 16]} />
//           <meshStandardMaterial emissive="#22c55e" color="#1e293b" metalness={0.5} roughness={0.2} emissiveIntensity={0.6} />
//         </mesh>
//       </Float>
//       <Float floatIntensity={1.2} speed={1.8}>
//         <mesh position={[3.5, -0.5, -1]}>
//           <icosahedronGeometry args={[0.8, 1]} />
//           <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.3} emissive="#38bdf8" emissiveIntensity={0.4} />
//         </mesh>
//       </Float>
//       <Float floatIntensity={1.5} speed={1.6}>
//         <mesh position={[-3.2, 0.3, 1]}>
//           <dodecahedronGeometry args={[0.7]} />
//           <meshStandardMaterial color="#f97316" metalness={0.2} roughness={0.4} emissive="#fb923c" emissiveIntensity={0.25} />
//         </mesh>
//       </Float>
//     </group>
//   );
// }

// export default function Crazy3DBackground({ children }) {
//   const mouse = useRef({ x: 0.5, y: 0.5 });
//   const [pressed, setPressed] = useState(false);

//   const handlePointer = (e) => {

//     const x = e.uv?.x ?? (e.clientX / window.innerWidth);
//     const y = e.uv?.y ?? (e.clientY / window.innerHeight);
//     mouse.current.x = x;
//     mouse.current.y = y;
//   };

//   return (
//     <div className="relative h-[calc(100vh-72px)] w-full overflow-hidden rounded-2xl bg-slate-900">
   
//       <Canvas
//         dpr={[1, 1.8]}
//         gl={{ antialias: true, alpha: true }}
//         camera={{ position: [0, 2.8, 6], fov: 60 }}
//         onPointerMove={handlePointer}
//         onPointerDown={() => setPressed(true)}
//         onPointerUp={() => setPressed(false)}
//         onTouchMove={handlePointer}
//         className="absolute inset-0"
//       >
//         <ambientLight intensity={0.35} />
//         <directionalLight position={[3, 6, 4]} intensity={1.0} />
//         <directionalLight position={[-5, 3, -2]} intensity={0.5} />


//         <DistortedPlane mouse={mouse} intensity={pressed ? 1.2 : 0.8} />


//         <FloatingShapes mouse={mouse} />

       
//         <fog attach="fog" args={["#0b1220", 10, 28]} />
//       </Canvas>


//       <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
//         <div className="pointer-events-auto w-full max-w-3xl px-4 text-center">
//           {children}
//         </div>
//       </div>

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
//     </div>
//   );
// }
import React, { useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Noise function for s plane
const NOISE_GLSL = `...`; // keep same as before

// Shader material for background plane
const WaveMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2(0, 0), uIntensity: 0.6, uColorA: new THREE.Color("#1e293b"), uColorB: new THREE.Color("#0f172a"), uLight: new THREE.Color("#22c55e") },
  /* vertex shader */ `...`,
  /* fragment shader */ `...`
);
extend({ WaveMaterial });

function DistortedPlane({ mouse, intensity = 0.8 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.uTime = clock.getElapsedTime();
    ref.current.uMouse.set(mouse.current.x, mouse.current.y);
    ref.current.uIntensity = THREE.MathUtils.lerp(ref.current.uIntensity, intensity, 0.05);
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]}>
      <planeGeometry args={[30, 30, 256, 256]} />
      {/* @ts-ignore */}
      <waveMaterial ref={ref} transparent />
    </mesh>
  );
}

function Airplane({ mouse }) {
  const group = useRef();
const { scene } = useGLTF('/airplane.glb');

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = t * 0.2; // slow rotation
      group.current.rotation.x = Math.sin(t * 0.5) * 0.05;
       const mouseY = mouse.current.y;  
    group.current.position.y = (0.5 - mouseY) * 5;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.7}>
      <primitive object={scene} />
    </group>
  );
}

export default function Crazy3DBackground({ children }) {
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const [pressed, setPressed] = useState(false);

  const handlePointer = (e) => {
    const x = e.uv?.x ?? e.clientX / window.innerWidth;
    const y = e.uv?.y ?? e.clientY / window.innerHeight;
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div className="relative h-[calc(100vh-72px)] w-full overflow-hidden rounded-2xl bg-slate-900">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 2.8, 6], fov: 60 }}
        onPointerMove={handlePointer}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onTouchMove={handlePointer}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 6, 4]} intensity={1.0} />
        <directionalLight position={[-5, 3, -2]} intensity={0.5} />

        <DistortedPlane mouse={mouse} intensity={pressed ? 1.2 : 0.8} />

        {/* Replace shapes with airplane */}
        <Airplane mouse={mouse} />

        <fog attach="fog" args={["#0b1220", 10, 28]} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto w-full max-w-3xl px-4 text-center">
          {children}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
}
