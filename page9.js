/**
 * ==============================================
 * page9.js - Love Compatibility Scanner (Enhanced)
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
        startBtn: document.getElementById('startScanBtn'),
        scanningSection: document.getElementById('scanningSection'),
        scanProgressBar: document.getElementById('scanProgressBar'),
        scanPercentage: document.getElementById('scanPercentage'),
        statusText: document.getElementById('statusText'),
        statText: document.getElementById('statText'),
        scannerBeam: document.getElementById('scannerBeam'),
        scannerAnimation: document.getElementById('scannerAnimation'),
        scannerHeart: document.getElementById('scannerHeart'),
        resultsSection: document.getElementById('resultsSection'),
        continueButton: document.getElementById('continueButton'),
        resultInfinity: document.getElementById('resultInfinity'),
        meterBar: document.getElementById('meterBar'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        floatingStars: document.getElementById('floatingStars'),
        confettiContainer: document.getElementById('confettiContainer'),
        scannerPanel: document.querySelector('.scanner-panel'),
        scannerContent: document.querySelector('.scanner-content'),
        scannerHero: document.getElementById('scannerHero'),
        scannerStatus: document.querySelector('.scanner-status'),
        resultItems: document.querySelectorAll('.result-item'),
        scannerCenter: document.querySelector('.scanner-center'),
        profileCards: document.querySelectorAll('.profile-card')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        isScanning: false,
        isComplete: false,
        isNavigating: false,
        scanInterval: null,
        statusInterval: null,
        heartbeatInterval: null,
        particleInterval: null,
        progress: 0,
        heartbeatSpeed: 1500
    };

    // ==============================================
    // DATA
    // ==============================================
    const statusMessages = [
        '🔍 Searching relationship history...',
        '💕 Looking for cute moments...',
        '🤔 Detecting overthinking patterns...',
        '📊 Measuring clinginess level...',
        '🤗 Counting hugs...',
        '😘 Counting kisses...',
        '🔐 Checking loyalty...',
        '😂 Finding funny memories...',
        '❤️ Detecting true love...',
        '🧮 Calculating forever probability...',
        '📈 Analyzing compatibility index...',
        '✨ Generating love report...',
        '💙 Measuring emotional depth...',
        '🌟 Detecting soulmate connection...',
        '🏆 Finalizing perfect match status...'
    ];

    const statMessages = [
        '💓 Analyzing heart patterns...',
        '💕 Measuring love frequency...',
        '💙 Detecting emotional connection...',
        '❤️ Calculating compatibility index...',
        '✨ Generating love report...',
        '🌟 Scanning soulmate signals...',
        '💫 Measuring happiness levels...',
        '🎯 Calculating forever chance...'
    ];

    // ==============================================
    // MODULE: Scanner
    // ==============================================
    const scanner = {
        start: function() {
            if (state.isScanning) return;
            state.isScanning = true;

            dom.startBtn.disabled = true;
            dom.startBtn.classList.add('scanning');
            dom.startBtn.innerHTML = '🔍 Scanning... <span class="btn-sub">Please wait...</span>';

            dom.scanningSection.classList.remove('hidden');
            dom.scanningSection.classList.add('visible');

            dom.scannerBeam.classList.add('active');
            dom.scannerHeart.classList.add('scanning');

            this.speedUpHeartbeat();

            state.progress = 0;
            dom.scanProgressBar.style.width = '0%';
            dom.scanPercentage.textContent = '0%';

            this.startParticles();
            this.startStatusMessages();
            this.startProgress();

            celebrationEffects.generateHearts(15);
            celebrationEffects.generateSparkles(20);
            celebrationEffects.generateBubbles(10);

            if (dom.scannerStatus) {
                dom.scannerStatus.textContent = '● Scanning...';
                dom.scannerStatus.style.color = '#00d4ff';
            }

            console.log('🤖 Love AI Scanner Initialized...');
        },

        startProgress: function() {
            if (state.scanInterval) clearInterval(state.scanInterval);

            const totalSteps = 100;
            const stepDuration = 50;
            let step = 0;

            state.scanInterval = setInterval(() => {
                step++;
                state.progress = Math.min(step, totalSteps);

                const easedProgress = this.easeInOutCubic(state.progress / totalSteps) * 100;
                dom.scanProgressBar.style.width = easedProgress + '%';
                dom.scanPercentage.textContent = Math.round(easedProgress) + '%';

                this.updateStatusByProgress(state.progress);

                if (state.progress % 10 === 0) {
                    celebrationEffects.generateSparkles(3);
                }

                if (state.progress >= totalSteps) {
                    clearInterval(state.scanInterval);
                    state.scanInterval = null;
                    this.onComplete();
                }
            }, stepDuration);
        },

        easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },

        updateStatusByProgress: function(progress) {
            const index = Math.floor((progress / 100) * statusMessages.length);
            const messageIndex = Math.min(index, statusMessages.length - 1);
            
            if (dom.statusText) {
                dom.statusText.textContent = statusMessages[messageIndex];
            }

            if (dom.statText && Math.random() > 0.7) {
                const randomIndex = Math.floor(Math.random() * statMessages.length);
                dom.statText.textContent = statMessages[randomIndex];
            }
        },

        speedUpHeartbeat: function() {
            if (state.heartbeatInterval) clearInterval(state.heartbeatInterval);
            state.heartbeatSpeed = 500;
            this.startHeartbeat();
        },

        startHeartbeat: function() {
            const heart = dom.scannerHeart;
            if (!heart) return;

            if (state.heartbeatInterval) clearInterval(state.heartbeatInterval);

            state.heartbeatInterval = setInterval(() => {
                heart.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 120);
            }, state.heartbeatSpeed);
        },

        startParticles: function() {
            if (state.particleInterval) clearInterval(state.particleInterval);

            state.particleInterval = setInterval(() => {
                if (state.isScanning && state.progress < 100) {
                    celebrationEffects.generateParticles(3);
                }
            }, 600);
        },

        startStatusMessages: function() {
            if (state.statusInterval) clearInterval(state.statusInterval);

            let index = 0;
            state.statusInterval = setInterval(() => {
                if (state.progress < 100) {
                    const messageIndex = Math.min(index, statusMessages.length - 1);
                    if (dom.statusText) {
                        dom.statusText.textContent = statusMessages[messageIndex];
                    }
                    index++;
                    
                    if (dom.statText && Math.random() > 0.6) {
                        const randomIndex = Math.floor(Math.random() * statMessages.length);
                        dom.statText.textContent = statMessages[randomIndex];
                    }
                }
            }, 600);
        },

        onComplete: function() {
            state.isScanning = false;
            state.isComplete = true;

            if (state.statusInterval) {
                clearInterval(state.statusInterval);
                state.statusInterval = null;
            }
            if (state.particleInterval) {
                clearInterval(state.particleInterval);
                state.particleInterval = null;
            }

            state.heartbeatSpeed = 1500;
            this.startHeartbeat();

            dom.startBtn.textContent = '✅ Scan Complete!';
            dom.startBtn.classList.remove('scanning');

            dom.scannerBeam.classList.remove('active');
            dom.scannerHeart.classList.remove('scanning');

            if (dom.statusText) {
                dom.statusText.textContent = '✔ Love scan complete! ❤️';
            }
            if (dom.statText) {
                dom.statText.textContent = '💙 Results ready!';
            }
            if (dom.scannerStatus) {
                dom.scannerStatus.textContent = '● Love Detected ❤️';
                dom.scannerStatus.style.color = '#fbbf24';
            }

            celebrationEffects.generateHearts(30);
            celebrationEffects.generateSparkles(40);
            celebrationEffects.generateConfetti(100);
            celebrationEffects.generateBubbles(20);

            dom.scannerPanel.style.transition = 'box-shadow 1s ease';
            dom.scannerPanel.style.boxShadow = '0 0 60px rgba(251, 191, 36, 0.2), 0 0 120px rgba(251, 191, 36, 0.1), 0 8px 40px rgba(0, 0, 0, 0.3)';

            setTimeout(() => {
                this.showResults();
            }, 1000);
        },

        showResults: function() {
            dom.scanningSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            dom.scanningSection.style.opacity = '0';
            dom.scanningSection.style.transform = 'scale(0.95)';

            setTimeout(() => {
                dom.scanningSection.classList.add('hidden');
                dom.scanningSection.classList.remove('visible');
                
                dom.resultsSection.classList.remove('hidden');
                dom.resultsSection.classList.add('visible');
                dom.resultsSection.style.animation = 'resultsFadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

                this.animateStatistics();

                // Animate meter bar
                setTimeout(() => {
                    if (dom.meterBar) {
                        dom.meterBar.style.width = '100%';
                    }
                }, 500);

                celebrationEffects.generateHeartExplosion();

                // Animate infinity symbol
                if (dom.resultInfinity) {
                    dom.resultInfinity.style.animation = 'infinityGlow 1.5s ease-in-out infinite';
                }

                if (dom.continueButton) {
                    dom.continueButton.classList.add('visible');
                }
            }, 700);
        },

        animateStatistics: function() {
            const items = dom.resultItems || document.querySelectorAll('.result-item');
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                    item.style.animation = 'celebrationPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                }, 200 + (index * 150));
            });
        },

        reset: function() {
            state.isScanning = false;
            state.isComplete = false;
            state.progress = 0;

            if (state.scanInterval) {
                clearInterval(state.scanInterval);
                state.scanInterval = null;
            }
            if (state.statusInterval) {
                clearInterval(state.statusInterval);
                state.statusInterval = null;
            }
            if (state.heartbeatInterval) {
                clearInterval(state.heartbeatInterval);
                state.heartbeatInterval = null;
            }
            if (state.particleInterval) {
                clearInterval(state.particleInterval);
                state.particleInterval = null;
            }

            dom.startBtn.disabled = false;
            dom.startBtn.classList.remove('scanning');
            dom.startBtn.innerHTML = '🔍 Start Love Scan <span class="btn-sub">Analyze your love compatibility</span>';

            dom.scanningSection.classList.add('hidden');
            dom.scanningSection.classList.remove('visible');
            dom.scanningSection.style.opacity = '1';
            dom.scanningSection.style.transform = 'scale(1)';

            dom.resultsSection.classList.add('hidden');
            dom.resultsSection.classList.remove('visible');

            dom.scanProgressBar.style.width = '0%';
            dom.scanPercentage.textContent = '0%';
            dom.scannerBeam.classList.remove('active');
            dom.scannerHeart.classList.remove('scanning');

            if (dom.statusText) {
                dom.statusText.textContent = 'Initializing Love AI...';
            }
            if (dom.statText) {
                dom.statText.textContent = 'Analyzing heart patterns...';
            }
            if (dom.scannerStatus) {
                dom.scannerStatus.textContent = '● Ready';
                dom.scannerStatus.style.color = '#34d399';
            }

            state.heartbeatSpeed = 1500;
            this.startHeartbeat();

            if (dom.continueButton) {
                dom.continueButton.classList.remove('visible');
            }

            dom.scannerPanel.style.boxShadow = '';

            const items = dom.resultItems || document.querySelectorAll('.result-item');
            items.forEach(item => {
                item.classList.remove('visible');
                item.style.animation = '';
            });

            if (dom.meterBar) {
                dom.meterBar.style.width = '0%';
            }

            const containers = [
                dom.floatingHearts,
                dom.sparkles,
                dom.confettiContainer
            ];
            containers.forEach(container => {
                if (container) {
                    container.innerHTML = '';
                }
            });

            document.querySelectorAll('.confetti-container').forEach(el => {
                if (el.parentNode && !el.id) {
                    el.remove();
                }
            });
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        generateHearts: function(count = 20) {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#00d4ff'];
            
            for (let i = 0; i < count; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 18 + Math.random() * 40;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 6;
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
                if (container) {
                    const hearts = container.querySelectorAll('span');
                    hearts.forEach(el => el.remove());
                }
            }, 10000);
        },

        generateSparkles: function(count = 25) {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            const colors = ['#ffffff', '#a8a4ff', '#6c63ff', '#fbbf24', '#00d4ff', '#34d399'];
            
            for (let i = 0; i < count; i++) {
                const sparkle = document.createElement('span');
                
                const size = 3 + Math.random() * 8;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = 2 + Math.random() * 4;
                const delay = Math.random() * 3;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                sparkle.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 ${size * 3}px ${color}80, 0 0 ${size * 6}px ${color}40;
                    pointer-events: none;
                    animation: twinkleSparkle ${duration}s ease-in-out ${delay}s infinite alternate;
                    opacity: 0;
                    z-index: 1;
                `;

                container.appendChild(sparkle);
            }
        },

        generateBubbles: function(count = 15) {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            for (let i = 0; i < count; i++) {
                const bubble = document.createElement('span');
                bubble.textContent = '○';
                
                const size = 20 + Math.random() * 40;
                const left = Math.random() * 100;
                const duration = 6 + Math.random() * 8;
                const delay = Math.random() * 4;
                
                bubble.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    bottom: -10%;
                    font-size: ${size}px;
                    color: rgba(108, 99, 255, 0.1);
                    opacity: 0;
                    pointer-events: none;
                    animation: bubbleFloat ${duration}s ease-in ${delay}s forwards;
                    z-index: 1;
                `;

                container.appendChild(bubble);
            }

            this.injectBubbleAnimation();
        },

        generateParticles: function(count = 5) {
            const container = dom.scannerPanel || document.querySelector('.scanner-panel');
            if (!container) return;

            const colors = ['#6c63ff', '#00d4ff', '#a8a4ff', '#fbbf24', '#ffffff'];
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('span');
                
                const size = 2 + Math.random() * 4;
                const left = 20 + Math.random() * 60;
                const top = 20 + Math.random() * 60;
                const duration = 2 + Math.random() * 3;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleFloat ${duration}s ease-out forwards;
                    opacity: 0.8;
                    z-index: 1;
                    box-shadow: 0 0 ${size * 2}px ${color}40;
                `;

                container.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, duration * 1000 + 500);
            }

            this.injectParticleAnimation();
        },

        generateConfetti: function(count = 80) {
            const container = dom.confettiContainer || document.createElement('div');
            container.className = 'confetti-container';
            container.style.cssText = `
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 10;
                overflow: hidden;
            `;
            document.body.appendChild(container);

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#00d4ff', '#7c3aed'];

            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const size = 6 + Math.random() * 10;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 2;
                const shape = Math.random() > 0.5 ? '50%' : '2px';
                const rotation = Math.random() * 720;
                
                confetti.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: -10%;
                    width: ${size}px;
                    height: ${size * 0.6}px;
                    background: ${color};
                    border-radius: ${shape};
                    opacity: 0;
                    pointer-events: none;
                    animation: confettiFall ${duration}s ease-in ${delay}s forwards;
                    transform: rotate(${rotation}deg);
                    z-index: 10;
                    box-shadow: 0 0 6px rgba(255,255,255,0.2);
                `;

                container.appendChild(confetti);
            }

            setTimeout(() => {
                if (container.parentNode) {
                    container.remove();
                }
            }, 8000);
        },

        generateHeartExplosion: function() {
            const container = dom.scannerPanel || document.querySelector('.scanner-panel');
            if (!container) return;

            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#00d4ff'];
            
            for (let i = 0; i < 40; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 16 + Math.random() * 30;
                const angle = Math.random() * Math.PI * 2;
                const distance = 80 + Math.random() * 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const duration = 1.5 + Math.random() * 2;
                const delay = Math.random() * 0.5;
                
                heart.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    font-size: ${size}px;
                    color: ${colors[Math.floor(Math.random() * colors.length)]};
                    pointer-events: none;
                    z-index: 10;
                    animation: heartExplosion ${duration}s ease-out ${delay}s forwards;
                    --x: ${x}px;
                    --y: ${y}px;
                    opacity: 0;
                    text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                `;

                container.appendChild(heart);

                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }, (duration + delay) * 1000 + 500);
            }

            this.injectExplosionAnimation();
        },

        injectBubbleAnimation: function() {
            if (document.getElementById('bubbleStyles')) return;
            const style = document.createElement('style');
            style.id = 'bubbleStyles';
            style.textContent = `
                @keyframes bubbleFloat {
                    0% { opacity: 0; transform: translateY(0) scale(0.5); }
                    20% { opacity: 0.3; transform: translateY(-20vh) scale(1); }
                    80% { opacity: 0.2; }
                    100% { opacity: 0; transform: translateY(-110vh) scale(1.5); }
                }
            `;
            document.head.appendChild(style);
        },

        injectParticleAnimation: function() {
            if (document.getElementById('particleStyles')) return;
            const style = document.createElement('style');
            style.id = 'particleStyles';
            style.textContent = `
                @keyframes particleFloat {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                    100% { transform: translate(var(--dx, 30px), var(--dy, -50px)) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        },

        injectExplosionAnimation: function() {
            if (document.getElementById('explosionStyles')) return;
            const style = document.createElement('style');
            style.id = 'explosionStyles';
            style.textContent = `
                @keyframes heartExplosion {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
                    100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const hero = dom.scannerHero;
            if (hero) {
                hero.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                hero.style.opacity = '0';
                hero.style.transform = 'scale(0.98)';
            }

            if (dom.scannerPanel) {
                dom.scannerPanel.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                dom.scannerPanel.style.transform = 'scale(0.95)';
                dom.scannerPanel.style.opacity = '0';
            }

            if (dom.floatingHearts) {
                dom.floatingHearts.style.transition = 'opacity 0.8s ease';
                dom.floatingHearts.style.opacity = '0';
            }

            if (dom.sparkles) {
                dom.sparkles.style.transition = 'opacity 0.8s ease';
                dom.sparkles.style.opacity = '0';
            }

            const scannerAnimation = dom.scannerAnimation;
            if (scannerAnimation) {
                scannerAnimation.style.transition = 'opacity 0.8s ease';
                scannerAnimation.style.opacity = '0';
            }

            setTimeout(() => {
                window.location.href = 'page10.html';
            }, 1000);
        }
    };

    // ==============================================
    // MODULE: Event Listeners
    // ==============================================
    const eventManager = {
        init: function() {
            if (dom.startBtn) {
                dom.startBtn.addEventListener('click', function() {
                    if (!state.isScanning && !state.isComplete) {
                        scanner.start();
                    }
                });
            }

            if (dom.continueButton) {
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            document.addEventListener('keydown', function(e) {
                if ((e.key === ' ' || e.key === 'Enter') && !state.isScanning && !state.isComplete) {
                    e.preventDefault();
                    if (dom.startBtn && !dom.startBtn.disabled) {
                        scanner.start();
                    }
                }
            });
        }
    };

    // ==============================================
    // MODULE: Animation Injection
    // ==============================================
    const animationInjector = {
        inject: function() {
            const style = document.createElement('style');
            style.id = 'page9-dynamic-animations';
            style.textContent = `
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

                @keyframes resultsFadeIn {
                    0% { opacity: 0; transform: scale(0.9) translateY(30px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }

                @keyframes infinityGlow {
                    0%, 100% { text-shadow: 0 0 40px rgba(0, 212, 255, 0.3); }
                    50% { text-shadow: 0 0 60px rgba(0, 212, 255, 0.6), 0 0 100px rgba(0, 212, 255, 0.2); }
                }

                @keyframes celebrationPop {
                    0% { opacity: 0; transform: scale(0.5) rotate(-5deg); }
                    60% { transform: scale(1.05) rotate(2deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
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

        if (dom.continueButton) {
            dom.continueButton.classList.remove('visible');
        }

        scanner.startHeartbeat();

        celebrationEffects.generateHearts(8);
        celebrationEffects.generateSparkles(10);
        celebrationEffects.generateBubbles(5);

        const items = dom.resultItems || document.querySelectorAll('.result-item');
        items.forEach(item => {
            item.classList.remove('visible');
        });

        console.log('❤️ Love Compatibility Scanner v5.0 loaded!');
        console.log('🤖 AI System: Ready to analyze your love!');
        console.log('⌨️ Tip: Press Space or Enter to start the scan!');
        console.log('💙 Happy 5th Monthsary Hubby!');
    }

    init();

    window.addEventListener('beforeunload', function() {
        if (state.scanInterval) clearInterval(state.scanInterval);
        if (state.statusInterval) clearInterval(state.statusInterval);
        if (state.heartbeatInterval) clearInterval(state.heartbeatInterval);
        if (state.particleInterval) clearInterval(state.particleInterval);
        document.querySelectorAll('.confetti-container').forEach(el => {
            if (el.parentNode) el.remove();
        });
    });

    window.resetScanner = scanner.reset.bind(scanner);
});