/**
 * ==============================================
 * script.js - Monthsary Page Interactions
 * Theme: Happy 5th Monthsary Hubby 💙
 * ==============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==============================================
    // MODULE: Page Load Animations
    // ==============================================
    const pageLoad = {
        init: function() {
            // Add smooth fade-in by ensuring hero is visible
            const hero = document.getElementById('hero');
            if (hero) {
                hero.style.opacity = '1';
            }
            // Trigger entrance animation for content
            const content = document.querySelector('.hero-content');
            if (content) {
                content.style.animation = 'floatIn 1.4s ease-out forwards';
            }
        }
    };

    // ==============================================
    // MODULE: Floating Hearts Generator
    // ==============================================
    const floatingHearts = {
        container: null,
        heartCount: 18,
        heartChars: ['♥', '❤', '💙', '💕', '💖', '💗'],

        init: function() {
            this.container = document.getElementById('floatingHearts');
            if (!this.container) return;
            this.createHearts();
        },

        createHearts: function() {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < this.heartCount; i++) {
                const heart = document.createElement('span');
                heart.textContent = this.heartChars[Math.floor(Math.random() * this.heartChars.length)];
                heart.className = 'floating-heart';
                heart.style.cssText = this.getRandomStyles();
                fragment.appendChild(heart);
            }
            this.container.appendChild(fragment);
        },

        getRandomStyles: function() {
            const size = 14 + Math.random() * 26;
            const left = Math.random() * 100;
            const duration = 12 + Math.random() * 18;
            const delay = Math.random() * 20;
            const opacity = 0.2 + Math.random() * 0.4;
            const xDrift = (Math.random() - 0.5) * 120;

            return `
                position: absolute;
                left: ${left}%;
                bottom: -10%;
                font-size: ${size}px;
                opacity: ${opacity};
                color: #a8a4ff;
                text-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
                pointer-events: none;
                animation: floatHeart ${duration}s ease-in-out ${delay}s infinite alternate;
                --x-drift: ${xDrift}px;
                will-change: transform, opacity;
                z-index: 1;
            `;
        }
    };

    // ==============================================
    // MODULE: Sparkle Effect Generator
    // ==============================================
    const sparkles = {
        container: null,
        sparkleCount: 35,

        init: function() {
            this.container = document.getElementById('sparkles');
            if (!this.container) return;
            this.createSparkles();
        },

        createSparkles: function() {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < this.sparkleCount; i++) {
                const sparkle = document.createElement('span');
                sparkle.className = 'sparkle';
                sparkle.style.cssText = this.getRandomStyles();
                fragment.appendChild(sparkle);
            }
            this.container.appendChild(fragment);
        },

        getRandomStyles: function() {
            const size = 4 + Math.random() * 8;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = 3 + Math.random() * 6;
            const delay = Math.random() * 10;

            return `
                position: absolute;
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #ffffff, #a8a4ff);
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px rgba(168, 164, 255, 0.6);
                pointer-events: none;
                animation: twinkleSparkle ${duration}s ease-in-out ${delay}s infinite alternate;
                opacity: 0;
                will-change: transform, opacity;
                z-index: 1;
            `;
        }
    };

    // ==============================================
    // MODULE: Button Navigation with Ripple
    // ==============================================
    const navigation = {
        button: null,
        isAnimating: false,
        redirectDelay: 1200,

        init: function() {
            this.button = document.getElementById('startButton');
            if (!this.button) return;
            this.button.addEventListener('click', this.handleClick.bind(this));
        },

        handleClick: function(event) {
            // Prevent multiple clicks while animating
            if (this.isAnimating) return;
            this.isAnimating = true;

            // Prevent default link behavior
            event.preventDefault();

            // Create ripple effect at click position
            this.createRipple(event);

            // Add button press animation
            this.animateButton();

            // Add subtle pulse to the heart frame
            this.animateHeartFrame();

            // After animation completes, redirect
            setTimeout(() => {
                window.location.href = 'page2.html';
            }, this.redirectDelay);
        },

        createRipple: function(event) {
            const button = this.button;
            const rect = button.getBoundingClientRect();
            
            // Get click position relative to button
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height) * 1.2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x - size/2}px;
                top: ${y - size/2}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
                transform: scale(0);
                animation: rippleExpand 0.8s ease-out forwards;
                pointer-events: none;
                z-index: 5;
            `;

            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 1000);
        },

        animateButton: function() {
            const button = this.button;
            button.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease';
            button.style.transform = 'scale(0.92)';
            button.style.boxShadow = '0 4px 16px rgba(108, 99, 255, 0.3)';

            setTimeout(() => {
                button.style.transform = 'scale(1.06)';
                button.style.boxShadow = '0 12px 40px rgba(108, 99, 255, 0.6)';
            }, 200);

            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 8px 28px rgba(108, 99, 255, 0.35)';
            }, 450);
        },

        animateHeartFrame: function() {
            const frame = document.querySelector('.heart-frame');
            if (!frame) return;

            frame.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease';
            frame.style.transform = 'scale(1.12)';
            frame.style.boxShadow = '0 20px 60px rgba(108, 99, 255, 0.8), 0 0 100px rgba(108, 99, 255, 0.4)';

            setTimeout(() => {
                frame.style.transform = 'scale(0.98)';
                frame.style.boxShadow = '0 16px 56px rgba(108, 99, 255, 0.6)';
            }, 400);

            setTimeout(() => {
                frame.style.transform = 'scale(1)';
                frame.style.boxShadow = '0 12px 48px rgba(108, 99, 255, 0.5), 0 0 80px rgba(108, 99, 255, 0.2)';
            }, 700);
        },

        // Reset animation state if needed
        reset: function() {
            this.isAnimating = false;
        }
    };

    // ==============================================
    // MODULE: Dynamic CSS Injection for Animations
    // ==============================================
    const animationInjector = {
        init: function() {
            this.injectFloatingHeartKeyframes();
            this.injectSparkleKeyframes();
            this.injectRippleKeyframes();
        },

        injectFloatingHeartKeyframes: function() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatHeart {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
                        opacity: 0.2;
                    }
                    25% {
                        transform: translateY(-25vh) translateX(calc(var(--x-drift) * 0.3)) rotate(8deg) scale(1.1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-50vh) translateX(calc(var(--x-drift) * 0.6)) rotate(-5deg) scale(0.9);
                        opacity: 0.8;
                    }
                    75% {
                        transform: translateY(-75vh) translateX(calc(var(--x-drift) * 0.4)) rotate(5deg) scale(1.05);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(-110vh) translateX(calc(var(--x-drift) * 0.8)) rotate(-3deg) scale(0.7);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        },

        injectSparkleKeyframes: function() {
            const style = document.createElement('style');
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

        injectRippleKeyframes: function() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rippleExpand {
                    0% {
                        transform: scale(0);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(2.5);
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

    // 1. Inject required keyframe animations
    animationInjector.init();

    // 2. Trigger page load animations
    pageLoad.init();

    // 3. Generate floating hearts
    floatingHearts.init();

    // 4. Generate sparkles
    sparkles.init();

    // 5. Set up button navigation with ripple
    navigation.init();

    // Optional: Handle page visibility change to reset animation state if needed
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, reset navigation state if needed
            navigation.reset();
        }
    });

    // Console message for debugging (can be removed in production)
    console.log('💙 Happy 5th Monthsary Hubby! 💙');
});