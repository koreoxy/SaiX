<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import { Environment, Float } from '@threlte/extras';
	import gsap from 'gsap';
	import * as THREE from 'three';
	import { onMount, tick } from 'svelte';
	import { elasticOut } from 'svelte/easing';

	function createXGeometry() {
		const shape = new THREE.Shape();
		const size = 2;

		shape.moveTo(-size, size);
		shape.lineTo(-size / 2, 0);
		shape.lineTo(-size, -size);
		shape.lineTo(0, -size / 2);
		shape.lineTo(size, -size);
		shape.lineTo(size / 2, 0);
		shape.lineTo(size, size);
		shape.lineTo(0, size / 2);
		shape.lineTo(-size, size);

		const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSize: 0.1, bevelSegments: 5 };
		return new THREE.ExtrudeGeometry(shape, extrudeSettings);
	}

	function createGradientMaterial() {
		const canvas = document.createElement('canvas');
		canvas.width = 2;
		canvas.height = 2;
		const ctx = canvas.getContext('2d');

		if (!ctx) return new THREE.MeshStandardMaterial({ color: '#ffffff' });

		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0.1, '#11998e');
		gradient.addColorStop(0.3, '#1bf9ab');
		gradient.addColorStop(0.6, '#11998e');
		gradient.addColorStop(0.9, '#1bf9ab');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const texture = new THREE.CanvasTexture(canvas);
		texture.anisotropy = 16;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;

		return new THREE.MeshStandardMaterial({
			map: texture,
			roughness: 0.2,
			metalness: 0.3
		});
	}

	function createGlowMaterial() {
		return new THREE.ShaderMaterial({
			uniforms: {
				glowColor: { value: new THREE.Color(0x1bf9ab) },
				intensity: { value: 2.0 }
			},
			vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
			fragmentShader: `
                uniform vec3 glowColor;
                uniform float intensity;
                varying vec3 vNormal;
                void main() {
                    float glow = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), intensity);
                    gl_FragColor = vec4(glowColor * glow, 1.0);
                }
            `,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true
		});
	}

	let xMesh: THREE.Mesh | undefined;
	let glowMesh: THREE.Mesh | undefined;

	onMount(async () => {
		await tick(); // Pastikan elemen sudah ada sebelum animasi

		if (xMesh && glowMesh) {
			// Animasi Scale dengan GSAP
			if (xMesh) {
				gsap.fromTo(
					xMesh.scale,
					{ x: 0, y: 0, z: 0 },
					{
						x: 1,
						y: 1,
						z: 1,
						duration: 1.2,
						ease: (t) => elasticOut(t),
						onUpdate: () => {
							if (glowMesh && xMesh) {
								glowMesh.scale.set(xMesh.scale.x * 1.2, xMesh.scale.y * 1.2, xMesh.scale.z * 1.2);
							}
						}
					}
				);
			}

			// Animasi Rotasi
			gsap.to(xMesh?.rotation, {
				y: '+=6.28319', // 360 derajat (2 * Math.PI)
				duration: 5,
				repeat: -1,
				ease: 'linear',
				onUpdate: () => {
					glowMesh?.rotation.copy(xMesh?.rotation ?? new THREE.Euler());
				}
			});
		}
	});

	const xGeometry = createXGeometry();
	const gradientMaterial = createGradientMaterial();
</script>

<Threlte.AmbientLight intensity={0.6} />
<Environment url="/smallroom.hdr" />

<Threlte.PerspectiveCamera makeDefault position={[0, 5, 11]} />

<Threlte.Group position={[0, 6, 0]}>
	<Float speed={2} rotationIntensity={1} floatIntensity={5} rotationSpeed={5}>
		<Threlte.Mesh
			bind:ref={xMesh}
			geometry={xGeometry}
			material={gradientMaterial}
			rotation={[0, -10, -Math.PI / 20]}
		/>
		<!-- Mesh Glow -->
		<Threlte.Mesh
			bind:ref={glowMesh}
			geometry={xGeometry}
			material={createGlowMaterial()}
			scale={[1.2, 1.2, 1.2]}
		/>
	</Float>
</Threlte.Group>
