<script lang="ts">
	import { onMount } from 'svelte';
	import { T as Threlte } from '@threlte/core';
	import { Environment, Float } from '@threlte/extras';
	import * as THREE from 'three';
	import gsap from 'gsap';

	let groupRef: THREE.Group | null = null; // Objek untuk animasi

	// 📌 Geometri "X" (Dua Balok Saling Menyilang)
	const boxGeometry = new THREE.BoxGeometry(1, 4, 1);

	// 📌 Fungsi untuk membuat gradient texture
	function createGradientTexture() {
		const canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;
		const ctx = canvas.getContext('2d');

		// Buat gradient warna (3 warna)
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, '#ff5733'); // Warna atas (merah)
		gradient.addColorStop(0.5, '#f1c40f'); // Warna tengah (kuning)
		gradient.addColorStop(1, '#2980b9'); // Warna bawah (biru)

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const texture = new THREE.CanvasTexture(canvas);
		return texture;
	}

	// 📌 Material dengan gradient
	const gradientMaterial = new THREE.MeshStandardMaterial({
		map: createGradientTexture(),
		roughness: 0.4,
		metalness: 0.2
	});

	// 📌 Animasi Rotasi Objek "X" (360°)
	onMount(() => {
		if (groupRef) {
			gsap.to(groupRef.rotation, {
				y: `+=${Math.PI * 2}`, // Rotasi 360°
				duration: 2, // Lebih cepat (2 detik per putaran)
				ease: 'linear',
				repeat: -1 // Loop tanpa henti
			});
		}
	});
</script>

<!-- 🌎 Lingkungan dan pencahayaan -->
<Threlte.AmbientLight intensity={0.6} />
<Environment url="/smallroom.hdr" />

<!-- 📷 Kamera -->
<Threlte.PerspectiveCamera makeDefault position={[0, 5, 10]} />

<!-- ✖️ 3D Object "X" dengan Rotasi 360° -->
<Threlte.Group bind:this={groupRef} position={[0, 6, 0]}>
	<Float speed={5} rotationSpeed={4} floatIntensity={2}>
		<!-- Balok pertama (Diagonal Kanan) -->
		<Threlte.Mesh
			geometry={boxGeometry}
			material={gradientMaterial}
			rotation={[0, 7, Math.PI / 4]}
		/>

		<!-- Balok kedua (Diagonal Kiri) -->
		<Threlte.Mesh
			geometry={boxGeometry}
			material={gradientMaterial}
			rotation={[0, 7, -Math.PI / 4]}
		/>
	</Float>
</Threlte.Group>
