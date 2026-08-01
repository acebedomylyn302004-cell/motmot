/**
 * ==============================================
 * page7.js - A Letter From Putot
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
        envelope: document.getElementById('envelope'),
        envelopeContainer: document.getElementById('envelopeContainer'),
        envelopeInstruction: document.getElementById('envelopeInstruction'),
        letterContainer: document.getElementById('letterContainer'),
        letterPaper: document.getElementById('letterPaper'),
        letterMessage: document.querySelectorAll('.letter-message'),
        letterDate: document.getElementById('letterDate'),
        signatureDate: document.getElementById('signatureDate'),
        continueButton: document.getElementById('continueButton'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        rosePetals: document.getElementById('rosePetals'),
        floatingStars: document.getElementById('floatingStars'),
        confettiContainer: document.getElementById('confettiContainer'),
        letterContent: document.querySelector('.letter-content'),
        letterHero: document.getElementById('letterHero')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        isOpening: false,
        isOpened: false,
        isTyping: false,
        isNavigating: false,
        typewriterComplete: false,
        letterMessages: [],
        currentMessageIndex: 0,
        charIndex: 0
    };

    // ==============================================
    // MODULE: Date Formatter
    // ==============================================
    const dateFormatter = {
        /**
         * Format current date for the letter
         */
        getFormattedDate: function() {
            const date = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            return date.toLocaleDateString('en-US', options);
        },

        /**
         * Set dates in the letter
         */
        setDates: function() {
            const formattedDate = this.getFormattedDate();
            if (dom.letterDate) {
                dom.letterDate.textContent = `💙 ${formattedDate}`;
            }
            if (dom.signatureDate) {
                dom.signatureDate.textContent = formattedDate;
            }
        }
    };

    // ==============================================
    // MODULE: Pre-Opening Message
    // ==============================================
    const preOpeningMessage = {
        /**
         * Show "Before you read this..." message
         */
        show: function() {
            return new Promise((resolve) => {
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'pre-open-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.8s ease;
                `;

                // Create message container
                const messageBox = document.createElement('div');
                messageBox.className = 'pre-open-message';
                messageBox.style.cssText = `
                    text-align: center;
                    padding: 2rem 3rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 2rem;
                    backdrop-filter: blur(12px);
                    transform: scale(0.9);
                    opacity: 0;
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                `;

                const icon = document.createElement('div');
                icon.textContent = '💌';
                icon.style.cssText = `
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    display: block;
                    animation: previewHeartBeat 1s ease-in-out infinite;
                `;

                const title = document.createElement('h2');
                title.textContent = 'Before you read this...';
                title.style.cssText = `
                    font-family: 'Georgia', serif;
                    font-size: 2rem;
                    color: #fff;
                    margin: 0.5rem 0;
                    text-shadow: 0 2px 20px rgba(108, 99, 255, 0.3);
                `;

                const subtext = document.createElement('p');
                subtext.textContent = 'A special message from Putot 💙';
                subtext.style.cssText = `
                    font-size: 1rem;
                    color: #c8c6e8;
                    font-weight: 300;
                    margin: 0.2rem 0;
                    letter-spacing: 0.04em;
                `;

                const heartLoader = document.createElement('div');
                heartLoader.textContent = '💙 ❤️ 💙 ❤️ 💙';
                heartLoader.style.cssText = `
                    font-size: 1.2rem;
                    margin-top: 1rem;
                    opacity: 0.6;
                    animation: pulseText 1.5s ease-in-out infinite;
                `;

                messageBox.appendChild(icon);
                messageBox.appendChild(title);
                messageBox.appendChild(subtext);
                messageBox.appendChild(heartLoader);
                overlay.appendChild(messageBox);
                document.body.appendChild(overlay);

                // Trigger fade in
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    messageBox.style.opacity = '1';
                    messageBox.style.transform = 'scale(1)';
                });

                // Wait for 2.5 seconds then fade out
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    messageBox.style.opacity = '0';
                    messageBox.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        if (overlay.parentNode) {
                            overlay.remove();
                        }
                        resolve();
                    }, 800);
                }, 2500);

                // Add keyframe animations if not exists
                this.injectPreOpenStyles();
            });
        },

        /**
         * Inject styles for pre-opening message
         */
        injectPreOpenStyles: function() {
            if (document.getElementById('preOpenStyles')) return;

            const style = document.createElement('style');
            style.id = 'preOpenStyles';
            style.textContent = `
                @keyframes previewHeartBeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // MODULE: Envelope Opener
    // ==============================================
    const envelopeOpener = {
        /**
         * Open the envelope with animation
         */
        open: function() {
            return new Promise((resolve) => {
                // Add open class to envelope
                dom.envelope.classList.add('opened');

                // Hide instruction
                if (dom.envelopeInstruction) {
                    dom.envelopeInstruction.style.transition = 'opacity 0.5s ease';
                    dom.envelopeInstruction.style.opacity = '0';
                    setTimeout(() => {
                        dom.envelopeInstruction.style.display = 'none';
                    }, 500);
                }

                // Show letter container after envelope opens
                setTimeout(() => {
                    if (dom.letterContainer) {
                        dom.letterContainer.classList.remove('hidden');
                        dom.letterContainer.classList.add('visible');
                    }

                    // Add paper shadow glow
                    if (dom.letterPaper) {
                        dom.letterPaper.style.transition = 'box-shadow 0.8s ease';
                        dom.letterPaper.style.boxShadow = '0 8px 60px rgba(108, 99, 255, 0.15), 0 2px 20px rgba(108, 99, 255, 0.05)';
                    }

                    // Start effects
                    celebrationEffects.generateHearts();
                    celebrationEffects.generateSparkles();
                    celebrationEffects.generateRosePetals();
                    celebrationEffects.generateStars();

                    resolve();
                }, 900);
            });
        }
    };

    // ==============================================
    // MODULE: Typewriter Effect
    // ==============================================
    const typewriter = {
        /**
         * Initialize typewriter with all letter paragraphs
         */
        init: function() {
            // Collect all letter message paragraphs
            state.letterMessages = Array.from(dom.letterMessage);
            state.currentMessageIndex = 0;
            state.charIndex = 0;
            
            // Clear all messages content
            state.letterMessages.forEach(el => {
                el.textContent = '';
            });

            // Start typing
            this.typeNextParagraph();
        },

        /**
         * Type the next paragraph
         */
        typeNextParagraph: function() {
            if (state.currentMessageIndex >= state.letterMessages.length) {
                this.onComplete();
                return;
            }

            const element = state.letterMessages[state.currentMessageIndex];
            const originalText = element.getAttribute('data-original') || element.textContent.trim();
            
            // Store original text if not stored
            if (!element.getAttribute('data-original')) {
                element.setAttribute('data-original', originalText);
            }

            state.charIndex = 0;
            this.typeChar(element, originalText);
        },

        /**
         * Type characters one by one
         */
        typeChar: function(element, text) {
            if (state.charIndex < text.length) {
                // Random speed variation for realism (20-40ms)
                const speed = 25 + Math.random() * 20;
                
                // Add character
                element.textContent += text.charAt(state.charIndex);
                state.charIndex++;

                // Occasionally add small pause at punctuation
                let delay = speed;
                const char = text.charAt(state.charIndex - 1);
                if (['.', '!', '?', ',', ';'].includes(char)) {
                    delay = speed + 100 + Math.random() * 50;
                }

                setTimeout(() => {
                    this.typeChar(element, text);
                }, delay);
            } else {
                // Move to next paragraph
                state.currentMessageIndex++;
                setTimeout(() => {
                    this.typeNextParagraph();
                }, 400);
            }
        },

        /**
         * Called when typewriting is complete
         */
        onComplete: function() {
            state.typewriterComplete = true;
            
            // Show completion message
            this.showCompletionMessage();
        },

        /**
         * Show completion message
         */
        showCompletionMessage: function() {
            const completionMsg = document.createElement('div');
            completionMsg.className = 'typewriter-complete';
            completionMsg.textContent = 'Thank you for reading my letter. ❤️';
            completionMsg.style.cssText = `
                text-align: center;
                font-family: 'Georgia', serif;
                font-size: clamp(1.2rem, 2.5vw, 1.8rem);
                color: #fbbf24;
                margin-top: 1.5rem;
                padding: 1rem;
                background: rgba(251, 191, 36, 0.05);
                border: 1px solid rgba(251, 191, 36, 0.15);
                border-radius: 1rem;
                opacity: 0;
                transform: scale(0.9);
                transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                text-shadow: 0 0 40px rgba(251, 191, 36, 0.2);
                animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            `;

            const letterBody = document.querySelector('.letter-body');
            if (letterBody) {
                letterBody.appendChild(completionMsg);
            }

            // Show continue button
            setTimeout(() => {
                if (dom.continueButton) {
                    dom.continueButton.classList.remove('hidden');
                    dom.continueButton.classList.add('visible');
                }

                // Generate celebration effects
                celebrationEffects.generateHearts(20);
                celebrationEffects.generateSparkles(30);
                celebrationEffects.generateConfetti(80);
            }, 600);
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        /**
         * Generate floating hearts
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

            // Clean up after animation
            setTimeout(() => {
                if (container) {
                    // Only remove old hearts, keep the container
                    const hearts = container.querySelectorAll('span');
                    hearts.forEach(el => {
                        if (!el.classList.contains('persistent')) {
                            el.remove();
                        }
                    });
                }
            }, 10000);
        },

        /**
         * Generate sparkles
         */
        generateSparkles: function(count = 30) {
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
        },

        /**
         * Generate falling rose petals
         */
        generateRosePetals: function(count = 20) {
            const container = dom.rosePetals || document.querySelector('.rose-petals');
            if (!container) return;

            const petalShapes = ['🌸', '🌹', '🌺', '💮', '🌷'];
            
            for (let i = 0; i < count; i++) {
                const petal = document.createElement('span');
                petal.textContent = petalShapes[Math.floor(Math.random() * petalShapes.length)];
                
                const size = 16 + Math.random() * 24;
                const left = Math.random() * 100;
                const duration = 6 + Math.random() * 8;
                const delay = Math.random() * 5;
                const drift = (Math.random() - 0.5) * 120;
                const driftEnd = (Math.random() - 0.5) * 160;
                
                petal.style.cssText = `
                    position: absolute;
                    left: ${left}%;
                    top: -10%;
                    font-size: ${size}px;
                    opacity: 0;
                    pointer-events: none;
                    animation: rosePetalFall ${duration}s ease-in ${delay}s forwards;
                    --drift: ${drift}px;
                    --drift-end: ${driftEnd}px;
                    z-index: 1;
                    filter: blur(0.5px);
                `;

                container.appendChild(petal);
            }

            // Clean up after animation
            setTimeout(() => {
                if (container) {
                    const petals = container.querySelectorAll('span');
                    petals.forEach(el => {
                        if (!el.classList.contains('persistent')) {
                            el.remove();
                        }
                    });
                }
            }, 14000);
        },

        /**
         * Generate floating stars
         */
        generateStars: function(count = 15) {
            const container = dom.floatingStars || document.querySelector('.floating-stars');
            if (!container) return;

            const starSizes = ['⭐', '✨', '🌟', '💫'];
            
            for (let i = 0; i < count; i++) {
                const star = document.createElement('span');
                star.textContent = starSizes[Math.floor(Math.random() * starSizes.length)];
                
                const size = 18 + Math.random() * 28;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 4;
                
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
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        /**
         * Navigate to page8.html with fade transition
         */
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.letterContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page8.html';
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
            // Envelope click
            if (dom.envelope) {
                dom.envelope.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (!state.isOpening && !state.isOpened) {
                        mainHandler.startExperience();
                    }
                });
            }

            // Envelope container click (for better hit area)
            if (dom.envelopeContainer) {
                dom.envelopeContainer.addEventListener('click', function(e) {
                    if (e.target.closest('.envelope')) return;
                    if (!state.isOpening && !state.isOpened) {
                        mainHandler.startExperience();
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

            // Keyboard shortcut: Space or Enter to open
            document.addEventListener('keydown', function(e) {
                if ((e.key === ' ' || e.key === 'Enter') && !state.isOpening && !state.isOpened) {
                    e.preventDefault();
                    mainHandler.startExperience();
                }
            });
        }
    };

    // ==============================================
    // MODULE: Main Handler
    // ==============================================
    const mainHandler = {
        /**
         * Start the full letter experience
         */
        startExperience: async function() {
            if (state.isOpening) return;
            state.isOpening = true;

            try {
                // Step 1: Show pre-opening message
                await preOpeningMessage.show();

                // Step 2: Open the envelope
                await envelopeOpener.open();

                // Step 3: Start typewriter effect
                state.isTyping = true;
                typewriter.init();

                // Step 4: Update state
                state.isOpened = true;
                state.isOpening = false;

                // Step 5: Console log
                console.log('💌 Letter opened and reading...');
                console.log('❤️ Happy 5th Monthsary Hubby!');

            } catch (error) {
                console.error('Error during letter experience:', error);
                state.isOpening = false;
            }
        },

        /**
         * Reset the experience (for testing)
         */
        reset: function() {
            state.isOpening = false;
            state.isOpened = false;
            state.isTyping = false;
            state.typewriterComplete = false;
            state.currentMessageIndex = 0;
            state.charIndex = 0;

            // Reset envelope
            dom.envelope.classList.remove('opened');

            // Reset letter container
            if (dom.letterContainer) {
                dom.letterContainer.classList.add('hidden');
                dom.letterContainer.classList.remove('visible');
            }

            // Reset continue button
            if (dom.continueButton) {
                dom.continueButton.classList.add('hidden');
                dom.continueButton.classList.remove('visible');
            }

            // Reset instruction
            if (dom.envelopeInstruction) {
                dom.envelopeInstruction.style.display = '';
                dom.envelopeInstruction.style.opacity = '1';
            }

            // Reset letter messages
            state.letterMessages.forEach(el => {
                const original = el.getAttribute('data-original');
                if (original) {
                    el.textContent = original;
                }
            });

            // Remove completion message
            const completionMsg = document.querySelector('.typewriter-complete');
            if (completionMsg) {
                completionMsg.remove();
            }

            // Reset paper shadow
            if (dom.letterPaper) {
                dom.letterPaper.style.boxShadow = '';
            }

            // Clear decorative elements
            const containers = [
                dom.floatingHearts,
                dom.sparkles,
                dom.rosePetals,
                dom.floatingStars,
                dom.confettiContainer
            ];

            containers.forEach(container => {
                if (container) {
                    container.innerHTML = '';
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
            style.id = 'page7-dynamic-animations';
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

                @keyframes rosePetalFall {
                    0% {
                        opacity: 0;
                        transform: translateY(-10vh) rotate(0deg) translateX(0) scale(0.8);
                    }
                    10% {
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateY(50vh) rotate(180deg) translateX(var(--drift, 50px)) scale(1);
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(110vh) rotate(360deg) translateX(var(--drift-end, -30px)) scale(0.6);
                        opacity: 0;
                    }
                }

                @keyframes starTwinkle {
                    0% {
                        opacity: 0.2;
                        transform: scale(0.8) rotate(0deg);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.3) rotate(180deg);
                    }
                    100% {
                        opacity: 0.2;
                        transform: scale(0.8) rotate(360deg);
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

                @keyframes celebrationPop {
                    0% {
                        opacity: 0;
                        transform: scale(0.5) rotate(-5deg);
                    }
                    60% {
                        transform: scale(1.05) rotate(2deg);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                    }
                }

                @keyframes pulseText {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==============================================
    // INITIALIZATION
    // ==============================================

    /**
     * Initialize the letter page
     */
    function init() {
        // Inject required animations
        animationInjector.inject();

        // Set dates in the letter
        dateFormatter.setDates();

        // Store original letter content
        dom.letterMessage.forEach(el => {
            const original = el.textContent.trim();
            el.setAttribute('data-original', original);
        });

        // Set up event listeners
        eventManager.init();

        // Show initial state
        console.log('💌 A Letter From Putot loaded!');
        console.log('❤️ Click the envelope to open the letter.');
        console.log('⌨️ Tip: Press Space or Enter to open!');

        // Preload any images if needed
        // (None needed for this page)

        // Start subtle effects
        celebrationEffects.generateSparkles(15);
        celebrationEffects.generateStars(10);
        celebrationEffects.generateRosePetals(8);
    }

    // Start the page
    init();

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        // Clean up any remaining elements
        document.querySelectorAll('.confetti-container').forEach(el => {
            if (el.parentNode) {
                el.remove();
            }
        });
    });

    // Expose reset for testing (optional)
    // window.resetLetter = mainHandler.reset.bind(mainHandler);
});