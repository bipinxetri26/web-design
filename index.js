        // 3D Animation Background - Sophisticated & Subtle
        (function init3DBackground() {
            if (typeof THREE === 'undefined') {
                setTimeout(init3DBackground, 100);
                return;
            }
            
            const canvas = document.getElementById('bg-canvas');
            if (!canvas) return;
            
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0b0b1a);
            
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 25;
            camera.position.y = 2;
            
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Main color - Indigo (#6366f1)
            const primaryColor = 0x6366f1;
            
            // Lights
            const mainLight = new THREE.PointLight(primaryColor, 1.2);
            mainLight.position.set(3, 2, 8);
            scene.add(mainLight);
            
            const ambientLight = new THREE.AmbientLight(0x1a1a2e);
            scene.add(ambientLight);
            
            // Central floating shape - Icosahedron
            const geo1 = new THREE.IcosahedronGeometry(1.2, 0);
            const mat1 = new THREE.MeshPhongMaterial({
                color: primaryColor,
                emissive: 0x2a2a5a,
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            });
            const centerMesh = new THREE.Mesh(geo1, mat1);
            centerMesh.position.set(0, 1, -12);
            scene.add(centerMesh);
            
            // Floating rings
            const ringGeo = new THREE.TorusGeometry(2, 0.08, 16, 100);
            const ringMat = new THREE.MeshPhongMaterial({
                color: primaryColor,
                emissive: 0x2a2a5a,
                emissiveIntensity: 0.1,
                transparent: true,
                opacity: 0.15,
                wireframe: true,
                side: THREE.DoubleSide
            });
            
            const ring1 = new THREE.Mesh(ringGeo, ringMat);
            ring1.position.set(-3, -1, -18);
            ring1.rotation.x = Math.PI / 3;
            ring1.rotation.z = 0.5;
            ring1.scale.set(1.3, 1.3, 1.3);
            scene.add(ring1);
            
            const ring2 = new THREE.Mesh(ringGeo, ringMat);
            ring2.position.set(4, 2, -25);
            ring2.rotation.x = Math.PI / 4;
            ring2.rotation.y = 0.8;
            ring2.scale.set(1.6, 1.6, 1.6);
            scene.add(ring2);
            
            // Small floating spheres
            for (let i = 0; i < 20; i++) {
                const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
                const sphereMat = new THREE.MeshPhongMaterial({
                    color: primaryColor,
                    emissive: 0x2a2a5a,
                    emissiveIntensity: 0.2,
                    transparent: true,
                    opacity: 0.4
                });
                const sphere = new THREE.Mesh(sphereGeo, sphereMat);
                
                sphere.position.x = (Math.random() - 0.5) * 40;
                sphere.position.y = (Math.random() - 0.5) * 30;
                sphere.position.z = (Math.random() - 0.5) * 50 - 15;
                
                scene.add(sphere);
            }
            
            // Particles - Single color
            const particleCount = 800;
            const particleGeo = new THREE.BufferGeometry();
            const particlePositions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                particlePositions[i] = (Math.random() - 0.5) * 80;
                particlePositions[i+1] = (Math.random() - 0.5) * 80;
                particlePositions[i+2] = (Math.random() - 0.5) * 80 - 20;
            }
            
            particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            
            const particleMat = new THREE.PointsMaterial({
                color: primaryColor,
                size: 0.12,
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });
            
            const particles = new THREE.Points(particleGeo, particleMat);
            scene.add(particles);
            
            // Fog
            scene.fog = new THREE.FogExp2(0x0b0b1a, 0.012);
            
            function animate() {
                requestAnimationFrame(animate);
                
                // Gentle rotations
                centerMesh.rotation.x += 0.001;
                centerMesh.rotation.y += 0.002;
                
                ring1.rotation.x += 0.0005;
                ring1.rotation.y += 0.0008;
                ring2.rotation.x += 0.0003;
                ring2.rotation.y += 0.0006;
                
                particles.rotation.y += 0.0001;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        })();

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Header scroll
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Lightbox
        const modal = document.getElementById('lightboxModal');
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        const closeModal = document.getElementById('closeModal');

        document.querySelectorAll('.portfolio-img').forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                const type = this.getAttribute('data-type');
                
                modalImage.style.display = 'none';
                modalVideo.style.display = 'none';
                
                if (type === 'image') {
                    modalImage.src = src;
                    modalImage.style.display = 'block';
                }
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Contact Form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you within 24 hours.');
            this.reset();
        });

        // Download CV
        document.getElementById('downloadCV').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Please contact me directly for my CV.');
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });