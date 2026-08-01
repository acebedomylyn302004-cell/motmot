/**
 * ==============================================
 * page5.js - Mystery Gift Box (Enhanced)
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
        giftBox: document.getElementById('giftBox'),
        giftContainer: document.getElementById('giftContainer'),
        giftInstruction: document.getElementById('giftInstruction'),
        giftHint: document.getElementById('giftHint'),
        catchCount: document.getElementById('catchCount'),
        celebrationMessage: document.getElementById('celebrationMessage'),
        rewardsSection: document.getElementById('rewardsSection'),
        rewardCards: document.querySelectorAll('.reward-card'),
        rewardUnlocks: document.querySelectorAll('.reward-unlock'),
        rewardFacts: document.querySelectorAll('.reward-fun-fact'),
        bonusMessage: document.getElementById('bonusMessage'),
        continueButton: document.getElementById('continueButton'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        confettiContainer: document.getElementById('confettiContainer'),
        giftContent: document.querySelector('.gift-content'),
        giftHero: document.getElementById('giftHero'),
        giftSparkleContainer: document.getElementById('giftSparkleContainer')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        isMoving: true,
        isOpened: false,
        isNavigating: false,
        movementInterval: null,
        rewardsRevealed: 0,
        totalRewards: 4,
        catchCount: 0,
        moveCount: 0,
        isHovering: false
    };

    // ==============================================
    // MODULE: Gift Movement (Enhanced)
    // ==============================================
    const giftMover = {
        /**
         * Start moving the gift box randomly
         */
        startMoving: function() {
            if (!dom.giftContainer) return;

            // Move immediately and then every 2-3 seconds
            this.moveGift();
            
            state.movementInterval = setInterval(() => {
                if (state.isMoving) {
                    this.moveGift();
                    state.moveCount++;
                    
                    // Show hint after several moves
                    if (state.moveCount === 3 && dom.giftHint) {
                        dom.giftHint.textContent = '💡 Getting faster! You can do it! ⚡';
                        dom.giftHint.style.color = '#fbbf24';
                    }
                    if (state.moveCount === 6 && dom.giftHint) {
                        dom.giftHint.textContent = '💡 Almost there! Keep trying! 🎯';
                        dom.giftHint.style.color = '#60a5fa';
                    }
                }
            }, 2200);
        },

        /**
         * Move gift to a random position with smooth animation
         */
        moveGift: function() {
            const container = dom.giftContainer;
            const hero = dom.giftHero;
            
            // Get container dimensions
            const containerRect = hero.getBoundingClientRect();
            const giftRect = container.getBoundingClientRect();
            
            // Calculate safe boundaries (keep gift fully visible)
            const padding = 30;
            const maxX = containerRect.width - giftRect.width - padding;
            const maxY = containerRect.height - giftRect.height - padding - 120;
            
            // Generate random positions with some variation
            const randomX = Math.max(padding, Math.random() * maxX);
            const randomY = Math.max(padding, Math.random() * maxY);
            
            // Apply smooth transition with different easing
            const easing = ['cubic-bezier(0.34, 1.56, 0.64, 1)', 'cubic-bezier(0.23, 1, 0.32, 1)'];
            const easingIndex = Math.floor(Math.random() * easing.length);
            
            container.style.transition = `transform 1.5s ${easing[easingIndex]}`;
            container.style.transform = `translate(${randomX - containerRect.left}px, ${randomY - containerRect.top}px)`;
            
            // Add sparkle trail effect
            this.createMoveTrail(container);
        },

        /**
         * Create sparkle trail when moving
         */
        createMoveTrail: function(container) {
            const rect = container.getBoundingClientRect();
            const sparkle = document.createElement('span');
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #fbbf24, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                animation: sparkleTrail 0.8s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1000);
        },

        /**
         * Stop moving the gift
         */
        stopMoving: function() {
            state.isMoving = false;
            if (state.movementInterval) {
                clearInterval(state.movementInterval);
                state.movementInterval = null;
            }
        }
    };

    // ==============================================
    // MODULE: Gift Opening (Enhanced)
    // ==============================================
    const giftOpener = {
        /**
         * Open the gift box
         */
        openGift: function() {
            if (state.isOpened) return;
            state.isOpened = true;

            const giftBox = dom.giftBox;
            const giftContainer = dom.giftContainer;

            // Add open class for CSS animation
            giftBox.classList.add('open');

            // Shake animation with sound effect simulation
            this.playShakeAnimation(giftContainer);

            // Generate sparkles from gift
            this.generateGiftSparkles();

            // After shake, show celebration
            setTimeout(() => {
                this.showCelebration();
            }, 700);
        },

        /**
         * Play shake animation
         */
        playShakeAnimation: function(container) {
            const shakeIntensity = 6;
            
            // Disable float animation
            container.style.animation = 'none';
            container.style.transition = 'transform 0.08s ease';
            
            // Shake effect with increasing intensity then decreasing
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const intensity = (i < 5) ? shakeIntensity - i : (i - 5) * 0.5;
                    const offset = (i % 2 === 0) ? intensity : -intensity;
                    const rotation = (i % 2 === 0) ? intensity * 0.5 : -intensity * 0.5;
                    container.style.transform = `translateX(${offset}px) rotate(${rotation}deg)`;
                }, i * 70);
            }
            
            setTimeout(() => {
                container.style.transform = 'translateX(0) rotate(0deg)';
                container.style.transition = '';
            }, 750);
        },

        /**
         * Generate sparkles from gift
         */
        generateGiftSparkles: function() {
            const container = dom.giftSparkleContainer;
            if (!container) return;

            const colors = ['#fbbf24', '#ff6b6b', '#60a5fa', '#34d399', '#f472b6'];
            
            for (let i = 0; i < 20; i++) {
                const sparkle = document.createElement('span');
                const size = 4 + Math.random() * 10;
                const angle = Math.random() * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                sparkle.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 ${size * 2}px ${color}80;
                    pointer-events: none;
                    animation: giftSparkleBurst 1.2s ease-out forwards;
                    --x: ${x}px;
                    --y: ${y}px;
                `;

                container.appendChild(sparkle);
            }

            // Clean up
            setTimeout(() => {
                container.innerHTML = '';
            }, 1500);
        },

        /**
         * Show celebration effects and messages
         */
        showCelebration: function() {
            // Hide instruction with animation
            if (dom.giftInstruction) {
                dom.giftInstruction.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                dom.giftInstruction.style.opacity = '0';
                dom.giftInstruction.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    dom.giftInstruction.style.display = 'none';
                }, 500);
            }
            
            if (dom.giftHint) {
                dom.giftHint.style.transition = 'opacity 0.5s ease';
                dom.giftHint.style.opacity = '0';
                setTimeout(() => {
                    dom.giftHint.style.display = 'none';
                }, 500);
            }

            // Show celebration message
            if (dom.celebrationMessage) {
                dom.celebrationMessage.classList.remove('hidden');
                dom.celebrationMessage.classList.add('visible');
            }

            // Generate celebration effects
            celebrationEffects.generateHearts();
            celebrationEffects.generateSparkles();
            celebrationEffects.generateConfetti();

            // Update catch count
            state.catchCount++;
            if (dom.catchCount) {
                dom.catchCount.textContent = state.catchCount;
                dom.catchCount.style.transition = 'transform 0.3s ease';
                dom.catchCount.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    dom.catchCount.style.transform = 'scale(1)';
                }, 300);
            }

            // Reveal rewards one by one
            setTimeout(() => {
                rewardRevealer.revealRewards();
            }, 800);
        }
    };

    // ==============================================
    // MODULE: Reward Revealer (Enhanced)
    // ==============================================
    const rewardRevealer = {
        /**
         * Reveal reward cards one by one
         */
        revealRewards: function() {
            // Show rewards section
            if (dom.rewardsSection) {
                dom.rewardsSection.classList.remove('hidden');
                dom.rewardsSection.classList.add('visible');
            }

            // Reveal each card with delay
            dom.rewardCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                    
                    // Show unlock badge with delay
                    setTimeout(() => {
                        const unlock = card.querySelector('.reward-unlock');
                        if (unlock) {
                            unlock.classList.remove('hidden');
                            unlock.classList.add('visible');
                        }
                    }, 400);

                    // Show fun fact with more delay
                    setTimeout(() => {
                        const fact = card.querySelector('.reward-fun-fact');
                        if (fact) {
                            fact.classList.remove('hidden');
                            fact.classList.add('visible');
                        }
                    }, 800);

                    state.rewardsRevealed++;

                    // Check if all rewards are revealed
                    if (state.rewardsRevealed === state.totalRewards) {
                        setTimeout(() => {
                            this.showBonusMessage();
                            this.showContinueButton();
                        }, 600);
                    }
                }, (index + 1) * 600);
            });
        },

        /**
         * Show bonus message
         */
        showBonusMessage: function() {
            if (dom.bonusMessage) {
                dom.bonusMessage.classList.remove('hidden');
                dom.bonusMessage.classList.add('visible');
            }

            // Extra celebration
            setTimeout(() => {
                celebrationEffects.generateHearts();
                celebrationEffects.generateSparkles();
            }, 300);
        },

        /**
         * Show continue button
         */
        showContinueButton: function() {
            if (dom.continueButton) {
                dom.continueButton.classList.remove('hidden');
                dom.continueButton.classList.add('visible');
                
                // Animate button entrance
                dom.continueButton.style.animation = 'celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }

            // Final celebration burst
            setTimeout(() => {
                celebrationEffects.generateHearts();
                celebrationEffects.generateConfetti();
            }, 500);
        }
    };

    // ==============================================
    // MODULE: Celebration Effects (Enhanced)
    // ==============================================
    const celebrationEffects = {
        /**
         * Generate floating hearts
         */
        generateHearts: function() {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            container.innerHTML = '';
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            
            for (let i = 0; i < 35; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 18 + Math.random() * 42;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 6;
                const delay = Math.random() * 2;
                const rotation = (Math.random() - 0.5) * 360;
                const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'];
                
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
                container.innerHTML = '';
            }, 10000);
        },

        /**
         * Generate sparkles
         */
        generateSparkles: function() {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            container.innerHTML = '';
            const colors = ['#ffffff', '#a8a4ff', '#6c63ff', '#fbbf24', '#60a5fa', '#34d399'];
            
            for (let i = 0; i < 40; i++) {
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
        },

        /**
         * Generate confetti
         */
        generateConfetti: function() {
            const container = dom.confettiContainer || document.querySelector('.confetti-container');
            if (!container) return;

            container.innerHTML = '';
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#f97316'];
            const count = 150;

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
                container.innerHTML = '';
            }, 8000);
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        /**
         * Navigate to page6.html with fade transition
         */
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.giftContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page6.html';
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
            // Gift box click
            if (dom.giftBox) {
                dom.giftBox.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (!state.isOpened) {
                        // Stop movement
                        giftMover.stopMoving();
                        // Open the gift
                        giftOpener.openGift();
                    }
                });

                // Hover effects
                dom.giftBox.addEventListener('mouseenter', function() {
                    state.isHovering = true;
                    if (!state.isOpened) {
                        // Speed up movement slightly when hovering
                        const container = dom.giftContainer;
                        container.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    }
                });

                dom.giftBox.addEventListener('mouseleave', function() {
                    state.isHovering = false;
                });
            }

            // Gift container click (for better hit area)
            if (dom.giftContainer) {
                dom.giftContainer.addEventListener('click', function(e) {
                    if (e.target.closest('.gift-box')) return;
                    if (!state.isOpened) {
                        giftMover.stopMoving();
                        giftOpener.openGift();
                    }
                });
            }

            // Continue button
            if (dom.continueButton) {
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            // Keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                // Space or Enter to open gift
                if ((e.key === ' ' || e.key === 'Enter') && !state.isOpened && dom.giftBox) {
                    e.preventDefault();
                    giftMover.stopMoving();
                    giftOpener.openGift();
                }
                // Escape to see hint
                if (e.key === 'Escape' && dom.giftHint) {
                    dom.giftHint.textContent = '💡 Click the gift box to open it! 🎁';
                    dom.giftHint.style.color = '#fbbf24';
                    setTimeout(() => {
                        dom.giftHint.textContent = '💡 Tip: It moves around! Be quick! ⚡';
                        dom.giftHint.style.color = '';
                    }, 3000);
                }
            });
        }
    };

    // ==============================================
    // MODULE: Dynamic Animations Injection
    // ==============================================
    const animationInjector = {
        /**
         * Inject required keyframe animations
         */
        inject: function() {
            const style = document.createElement('style');
            style.id = 'page5-dynamic-animations';
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

                @keyframes sparkleTrail {
                    0% {
                        transform: scale(0.5);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }

                @keyframes giftSparkleBurst {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--x), var(--y)) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // INITIALIZATION
    // ==============================================

    /**
     * Initialize the gift page
     */
    function init() {
        // Inject required animations
        animationInjector.inject();

        // Set up event listeners
        eventManager.init();

        // Start moving the gift after a short delay
        setTimeout(() => {
            giftMover.startMoving();
        }, 600);

        // Console message with fun greeting
        console.log('🎁 Mystery Gift Box loaded!');
        console.log('💙 Catch the gift and unlock surprises!');
        console.log('🏆 5th Monthsary Special Edition!');

        // Show hint after a few seconds if not opened
        setTimeout(() => {
            if (!state.isOpened && dom.giftHint) {
                dom.giftHint.textContent = '💡 PS: You can use Space or Enter key too! ⌨️';
                dom.giftHint.style.color = '#a8a4ff';
                setTimeout(() => {
                    if (!state.isOpened) {
                        dom.giftHint.textContent = '💡 Tip: It moves around! Be quick! ⚡';
                        dom.giftHint.style.color = '';
                    }
                }, 3000);
            }
        }, 5000);
    }

    // Start the page
    init();

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        if (state.movementInterval) {
            clearInterval(state.movementInterval);
        }
    });
});