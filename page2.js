/**
 * ==============================================
 * page2.js - Cake Celebration Page
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
        blowButton: document.getElementById('blowButton'),
        continueButton: document.querySelector('.btn-continue'),
        celebrationMessage: document.getElementById('celebrationMessage'),
        confettiContainer: document.getElementById('confettiContainer'),
        fireworksContainer: document.getElementById('fireworksContainer'),
        floatingHeartsContainer: document.getElementById('floatingHeartsContainer'),
        cake: document.getElementById('cake'),
        candles: document.querySelectorAll('.candle'),
        flames: document.querySelectorAll('.candle-flame'),
        cakeContainer: document.querySelector('.cake-container'),
        cakeContent: document.querySelector('.cake-content')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        isBlowing: false,
        isCelebrating: false,
        isNavigating: false
    };

    // ==============================================
    // MODULE: Candle Blowing Animation
    // ==============================================
    const candleBlower = {
        /**
         * Blow out candles one by one
         */
        blowCandles: function() {
            return new Promise((resolve) => {
                const flames = dom.flames;
                let delay = 0;

                flames.forEach((flame, index) => {
                    setTimeout(() => {
                        // Add animation for flame extinguishing
                        flame.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                        flame.style.transform = 'scale(0) rotate(20deg)';
                        flame.style.opacity = '0';
                        flame.style.boxShadow = 'none';

                        // Add small smoke effect (CSS class)
                        flame.classList.add('extinguished');

                        // Remove glow from flame parent
                        const candle = flame.closest('.candle');
                        if (candle) {
                            candle.style.transition = 'all 0.3s ease';
                            candle.style.opacity = '0.6';
                            candle.style.transform = 'scale(0.95)';
                        }

                        // If last candle, resolve promise
                        if (index === flames.length - 1) {
                            setTimeout(() => {
                                resolve();
                            }, 600);
                        }
                    }, delay);
                    delay += 300;
                });
            });
        },

        /**
         * Reset candle animation state
         */
        resetCandles: function() {
            dom.flames.forEach((flame) => {
                flame.style.transition = 'none';
                flame.style.transform = 'scale(1) rotate(0deg)';
                flame.style.opacity = '1';
                flame.style.boxShadow = '';
                flame.classList.remove('extinguished');
            });

            dom.candles.forEach((candle) => {
                candle.style.transition = 'none';
                candle.style.opacity = '1';
                candle.style.transform = 'scale(1)';
            });
        }
    };

    // ==============================================
    // MODULE: Cake Animation
    // ==============================================
    const cakeAnimator = {
        /**
         * Shake and bounce the cake
         */
        celebrate: function() {
            return new Promise((resolve) => {
                const cake = dom.cake;
                const container = dom.cakeContainer;

                // Add celebration class for CSS animations
                cake.classList.add('celebrating');

                // Shake animation
                cake.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                let shakeCount = 0;
                const maxShakes = 6;
                const shakeInterval = setInterval(() => {
                    if (shakeCount >= maxShakes) {
                        clearInterval(shakeInterval);
                        // Final bounce
                        cake.style.transform = 'translateY(-10px) scale(1.05)';
                        setTimeout(() => {
                            cake.style.transform = 'translateY(0) scale(1)';
                            cake.classList.remove('celebrating');
                            resolve();
                        }, 400);
                        return;
                    }

                    const intensity = (shakeCount % 2 === 0) ? 8 : -8;
                    const scale = 1 + (0.02 * (maxShakes - shakeCount));
                    cake.style.transform = `translateX(${intensity}px) scale(${scale})`;
                    shakeCount++;
                }, 150);

                // Container pulse
                if (container) {
                    container.style.transition = 'box-shadow 0.5s ease';
                    container.style.boxShadow = '0 0 60px rgba(251, 191, 36, 0.4), 0 0 120px rgba(251, 191, 36, 0.2)';
                    
                    setTimeout(() => {
                        container.style.boxShadow = '';
                    }, 3000);
                }
            });
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        /**
         * Generate floating hearts
         */
        generateHearts: function() {
            const container = dom.floatingHeartsContainer;
            if (!container) return;

            container.classList.remove('hidden');
            container.innerHTML = '';
            
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const count = 30;

            for (let i = 0; i < count; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                heart.className = 'celebration-heart';
                
                const size = 20 + Math.random() * 40;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 6;
                const delay = Math.random() * 2;
                const rotation = (Math.random() - 0.5) * 360;
                
                heart.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    bottom: -10%;
                    font-size: ${size}px;
                    color: ${['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'][Math.floor(Math.random() * 6)]};
                    opacity: 0;
                    pointer-events: none;
                    animation: floatHeartUp ${duration}s ease-in ${delay}s forwards;
                    transform: rotate(${rotation}deg);
                    z-index: 10;
                    text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                `;

                container.appendChild(heart);
            }

            // Clean up after animation
            setTimeout(() => {
                container.innerHTML = '';
                container.classList.add('hidden');
            }, 10000);
        },

        /**
         * Generate confetti
         */
        generateConfetti: function() {
            const container = dom.confettiContainer;
            if (!container) return;

            container.classList.remove('hidden');
            container.innerHTML = '';

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#f97316'];
            const count = 80;

            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const size = 6 + Math.random() * 10;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 2;
                const rotation = Math.random() * 720;
                const shape = Math.random() > 0.5 ? '50%' : '2px';
                
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
                    transform: rotate(0deg);
                    z-index: 10;
                    box-shadow: 0 0 6px rgba(255,255,255,0.2);
                `;

                container.appendChild(confetti);
            }

            // Clean up after animation
            setTimeout(() => {
                container.innerHTML = '';
                container.classList.add('hidden');
            }, 8000);
        },

        /**
         * Generate fireworks
         */
        generateFireworks: function() {
            const container = dom.fireworksContainer;
            if (!container) return;

            container.classList.remove('hidden');
            container.innerHTML = '';

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff'];
            const count = 5;

            for (let burst = 0; burst < count; burst++) {
                setTimeout(() => {
                    const x = 10 + Math.random() * 80;
                    const y = 10 + Math.random() * 60;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const particles = 30 + Math.floor(Math.random() * 20);

                    for (let i = 0; i < particles; i++) {
                        const particle = document.createElement('div');
                        particle.className = 'firework-particle';
                        
                        const angle = (Math.PI * 2 * i) / particles;
                        const distance = 80 + Math.random() * 120;
                        const dx = Math.cos(angle) * distance;
                        const dy = Math.sin(angle) * distance;
                        const duration = 1.5 + Math.random() * 1;
                        const size = 4 + Math.random() * 6;
                        
                        particle.style.cssText = `
                            position: absolute;
                            left: ${x}%;
                            top: ${y}%;
                            width: ${size}px;
                            height: ${size}px;
                            background: ${color};
                            border-radius: 50%;
                            opacity: 0;
                            pointer-events: none;
                            animation: fireworkBurst ${duration}s ease-out forwards;
                            --dx: ${dx}px;
                            --dy: ${dy}px;
                            z-index: 10;
                            box-shadow: 0 0 10px ${color}40, 0 0 20px ${color}20;
                        `;

                        container.appendChild(particle);
                    }
                }, burst * 800);
            }

            // Clean up after animation
            setTimeout(() => {
                container.innerHTML = '';
                container.classList.add('hidden');
            }, 8000);
        },

        /**
         * Show celebration message
         */
        showMessage: function() {
            const message = dom.celebrationMessage;
            if (!message) return;

            message.classList.remove('hidden');
            message.style.animation = 'celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        /**
         * Navigate to next page with fade animation
         */
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.cakeContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page3.html';
            }, 1000);
        },

        /**
         * Show continue button with animation
         */
        showContinueButton: function() {
            const button = dom.continueButton;
            if (!button) return;

            button.classList.remove('hidden');
            button.style.animation = 'celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

            // Add click event listener
            button.addEventListener('click', function(e) {
                e.preventDefault();
                navigator.navigateToNext();
            });
        }
    };

    // ==============================================
    // MODULE: Main Event Handler
    // ==============================================
    const mainHandler = {
        /**
         * Handle the "Blow the Candles" button click
         */
        handleBlow: async function() {
            // Prevent multiple clicks
            if (state.isBlowing || state.isCelebrating) return;
            state.isBlowing = true;

            const button = dom.blowButton;
            button.disabled = true;
            button.style.opacity = '0.6';
            button.style.cursor = 'not-allowed';

            try {
                // Step 1: Blow out candles one by one
                await candleBlower.blowCandles();

                // Step 2: Shake and bounce the cake
                await cakeAnimator.celebrate();

                // Step 3: Show celebration message
                celebrationEffects.showMessage();

                // Step 4: Generate effects
                celebrationEffects.generateHearts();
                celebrationEffects.generateConfetti();
                celebrationEffects.generateFireworks();

                // Step 5: Show continue button after delay
                setTimeout(() => {
                    navigator.showContinueButton();
                    state.isCelebrating = true;
                }, 1500);

                // Step 6: Update button text
                button.textContent = '🎉 Candles Blown!';

                state.isBlowing = false;

            } catch (error) {
                console.error('Error during celebration:', error);
                state.isBlowing = false;
                button.disabled = false;
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
            }
        },

        /**
         * Initialize event listeners
         */
        init: function() {
            const button = dom.blowButton;
            if (button) {
                button.addEventListener('click', this.handleBlow.bind(this));
            }

            // Pre-load animation keyframes for dynamic elements
            this.injectDynamicKeyframes();
        },

        /**
         * Inject keyframe animations for dynamically created elements
         */
        injectDynamicKeyframes: function() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatHeartUp {
                    0% {
                        opacity: 0;
                        transform: translateY(0) rotate(0deg) scale(0.5);
                    }
                    20% {
                        opacity: 1;
                        transform: translateY(-20vh) rotate(15deg) scale(1.1);
                    }
                    80% {
                        opacity: 0.8;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-110vh) rotate(-10deg) scale(0.3);
                    }
                }

                @keyframes confettiFall {
                    0% {
                        opacity: 0;
                        transform: translateY(0) rotate(0deg) scale(0.5);
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(110vh) rotate(720deg) scale(1);
                    }
                }

                @keyframes fireworkBurst {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--dx), var(--dy)) scale(0);
                    }
                }

                /* Candle extinguish animation */
                .candle-flame.extinguished {
                    animation: flameExtinguish 0.5s ease-out forwards;
                }

                @keyframes flameExtinguish {
                    0% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.3) rotate(15deg);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(0) rotate(30deg);
                        opacity: 0;
                    }
                }

                /* Cake celebration class */
                .cake.celebrating {
                    animation: cakeCelebrate 0.6s ease-in-out;
                }

                @keyframes cakeCelebrate {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                    }
                    25% {
                        transform: scale(1.05) rotate(-2deg);
                    }
                    75% {
                        transform: scale(1.05) rotate(2deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // INITIALIZATION
    // ==============================================

    // Start the main handler
    mainHandler.init();

    // Console message
    console.log('🎂 Happy 5th Monthsary! Let\'s celebrate! 💙');

    // Clean up function (optional)
    window.addEventListener('beforeunload', function() {
        // Any cleanup if needed
    });
});