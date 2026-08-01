/**
 * ==============================================
 * page8.js - Our Future Together
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
        dreamCards: document.querySelectorAll('.dream-card'),
        revealButtons: document.querySelectorAll('.btn-reveal'),
        dreamMessages: document.querySelectorAll('.dream-message'),
        progressCount: document.getElementById('progressCount'),
        progressBar: document.getElementById('progressBar'),
        dreamComplete: document.getElementById('dreamComplete'),
        continueButton: document.getElementById('continueButton'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        confettiContainer: document.getElementById('confettiContainer'),
        dreamsContent: document.querySelector('.dreams-content'),
        dreamsHero: document.getElementById('dreamsHero')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        revealedCards: new Set(),
        totalCards: 6,
        isComplete: false,
        isNavigating: false,
        isRevealing: false
    };

    // ==============================================
    // MODULE: Progress Tracker
    // ==============================================
    const progressTracker = {
        /**
         * Update progress indicator
         */
        update: function() {
            const count = state.revealedCards.size;
            const percentage = (count / state.totalCards) * 100;

            // Update counter with pop animation
            if (dom.progressCount) {
                dom.progressCount.textContent = count;
                dom.progressCount.classList.remove('pop');
                // Trigger reflow for animation
                void dom.progressCount.offsetWidth;
                dom.progressCount.classList.add('pop');
            }

            // Update progress bar
            if (dom.progressBar) {
                dom.progressBar.style.width = percentage + '%';
                
                // Change color when complete
                if (count === state.totalCards) {
                    dom.progressBar.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)';
                }
            }

            // Check if all dreams are revealed
            if (count === state.totalCards && !state.isComplete) {
                this.onComplete();
            }
        },

        /**
         * Handle completion of all dreams
         */
        onComplete: function() {
            state.isComplete = true;

            // Show dream complete section
            if (dom.dreamComplete) {
                dom.dreamComplete.classList.remove('hidden');
                dom.dreamComplete.classList.add('visible');
            }

            // Show continue button
            if (dom.continueButton) {
                dom.continueButton.classList.remove('hidden');
                dom.continueButton.classList.add('visible');
            }

            // Generate celebration effects
            celebrationEffects.generateHearts(30);
            celebrationEffects.generateSparkles(40);
            celebrationEffects.generateConfetti(120);
            celebrationEffects.generateStars(20);

            // Add glow to all cards
            dom.dreamCards.forEach(card => {
                card.classList.add('completed');
            });

            // Update progress bar text
            if (dom.progressCount) {
                dom.progressCount.style.color = '#fbbf24';
            }

            // Console celebration
            console.log('🌟 All 6 dreams revealed! Dream Complete! 💙');
        }
    };

    // ==============================================
    // MODULE: Dream Revealer
    // ==============================================
    const dreamRevealer = {
        /**
         * Handle reveal button click
         */
        handleReveal: function(button) {
            // Prevent duplicate clicks
            if (button.disabled || state.isRevealing) return;
            
            const card = button.closest('.dream-card');
            if (!card) return;

            const dreamId = card.getAttribute('data-dream');
            
            // Check if already revealed
            if (state.revealedCards.has(dreamId)) return;

            state.isRevealing = true;

            // Disable button
            button.disabled = true;
            button.classList.add('revealed');
            button.textContent = '✨ Revealed!';

            // Reveal message with animation
            this.revealMessage(card, dreamId);

            // Track revealed card
            state.revealedCards.add(dreamId);

            // Add revealed class to card
            card.classList.add('revealed');

            // Generate celebration effects
            celebrationEffects.generateMiniHearts(card);
            celebrationEffects.generateSparkles(15);
            celebrationEffects.generateStars(10);

            // Update progress
            progressTracker.update();

            state.isRevealing = false;
        },

        /**
         * Reveal message with slide animation
         */
        revealMessage: function(card, dreamId) {
            const message = card.querySelector('.dream-message');
            if (!message) return;

            // Remove hidden class and add visible
            message.classList.remove('hidden');
            
            // Small delay for smooth animation
            setTimeout(() => {
                message.classList.add('visible');
            }, 50);

            // Add glow effect
            card.style.transition = 'box-shadow 0.6s ease, border-color 0.6s ease';
            card.style.boxShadow = '0 0 40px rgba(108, 99, 255, 0.15), 0 0 80px rgba(108, 99, 255, 0.05)';
        },

        /**
         * Initialize all reveal buttons
         */
        init: function() {
            dom.revealButtons.forEach((button) => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dreamRevealer.handleReveal(this);
                });
            });

            // Also allow clicking on card to reveal
            dom.dreamCards.forEach((card) => {
                card.addEventListener('click', function(e) {
                    // Don't trigger if clicking button or message
                    if (e.target.closest('.btn-reveal') || e.target.closest('.dream-message')) return;
                    
                    const button = this.querySelector('.btn-reveal');
                    if (button && !button.disabled) {
                        dreamRevealer.handleReveal(button);
                    }
                });
            });
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        /**
         * Generate mini floating hearts around a card
         */
        generateMiniHearts: function(card) {
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            
            for (let i = 0; i < 10; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 14 + Math.random() * 20;
                const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
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

                card.appendChild(heart);

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
        generateHearts: function(count = 25) {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'];
            
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

            // Inject full heart animation if not exists
            this.injectFullHeartAnimation();
        },

        /**
         * Inject full heart keyframe animation
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
        generateSparkles: function(count = 25) {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            const colors = ['#ffffff', '#a8a4ff', '#6c63ff', '#fbbf24', '#60a5fa', '#34d399'];
            
            for (let i = 0; i < count; i++) {
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
         * Generate stars
         */
        generateStars: function(count = 15) {
            const container = document.querySelector('.floating-stars');
            if (!container) return;

            const starSizes = ['⭐', '✨', '🌟', '💫'];
            
            for (let i = 0; i < count; i++) {
                const star = document.createElement('span');
                star.textContent = starSizes[Math.floor(Math.random() * starSizes.length)];
                
                const size = 16 + Math.random() * 24;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 3;
                
                star.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: ${top}%;
                    font-size: ${size}px;
                    opacity: 0;
                    pointer-events: none;
                    animation: starFloat ${duration}s ease-in-out ${delay}s infinite alternate;
                    z-index: 1;
                    text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
                `;

                container.appendChild(star);
            }
        },

        /**
         * Generate confetti
         */
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

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#f97316'];

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

            // Inject confetti animation if not exists
            this.injectConfettiAnimation();
        },

        /**
         * Inject confetti keyframe animation
         */
        injectConfettiAnimation: function() {
            if (document.getElementById('confettiStyles')) return;

            const style = document.createElement('style');
            style.id = 'confettiStyles';
            style.textContent = `
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

                @keyframes starFloat {
                    0%, 100% {
                        transform: translateY(0) scale(0.8) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-30px) scale(1.2) rotate(180deg);
                        opacity: 1;
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
         * Navigate to page9.html with fade transition
         */
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.dreamsContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page9.html';
            }, 1000);
        }
    };

    // ==============================================
    // MODULE: Event Listeners
    // ==============================================
    const eventManager = {
        /**
         * Initialize all event listeners
         */
        init: function() {
            // Initialize reveal buttons
            dreamRevealer.init();

            // Continue button
            if (dom.continueButton) {
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            // Keyboard shortcut: Press 1-6 to reveal dreams
            document.addEventListener('keydown', function(e) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= 6) {
                    const card = document.querySelector(`.dream-card[data-dream="${num}"]`);
                    if (card) {
                        const button = card.querySelector('.btn-reveal');
                        if (button && !button.disabled) {
                            dreamRevealer.handleReveal(button);
                        }
                    }
                }
            });
        }
    };

    // ==============================================
    // MODULE: Initialization
    // ==============================================

    /**
     * Initialize the dreams page
     */
    function init() {
        // Set up event listeners
        eventManager.init();

        // Initial progress update
        progressTracker.update();

        // Start subtle effects
        celebrationEffects.generateSparkles(10);
        celebrationEffects.generateStars(8);

        // Console message
        console.log('🌙 Our Future Together loaded!');
        console.log(`💙 ${state.totalCards} dreams waiting to be revealed.`);
        console.log('🌟 Reveal all dreams to unlock a special surprise!');
        console.log('⌨️ Tip: Press keys 1-6 to reveal dreams quickly!');

        // Check if all dreams are already revealed (from previous session)
        // This is a backup in case of page refresh
        setTimeout(() => {
            if (state.revealedCards.size === state.totalCards) {
                progressTracker.onComplete();
            }
        }, 1000);
    }

    // Start the page
    init();

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        document.querySelectorAll('.confetti-container').forEach(el => {
            if (el.parentNode) {
                el.remove();
            }
        });
    });

    // Expose reset for testing (optional)
    // window.resetDreams = function() {
    //     state.revealedCards.clear();
    //     state.isComplete = false;
    //     dom.dreamMessages.forEach(msg => {
    //         msg.classList.remove('visible');
    //         msg.classList.add('hidden');
    //     });
    //     dom.revealButtons.forEach(btn => {
    //         btn.disabled = false;
    //         btn.classList.remove('revealed');
    //         btn.textContent = 'Reveal Dream 💙';
    //     });
    //     dom.dreamCards.forEach(card => {
    //         card.classList.remove('revealed', 'completed');
    //     });
    //     dom.dreamComplete.classList.add('hidden');
    //     dom.dreamComplete.classList.remove('visible');
    //     dom.continueButton.classList.add('hidden');
    //     dom.continueButton.classList.remove('visible');
    //     dom.progressBar.style.width = '0%';
    //     dom.progressCount.textContent = '0';
    //     dom.progressCount.style.color = '';
    //     progressTracker.update();
    // };
});