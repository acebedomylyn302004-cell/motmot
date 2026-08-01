/**
 * ==============================================
 * page3.js - Our Love Garden
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
        flowerCards: document.querySelectorAll('.flower-card'),
        discoverButtons: document.querySelectorAll('.btn-discover'),
        flowerMeanings: document.querySelectorAll('.flower-meaning'),
        progressCount: document.getElementById('progressCount'),
        progressBar: document.getElementById('progressBar'),
        surpriseMessage: document.getElementById('surpriseMessage'),
        continueButton: document.getElementById('continueButton'),
        gardenContent: document.querySelector('.garden-content'),
        floatingPetals: document.getElementById('floatingPetals'),
        sparkles: document.getElementById('sparkles')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        discoveredFlowers: new Set(),
        totalFlowers: 4,
        isNavigating: false
    };

    // ==============================================
    // MODULE: Progress Tracker
    // ==============================================
    const progressTracker = {
        /**
         * Update progress indicator
         */
        update: function() {
            const count = state.discoveredFlowers.size;
            const percentage = (count / state.totalFlowers) * 100;

            if (dom.progressCount) {
                dom.progressCount.textContent = count;
            }

            if (dom.progressBar) {
                dom.progressBar.style.width = percentage + '%';
            }

            // Check if all flowers are discovered
            if (count === state.totalFlowers) {
                this.onComplete();
            }
        },

        /**
         * Handle completion of all flowers
         */
        onComplete: function() {
            // Show surprise message
            if (dom.surpriseMessage) {
                dom.surpriseMessage.classList.remove('hidden');
                dom.surpriseMessage.classList.add('visible');
                
                // Trigger animation
                dom.surpriseMessage.style.animation = 'surpriseGlow 3s ease-in-out infinite';
            }

            // Show continue button
            if (dom.continueButton) {
                dom.continueButton.classList.remove('hidden');
                dom.continueButton.classList.add('visible');
                
                // Add click event listener
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            // Generate celebration effects
            celebrationEffects.generateHearts();
            celebrationEffects.generateSparkles();
            celebrationEffects.generatePetals();

            // Update progress bar color
            if (dom.progressBar) {
                dom.progressBar.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
            }
        }
    };

    // ==============================================
    // MODULE: Flower Discovery
    // ==============================================
    const flowerDiscovery = {
        /**
         * Handle discover button click
         */
        handleDiscover: function(button) {
            // Prevent duplicate clicks
            if (button.disabled) return;

            const card = button.closest('.flower-card');
            if (!card) return;

            const flowerId = button.getAttribute('data-flower');
            const meaning = document.getElementById('flowerMeaning' + flowerId);

            // Mark as discovered
            state.discoveredFlowers.add(flowerId);
            button.disabled = true;
            button.classList.add('discovered');
            button.textContent = '✨ Discovered!';

            // Reveal meaning with animation
            if (meaning) {
                meaning.classList.remove('hidden');
                meaning.classList.add('visible');
            }

            // Add glowing effect to card
            card.classList.add('discovered');

            // Generate floating hearts around the card
            celebrationEffects.generateMiniHearts(card);

            // Update progress
            progressTracker.update();

            // Play subtle sound effect (just visual feedback)
            this.pulseCard(card);
        },

        /**
         * Pulse the card for visual feedback
         */
        pulseCard: function(card) {
            card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        },

        /**
         * Initialize all discover buttons
         */
        init: function() {
            dom.discoverButtons.forEach((button) => {
                button.addEventListener('click', function() {
                    flowerDiscovery.handleDiscover(this);
                });
            });
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        /**
         * Generate floating hearts around a specific card
         */
        generateMiniHearts: function(card) {
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const container = card;
            
            for (let i = 0; i < 8; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 16 + Math.random() * 20;
                const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
                const distance = 40 + Math.random() * 60;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                const duration = 1.5 + Math.random() * 2;
                
                heart.style.cssText = `
                    position: absolute;
                    font-size: ${size}px;
                    color: ${['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'][Math.floor(Math.random() * 6)]};
                    pointer-events: none;
                    z-index: 10;
                    animation: miniHeartFloat ${duration}s ease-out forwards;
                    --dx: ${dx}px;
                    --dy: ${dy}px;
                    opacity: 0;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                `;

                container.appendChild(heart);

                // Clean up after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }, duration * 1000 + 500);
            }

            // Inject mini heart animation if not exists
            this.injectMiniHeartAnimation();
        },

        /**
         * Inject mini heart keyframe animation
         */
        injectMiniHeartAnimation: function() {
            if (document.getElementById('miniHeartStyles')) return;

            const style = document.createElement('style');
            style.id = 'miniHeartStyles';
            style.textContent = `
                @keyframes miniHeartFloat {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.3);
                    }
                    20% {
                        opacity: 1;
                        transform: translate(calc(-50% + var(--dx) * 0.3), calc(-50% + var(--dy) * 0.3)) scale(1.1);
                    }
                    80% {
                        opacity: 0.8;
                    }
                    100% {
                        opacity: 0;
                        transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        },

        /**
         * Generate floating hearts (full screen)
         */
        generateHearts: function() {
            const container = dom.floatingPetals || document.querySelector('.floating-petals');
            if (!container) return;

            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            
            for (let i = 0; i < 25; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 20 + Math.random() * 40;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 6;
                const delay = Math.random() * 2;
                
                heart.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    bottom: -10%;
                    font-size: ${size}px;
                    color: ${['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'][Math.floor(Math.random() * 6)]};
                    opacity: 0;
                    pointer-events: none;
                    animation: floatHeartUp ${duration}s ease-in ${delay}s forwards;
                    z-index: 10;
                    text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                `;

                container.appendChild(heart);
            }

            // Inject full screen heart animation if not exists
            this.injectFullHeartAnimation();
        },

        /**
         * Inject full screen heart keyframe animation
         */
        injectFullHeartAnimation: function() {
            if (document.getElementById('fullHeartStyles')) return;

            const style = document.createElement('style');
            style.id = 'fullHeartStyles';
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
            `;
            document.head.appendChild(style);
        },

        /**
         * Generate sparkles
         */
        generateSparkles: function() {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            const colors = ['#ffffff', '#a8a4ff', '#6c63ff', '#fbbf24', '#60a5fa'];
            
            for (let i = 0; i < 30; i++) {
                const sparkle = document.createElement('span');
                
                const size = 4 + Math.random() * 8;
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

            // Inject sparkle animation if not exists
            this.injectSparkleAnimation();
        },

        /**
         * Inject sparkle keyframe animation
         */
        injectSparkleAnimation: function() {
            if (document.getElementById('sparkleStyles')) return;

            const style = document.createElement('style');
            style.id = 'sparkleStyles';
            style.textContent = `
                @keyframes twinkleSparkle {
                    0% {
                        opacity: 0;
                        transform: scale(0) rotate(0deg);
                    }
                    30% {
                        opacity: 0.9;
                        transform: scale(1.2) rotate(45deg);
                    }
                    60% {
                        opacity: 0.4;
                        transform: scale(0.7) rotate(90deg);
                    }
                    80% {
                        opacity: 1;
                        transform: scale(1.4) rotate(135deg);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) rotate(180deg);
                    }
                }
            `;
            document.head.appendChild(style);
        },

        /**
         * Generate floating petals
         */
        generatePetals: function() {
            const container = dom.floatingPetals || document.querySelector('.floating-petals');
            if (!container) return;

            const petalShapes = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌸'];
            
            for (let i = 0; i < 15; i++) {
                const petal = document.createElement('span');
                petal.textContent = petalShapes[Math.floor(Math.random() * petalShapes.length)];
                
                const size = 20 + Math.random() * 30;
                const left = Math.random() * 100;
                const duration = 6 + Math.random() * 8;
                const delay = Math.random() * 4;
                
                petal.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: -10%;
                    font-size: ${size}px;
                    opacity: 0.6;
                    pointer-events: none;
                    animation: petalFloat ${duration}s ease-in-out ${delay}s infinite alternate;
                    z-index: 1;
                    filter: blur(0.5px);
                `;

                container.appendChild(petal);
            }

            // Inject petal animation if not exists
            this.injectPetalAnimation();
        },

        /**
         * Inject petal keyframe animation
         */
        injectPetalAnimation: function() {
            if (document.getElementById('petalStyles')) return;

            const style = document.createElement('style');
            style.id = 'petalStyles';
            style.textContent = `
                @keyframes petalFloat {
                    0% {
                        transform: translateY(0) rotate(0deg) translateX(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 0.6;
                    }
                    80% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(110vh) rotate(360deg) translateX(50px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
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

            const content = dom.gardenContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page4.html';
            }, 1000);
        }
    };

    // ==============================================
    // MODULE: Initialization
    // ==============================================
    const init = {
        /**
         * Initialize all modules
         */
        run: function() {
            // Initialize flower discovery
            flowerDiscovery.init();

            // Set initial progress
            progressTracker.update();

            // Pre-create decorative elements
            celebrationEffects.generatePetals();

            // Console message
            console.log('🌸 Welcome to Our Love Garden! 💙');
        }
    };

    // ==============================================
    // START
    // ==============================================

    // Run initialization
    init.run();

    // Clean up function (optional)
    window.addEventListener('beforeunload', function() {
        // Any cleanup if needed
    });
});