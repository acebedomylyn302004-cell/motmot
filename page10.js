/**
 * ==============================================
 * page10.js - The Final Chapter (Enhanced)
 * Theme: Happy 5th Monthsary Hubby 💙
 * ==============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==============================================
    // DOM REFERENCES
    // ==============================================
    const dom = {
        heartFrame: document.getElementById('heartFrame'),
        couplePhoto: document.getElementById('couplePhoto'),
        appreciationMessage: document.getElementById('appreciationMessage'),
        celebrationSection: document.getElementById('celebrationSection'),
        finalContent: document.querySelector('.final-content'),
        finalHero: document.getElementById('finalHero'),
        fireworksContainer: document.getElementById('fireworksContainer'),
        confettiContainer: document.getElementById('confettiContainer'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        floatingStars: document.getElementById('floatingStars'),
        floatingRoses: document.getElementById('floatingRoses'),
        balloonsContainer: document.getElementById('balloonsContainer'),
        loveParticles: document.getElementById('loveParticles'),
        replayBtn: document.querySelector('.btn-replay'),
        memoriesBtn: document.querySelector('.btn-memories'),
        homeBtn: document.querySelector('.btn-home')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        isAnimating: false,
        fireworkInterval: null,
        heartInterval: null,
        particleInterval: null,
        shootingStarInterval: null,
        secretKey: '',
        moonClickCount: 0,
        isHeartExploded: false
    };

    // ==============================================
    // MODULE: Cinematic Entrance Animation
    // ==============================================
    const entranceAnimation = {
        play: function() {
            const hero = dom.finalHero;
            if (hero) {
                hero.style.opacity = '0';
                setTimeout(() => {
                    hero.style.transition = 'opacity 1.5s ease';
                    hero.style.opacity = '1';
                }, 300);
            }

            const elements = [
                { el: '.celebration-badge', delay: 400, type: 'fade' },
                { el: '.main-title', delay: 700, type: 'fade' },
                { el: '.subtitle', delay: 1000, type: 'fade' },
                { el: '.heart-frame-container', delay: 1300, type: 'zoom' },
                { el: '.appreciation-message', delay: 1800, type: 'typewriter' },
                { el: '.funny-stats', delay: 2500, type: 'bounce' },
                { el: '.celebration-section', delay: 3000, type: 'bounce' },
                { el: '.funny-message', delay: 3400, type: 'fade' },
                { el: '.action-buttons', delay: 3800, type: 'bounce' },
                { el: '.final-footer-message', delay: 4200, type: 'fade' }
            ];

            elements.forEach((item) => {
                const el = document.querySelector(item.el);
                if (!el) return;

                if (item.type === 'typewriter') {
                    setTimeout(() => this.startTypewriter(el), item.delay);
                } else {
                    el.style.opacity = '0';
                    el.style.transform = this.getTransform(item.type);
                    el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) scale(1)';
                    }, item.delay);
                }
            });

            setTimeout(() => this.startCelebration(), 4800);
        },

        getTransform: function(type) {
            switch(type) {
                case 'zoom': return 'scale(0.8)';
                case 'bounce': return 'translateY(50px) scale(0.9)';
                default: return 'translateY(30px) scale(0.95)';
            }
        },

        startTypewriter: function(container) {
            const messages = container.querySelectorAll('.message-line');
            const fullText = Array.from(messages).map(el => el.textContent).join('\n');
            
            container.innerHTML = '';
            
            const textContainer = document.createElement('div');
            textContainer.style.cssText = `
                font-size: clamp(0.95rem, 1.6vw, 1.1rem);
                font-weight: 300;
                color: var(--text-muted);
                line-height: 1.8;
                font-style: italic;
                text-align: center;
            `;
            container.appendChild(textContainer);

            let index = 0;
            const speed = 20;
            
            const typeInterval = setInterval(() => {
                if (index < fullText.length) {
                    textContainer.textContent += fullText.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => this.onTypewriterComplete(), 500);
                }
            }, speed);
        },

        onTypewriterComplete: function() {
            celebrationEffects.generateFireworks(5);
            celebrationEffects.generateConfetti(200);
            celebrationEffects.generateHearts(50);
            
            const completeMsg = document.createElement('div');
            completeMsg.style.cssText = `
                margin-top: 1rem;
                padding: 1rem 1.5rem;
                background: rgba(251, 191, 36, 0.1);
                border: 1px solid rgba(251, 191, 36, 0.2);
                border-radius: 1rem;
                font-size: clamp(1rem, 1.8vw, 1.3rem);
                color: #fbbf24;
                font-weight: 300;
                text-align: center;
                animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            `;
            completeMsg.textContent = '❤️ "Thank you for being part of my life. This journey may end here, but our story is only getting started. Happy 5th Monthsary, Hubby. I love you always and forever. 💙"';
            
            const appreciation = document.querySelector('.appreciation-message .message-container');
            if (appreciation) {
                appreciation.appendChild(completeMsg);
            }

            console.log('💌 Typewriter complete! Love message delivered.');
        },

        startCelebration: function() {
            celebrationEffects.generateFireworks(3);
            celebrationEffects.generateConfetti(100);
            celebrationEffects.generateHearts(30);
            celebrationEffects.generateSparkles(40);
            celebrationEffects.generateStars(20);
            celebrationEffects.generateRoses(15);
            celebrationEffects.generateBalloons(12);
            celebrationEffects.generateLoveParticles(25);

            celebrationEffects.startContinuousEffects();
            this.animateHeart();

            console.log('🎉 Celebration started! Happy 5th Monthsary! 💙');
        },

        animateHeart: function() {
            const frame = dom.heartFrame;
            if (!frame) return;

            frame.style.animation = 'heartbeatPulse 3s ease-in-out infinite';
            
            const rings = frame.querySelectorAll('.heart-ring');
            rings.forEach((ring, index) => {
                ring.style.animation = `ringExpand 4s ease-out ${index}s infinite`;
            });

            const glow = frame.querySelector('.heart-glow');
            if (glow) {
                glow.style.animation = 'glowPulse 3s ease-in-out infinite';
            }
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        startContinuousEffects: function() {
            if (state.fireworkInterval) clearInterval(state.fireworkInterval);
            state.fireworkInterval = setInterval(() => {
                this.generateFireworks(2 + Math.floor(Math.random() * 3));
            }, 3000 + Math.random() * 3000);

            if (state.heartInterval) clearInterval(state.heartInterval);
            state.heartInterval = setInterval(() => {
                this.generateHearts(3 + Math.floor(Math.random() * 5));
            }, 800);

            if (state.particleInterval) clearInterval(state.particleInterval);
            state.particleInterval = setInterval(() => {
                this.generateLoveParticles(2 + Math.floor(Math.random() * 3));
            }, 1200);

            if (state.shootingStarInterval) clearInterval(state.shootingStarInterval);
            state.shootingStarInterval = setInterval(() => {
                this.generateShootingStar();
            }, 8000 + Math.random() * 10000);
        },

        generateFireworks: function(count = 3) {
            const container = dom.fireworksContainer || document.querySelector('.fireworks-container');
            if (!container) return;

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#00d4ff', '#7c3aed', '#f97316', '#ec4899'];

            for (let burst = 0; burst < count; burst++) {
                setTimeout(() => {
                    const x = 10 + Math.random() * 80;
                    const y = 10 + Math.random() * 60;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const particles = 30 + Math.floor(Math.random() * 40);
                    const isGolden = Math.random() > 0.7;

                    for (let i = 0; i < particles; i++) {
                        const particle = document.createElement('div');
                        const angle = (Math.PI * 2 * i) / particles + (Math.random() - 0.5) * 0.3;
                        const distance = 60 + Math.random() * 140;
                        const dx = Math.cos(angle) * distance;
                        const dy = Math.sin(angle) * distance;
                        const duration = 1.5 + Math.random() * 1.5;
                        const size = 3 + Math.random() * 7;
                        const particleColor = isGolden && Math.random() > 0.3 ? '#fbbf24' : color;
                        
                        particle.style.cssText = `
                            position: absolute;
                            left: ${x}%;
                            top: ${y}%;
                            width: ${size}px;
                            height: ${size}px;
                            background: ${particleColor};
                            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                            opacity: 0;
                            pointer-events: none;
                            animation: fireworkBurst ${duration}s ease-out forwards;
                            --dx: ${dx}px;
                            --dy: ${dy}px;
                            z-index: 10;
                            box-shadow: 0 0 ${size * 3}px ${particleColor}60, 0 0 ${size * 6}px ${particleColor}30;
                        `;
                        container.appendChild(particle);
                    }

                    setTimeout(() => {
                        const particles = container.querySelectorAll('div');
                        particles.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
                    }, 3500);
                }, burst * 500);
            }
        },

        generateGiantFireworks: function() {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => { this.generateFireworks(4 + Math.floor(Math.random() * 3)); }, i * 400);
            }
            setTimeout(() => { this.generateConfetti(300); this.generateHearts(60); }, 1000);
        },

        generateConfetti: function(count = 100) {
            const container = dom.confettiContainer || document.querySelector('.confetti-container');
            if (!container) return;

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#00d4ff', '#f97316', '#7c3aed', '#ec4899'];

            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const size = 6 + Math.random() * 12;
                const duration = 3 + Math.random() * 5;
                const delay = Math.random() * 2;
                const shape = Math.random() > 0.5 ? '50%' : '2px';
                const rotation = Math.random() * 720;
                const width = size;
                const height = size * (0.4 + Math.random() * 0.6);
                
                confetti.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: -10%;
                    width: ${width}px;
                    height: ${height}px;
                    background: ${color};
                    border-radius: ${shape};
                    opacity: 0;
                    pointer-events: none;
                    animation: confettiFall ${duration}s ease-in ${delay}s forwards;
                    transform: rotate(${rotation}deg);
                    z-index: 10;
                    box-shadow: 0 0 6px rgba(255,255,255,0.1);
                `;
                container.appendChild(confetti);
            }

            setTimeout(() => {
                const confettis = container.querySelectorAll('div');
                confettis.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
            }, 10000);
        },

        generateHearts: function(count = 10) {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#00d4ff', '#ec4899'];
            
            for (let i = 0; i < count; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                const size = 18 + Math.random() * 45;
                const left = Math.random() * 100;
                const duration = 5 + Math.random() * 8;
                const delay = Math.random() * 3;
                const rotation = (Math.random() - 0.5) * 360;
                
                heart.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    bottom: -10%;
                    font-size: ${size}px;
                    color: ${colors[Math.floor(Math.random() * colors.length)]};
                    opacity: 0;
                    pointer-events: none;
                    animation: floatHeartUp ${duration}s ease-in ${delay}s forwards;
                    transform: rotate(${rotation}deg);
                    z-index: 10;
                    text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                `;
                container.appendChild(heart);
            }

            setTimeout(() => {
                const hearts = container.querySelectorAll('span');
                hearts.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
            }, 15000);
        },

        generateSparkles: function(count = 25) {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            const colors = ['#ffffff', '#a8a4ff', '#6c63ff', '#fbbf24', '#00d4ff', '#34d399', '#ec4899'];
            
            for (let i = 0; i < count; i++) {
                const sparkle = document.createElement('span');
                const size = 3 + Math.random() * 8;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = 2 + Math.random() * 4;
                const delay = Math.random() * 4;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                sparkle.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 ${size * 4}px ${color}80, 0 0 ${size * 8}px ${color}40;
                    pointer-events: none;
                    animation: twinkleSparkle ${duration}s ease-in-out ${delay}s infinite alternate;
                    opacity: 0;
                    z-index: 1;
                `;
                container.appendChild(sparkle);
            }
        },

        generateStars: function(count = 15) {
            const container = dom.floatingStars || document.querySelector('.floating-stars');
            if (!container) return;

            const starSizes = ['⭐', '✨', '🌟', '💫', '✦', '✧'];
            
            for (let i = 0; i < count; i++) {
                const star = document.createElement('span');
                star.textContent = starSizes[Math.floor(Math.random() * starSizes.length)];
                const size = 14 + Math.random() * 28;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = 3 + Math.random() * 5;
                const delay = Math.random() * 5;
                
                star.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    font-size: ${size}px;
                    opacity: 0;
                    pointer-events: none;
                    animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite alternate;
                    z-index: 1;
                    text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
                `;
                container.appendChild(star);
            }
        },

        generateShootingStar: function() {
            const container = dom.floatingStars || document.querySelector('.floating-stars');
            if (!container) return;

            const star = document.createElement('span');
            star.textContent = '✨';
            const startX = 10 + Math.random() * 60;
            const startY = 5 + Math.random() * 30;
            const duration = 2 + Math.random() * 2;
            
            star.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                font-size: 24px;
                opacity: 0;
                pointer-events: none;
                animation: shootingStar ${duration}s ease-out forwards;
                z-index: 1;
                filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
            `;
            container.appendChild(star);

            setTimeout(() => { if (star.parentNode) star.remove(); }, duration * 1000 + 500);
            this.injectShootingStarAnimation();
        },

        injectShootingStarAnimation: function() {
            if (document.getElementById('shootingStarStyles')) return;
            const style = document.createElement('style');
            style.id = 'shootingStarStyles';
            style.textContent = `
                @keyframes shootingStar {
                    0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
                    20% { opacity: 1; transform: translate(30px, 30px) scale(1.2); }
                    80% { opacity: 1; }
                    100% { opacity: 0; transform: translate(200px, 200px) scale(0); }
                }
            `;
            document.head.appendChild(style);
        },

        generateRoses: function(count = 10) {
            const container = dom.floatingRoses || document.querySelector('.floating-roses');
            if (!container) return;

            const roseShapes = ['🌹', '🌺', '💮', '🌷', '🌸'];
            
            for (let i = 0; i < count; i++) {
                const rose = document.createElement('span');
                rose.textContent = roseShapes[Math.floor(Math.random() * roseShapes.length)];
                const size = 20 + Math.random() * 35;
                const left = Math.random() * 100;
                const duration = 7 + Math.random() * 9;
                const delay = Math.random() * 6;
                const drift = (Math.random() - 0.5) * 140;
                const driftEnd = (Math.random() - 0.5) * 180;
                const rotation = Math.random() * 360;
                
                rose.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: -10%;
                    font-size: ${size}px;
                    opacity: 0;
                    pointer-events: none;
                    animation: rosePetalFall ${duration}s ease-in ${delay}s forwards;
                    --drift: ${drift}px;
                    --drift-end: ${driftEnd}px;
                    transform: rotate(${rotation}deg);
                    z-index: 1;
                    filter: blur(0.5px);
                `;
                container.appendChild(rose);
            }

            setTimeout(() => {
                const roses = container.querySelectorAll('span');
                roses.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
            }, 18000);
        },

        generateBalloons: function(count = 8) {
            const container = dom.balloonsContainer || document.querySelector('.balloons-container');
            if (!container) return;

            const colors = ['#ff6b6b', '#60a5fa', '#fbbf24', '#34d399', '#f472b6', '#a8a4ff', '#00d4ff', '#ec4899'];
            
            for (let i = 0; i < count; i++) {
                const balloon = document.createElement('span');
                balloon.textContent = '🎈';
                const size = 30 + Math.random() * 45;
                const left = 5 + Math.random() * 90;
                const duration = 9 + Math.random() * 9;
                const delay = Math.random() * 7;
                const rotation = (Math.random() - 0.5) * 40;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                balloon.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    bottom: -10%;
                    font-size: ${size}px;
                    opacity: 0;
                    pointer-events: none;
                    animation: balloonFloat ${duration}s ease-in ${delay}s forwards;
                    --rotation: ${rotation}deg;
                    z-index: 1;
                    filter: drop-shadow(0 0 30px ${color}40);
                `;
                container.appendChild(balloon);
            }

            setTimeout(() => {
                const balloons = container.querySelectorAll('span');
                balloons.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
            }, 20000);
        },

        generateLoveParticles: function(count = 15) {
            const container = dom.loveParticles || document.querySelector('.love-particles');
            if (!container) return;

            const particleChars = ['✦', '✧', '❤', '♥', '✦', '✧', '💙', '💕'];
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('span');
                particle.textContent = particleChars[Math.floor(Math.random() * particleChars.length)];
                const size = 12 + Math.random() * 24;
                const left = 10 + Math.random() * 80;
                const top = 10 + Math.random() * 80;
                const duration = 3 + Math.random() * 4;
                const dx = (Math.random() - 0.5) * 120;
                const dy = -30 - Math.random() * 100;
                const color = ['#6c63ff', '#00d4ff', '#a8a4ff', '#fbbf24', '#f472b6', '#ffffff', '#ec4899'][Math.floor(Math.random() * 7)];
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    font-size: ${size}px;
                    color: ${color};
                    opacity: 0;
                    pointer-events: none;
                    animation: particleFloat ${duration}s ease-out forwards;
                    --dx: ${dx}px;
                    --dy: ${dy}px;
                    z-index: 1;
                    text-shadow: 0 0 30px ${color}40;
                `;
                container.appendChild(particle);
            }

            setTimeout(() => {
                const particles = container.querySelectorAll('span');
                particles.forEach(el => { if (!el.classList.contains('persistent')) el.remove(); });
            }, 8000);
        }
    };

    // ==============================================
    // MODULE: Easter Eggs
    // ==============================================
    const easterEggs = {
        init: function() {
            document.querySelector('.final-hero').addEventListener('click', function(e) {
                if (e.target.closest('.final-hero') && !e.target.closest('.final-content')) {
                    state.moonClickCount++;
                    if (state.moonClickCount >= 5) {
                        celebrationEffects.generateGiantFireworks();
                        state.moonClickCount = 0;
                    }
                }
            });

            if (dom.heartFrame) {
                dom.heartFrame.addEventListener('dblclick', function() {
                    if (!state.isHeartExploded) {
                        state.isHeartExploded = true;
                        celebrationEffects.generateGiantFireworks();
                        celebrationEffects.generateHearts(80);
                        celebrationEffects.generateConfetti(200);
                        
                        const secretMsg = document.createElement('div');
                        secretMsg.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: rgba(0, 0, 0, 0.85);
                            backdrop-filter: blur(16px);
                            padding: 2rem 3rem;
                            border-radius: 2rem;
                            border: 2px solid rgba(251, 191, 36, 0.3);
                            z-index: 100;
                            text-align: center;
                            animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                            max-width: 90vw;
                        `;
                        secretMsg.innerHTML = `
                            <div style="font-size: 4rem;">💥</div>
                            <h2 style="color: #fbbf24; margin: 0.5rem 0;">Heart Explosion! 💙</h2>
                            <p style="color: #f0f0ff; font-size: 1.1rem; line-height: 1.8;">
                                "You'll always be my favorite person.<br>
                                Thank you for completing our love journey. ❤️"
                            </p>
                            <div style="margin-top: 0.5rem; font-size: 2rem; display: flex; gap: 0.5rem; justify-content: center;">
                                <span>💙</span><span>❤️</span><span>💕</span><span>💖</span><span>💗</span>
                            </div>
                            <button onclick="this.parentElement.remove()" style="
                                margin-top: 1rem;
                                padding: 0.6rem 2.5rem;
                                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                                border: none;
                                border-radius: 50px;
                                color: #fff;
                                font-size: 1rem;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">❤️ Close</button>
                        `;
                        document.body.appendChild(secretMsg);
                        setTimeout(() => { state.isHeartExploded = false; }, 5000);
                    }
                });
            }

            document.addEventListener('keydown', function(e) {
                state.secretKey += e.key.toUpperCase();
                if (state.secretKey.length > 8) state.secretKey = state.secretKey.slice(-8);
                if (state.secretKey.includes('ILOVEYOU')) {
                    state.secretKey = '';
                    this.showSecretMessage();
                }
            });
        },

        showSecretMessage: function() {
            const secretMsg = document.createElement('div');
            secretMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(16px);
                padding: 2.5rem 3.5rem;
                border-radius: 2rem;
                border: 2px solid rgba(251, 191, 36, 0.3);
                z-index: 100;
                text-align: center;
                animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                max-width: 90vw;
            `;
            secretMsg.innerHTML = `
                <div style="font-size: 3rem;">💌</div>
                <h2 style="color: #fbbf24; margin: 0.5rem 0; font-family: 'Georgia', serif;">You found the secret! 💙</h2>
                <p style="color: #f0f0ff; font-size: 1.2rem; line-height: 1.8; font-style: italic;">
                    "You'll always be my favorite person.<br>
                    Thank you for completing our love journey. ❤️"
                </p>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; font-size: 2rem;">
                    <span>💙</span><span>❤️</span><span>💕</span><span>💖</span><span>💗</span>
                </div>
                <button onclick="this.parentElement.remove()" style="
                    margin-top: 1.2rem;
                    padding: 0.6rem 2.5rem;
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    border: none;
                    border-radius: 50px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">❤️ Close</button>
            `;
            document.body.appendChild(secretMsg);
            celebrationEffects.generateGiantFireworks();
            celebrationEffects.generateHearts(50);
            celebrationEffects.generateConfetti(150);
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        navigateTo: function(url) {
            const content = dom.finalContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            const hero = dom.finalHero;
            if (hero) {
                hero.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                hero.style.opacity = '0';
            }

            setTimeout(() => { window.location.href = url; }, 900);
        }
    };

    // ==============================================
    // MODULE: Event Listeners
    // ==============================================
    const eventManager = {
        init: function() {
            if (dom.replayBtn) {
                dom.replayBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateTo('index.html');
                });
            }

            if (dom.memoriesBtn) {
                dom.memoriesBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateTo('page6.html');
                });
            }

            if (dom.homeBtn) {
                dom.homeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateTo('index.html');
                });
            }

            if (dom.heartFrame) {
                dom.heartFrame.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    this.style.transform = `scale(1.02) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
                });
                
                dom.heartFrame.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
                });
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === '1') navigator.navigateTo('index.html');
                else if (e.key === '2') navigator.navigateTo('page6.html');
                else if (e.key === '3') navigator.navigateTo('index.html');
            });

            document.addEventListener('mousemove', function(e) {
                const hearts = document.querySelectorAll('.floating-hearts span');
                hearts.forEach((heart, index) => {
                    if (index < 20) {
                        const speed = 0.02 + (index % 5) * 0.005;
                        const x = (e.clientX / window.innerWidth - 0.5) * 20 * speed;
                        const y = (e.clientY / window.innerHeight - 0.5) * 20 * speed;
                        heart.style.transform += ` translate(${x}px, ${y}px)`;
                    }
                });
            }, { passive: true });
        }
    };

    // ==============================================
    // MODULE: Animation Injection
    // ==============================================
    const animationInjector = {
        inject: function() {
            const style = document.createElement('style');
            style.id = 'page10-dynamic-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px) scale(0.97); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes heartbeatPulse {
                    0%, 100% { transform: scale(1); }
                    14% { transform: scale(1.04); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.03); }
                    56% { transform: scale(1); }
                }
                @keyframes glowPulse {
                    0%, 100% { transform: scale(0.9); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                @keyframes ringExpand {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
                @keyframes floatHeartUp {
                    0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.5); }
                    20% { opacity: 1; transform: translateY(-20vh) rotate(15deg) scale(1.1); }
                    80% { opacity: 0.8; }
                    100% { opacity: 0; transform: translateY(-110vh) rotate(-10deg) scale(0.3); }
                }
                @keyframes twinkleSparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    30% { opacity: 0.9; transform: scale(1.2) rotate(45deg); }
                    60% { opacity: 0.4; transform: scale(0.7) rotate(90deg); }
                    80% { opacity: 1; transform: scale(1.4) rotate(135deg); }
                    100% { opacity: 0; transform: scale(0) rotate(180deg); }
                }
                @keyframes confettiFall {
                    0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.5); }
                    10% { opacity: 1; }
                    90% { opacity: 0.8; }
                    100% { opacity: 0; transform: translateY(110vh) rotate(720deg) scale(1); }
                }
                @keyframes rosePetalFall {
                    0% { opacity: 0; transform: translateY(-10vh) rotate(0deg) translateX(0) scale(0.8); }
                    10% { opacity: 0.8; }
                    50% { transform: translateY(50vh) rotate(180deg) translateX(var(--drift, 50px)) scale(1); }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(110vh) rotate(360deg) translateX(var(--drift-end, -30px)) scale(0.6); opacity: 0; }
                }
                @keyframes balloonFloat {
                    0% { opacity: 0; transform: translateY(0) scale(0.5) rotate(0deg); }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.6; }
                    100% { opacity: 0; transform: translateY(-110vh) scale(1) rotate(var(--rotation, 20deg)); }
                }
                @keyframes fireworkBurst {
                    0% { opacity: 1; transform: translate(0, 0) scale(1); }
                    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
                }
                @keyframes particleFloat {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--dx, 50px), var(--dy, -80px)) scale(0); opacity: 0; }
                }
                @keyframes starTwinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
                }
                @keyframes celebrationPop {
                    0% { opacity: 0; transform: scale(0.5) rotate(-5deg); }
                    60% { transform: scale(1.05) rotate(2deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
                }
                @keyframes badgePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function init() {
        animationInjector.inject();
        eventManager.init();
        easterEggs.init();

        setTimeout(() => { entranceAnimation.play(); }, 400);

        console.log('🎉 Happy 5th Monthsary Hubby! 💙');
        console.log('❤️ You completed our little love journey!');
        console.log('📸 Thank you for every moment we shared.');
        console.log('⌨️ Press 1: Replay | 2: Memories | 3: Home');
        console.log('💙 Forever starts with us. Always.');
        console.log('🌟 Easter Eggs: Click moon 5x, Double-click heart, Type "ILOVEYOU"');

        setTimeout(() => {
            celebrationEffects.generateSparkles(20);
            celebrationEffects.generateStars(10);
        }, 500);
    }

    init();

    window.addEventListener('beforeunload', function() {
        if (state.fireworkInterval) clearInterval(state.fireworkInterval);
        if (state.heartInterval) clearInterval(state.heartInterval);
        if (state.particleInterval) clearInterval(state.particleInterval);
        if (state.shootingStarInterval) clearInterval(state.shootingStarInterval);
        document.querySelectorAll('.confetti-container, .fireworks-container').forEach(el => {
            if (el.parentNode) el.innerHTML = '';
        });
    });
});