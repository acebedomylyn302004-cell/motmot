/**
 * ==============================================
 * page6.js - Our Beautiful Memories (Enhanced)
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
        polaroids: document.querySelectorAll('.polaroid'),
        modal: document.getElementById('scrapbookModal'),
        modalOverlay: document.getElementById('modalOverlay'),
        modalClose: document.getElementById('modalClose'),
        modalImage: document.getElementById('modalImage'),
        modalTitle: document.getElementById('modalTitle'),
        modalDescription: document.getElementById('modalDescription'),
        modalIcon: document.getElementById('modalIcon'),
        modalDate: document.getElementById('modalDate'),
        specialMemory: document.getElementById('specialMemory'),
        specialText: document.getElementById('specialText'),
        continueButton: document.getElementById('continueButton'),
        counterNumber: document.getElementById('counterNumber'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        confettiContainer: document.getElementById('confettiContainer'),
        memoriesContent: document.querySelector('.memories-content')
    };

    // ==============================================
    // DATA - Updated with your memories
    // ==============================================
    const memoryData = {
        1: {
            title: 'Our First Picture',
            icon: '❤️',
            image: 'memory1.jpg',
            description: 'This was the very first picture we took together after swimming in Tugonan. I still remember how genuinely happy I was that day. Seeing us both smiling in this photo always brings me back to that moment. I never imagined that one simple picture would become the beginning of so many beautiful memories with you. ❤️'
        },
        2: {
            title: 'Cute Moments',
            icon: '💕',
            image: 'memory2.jpg',
            description: 'All those cute little moments we shared that made my heart skip a beat. From your silly faces to your sweet smiles, I treasure every single one. You have this way of making even the simplest moments feel magical. 💕'
        },
        3: {
            title: 'Video Call Nights',
            icon: '📱',
            image: 'memory3.jpg',
            description: 'Those late-night video calls when we couldn\'t sleep and just wanted to see each other\'s faces. Even through a screen, you made me feel so close. Your voice became my favorite sound, and your face became the last thing I wanted to see before falling asleep. 📱💙'
        },
        4: {
            title: 'Random Selfie',
            icon: '🤳',
            image: 'memory4.jpg',
            description: 'A quiet moment I will always treasure. While Hubby was peacefully sleeping beside my neck, I couldn not help but smile because having you close made me feel safe, calm, and happy. Sometimes, the simplest moments become the most unforgettable memories. 🤳'
        },
        5: {
            title: 'Favorite Memory',
            icon: '⭐',
            image: 'memory5.jpg',
            description: 'This memory holds a special place in my heart. It reminds me of why I fell in love with you and why I keep falling deeper every day. You are my favorite person, and this is my favorite memory with you. ⭐'
        },
        6: {
            title: 'Happy Day Together',
            icon: '😊',
            image: 'memory6.jpg',
            description: 'A day filled with laughter, joy, and your beautiful smile. These are the days I want to relive over and over again. When I\'m with you, every day feels like the best day ever. 😊'
        },
        7: {
            title: 'Laughing Together',
            icon: '😂',
            image: 'memory7.jpg',
            description: 'The sound of your laughter is my favorite melody. This photo captured one of those moments when we couldn\'t stop laughing. Your laugh is contagious, and it\'s one of the many things I love about you. 😂❤️'
        },
        8: {
            title: 'Forever Starts Here',
            icon: '💍',
            image: 'memory8.jpg',
            description: 'This is where our forever began. A promise of endless love, countless memories, and a lifetime of happiness together. From this moment on, I knew that you were the one I wanted to spend forever with. 💍💙'
        }
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        viewedMemories: new Set(),
        totalMemories: 8,
        isModalOpen: false,
        isNavigating: false,
        isSpecialRevealed: false
    };

    // ==============================================
    // MODULE: Typewriter Effect
    // ==============================================
    const typewriter = {
        animate: function(element, text, speed = 20) {
            return new Promise((resolve) => {
                if (!element) return resolve();
                
                element.textContent = '';
                let index = 0;
                
                const interval = setInterval(() => {
                    if (index < text.length) {
                        element.textContent += text.charAt(index);
                        index++;
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, speed);
            });
        },

        reset: function(element, text) {
            if (element) {
                element.textContent = text;
            }
        }
    };

    // ==============================================
    // MODULE: Memory Viewer
    // ==============================================
    const memoryViewer = {
        openModal: function(memoryId) {
            if (state.isModalOpen) return;
            state.isModalOpen = true;

            const data = memoryData[memoryId];
            if (!data) return;

            // Populate modal content
            dom.modalImage.src = data.image;
            dom.modalImage.alt = data.title;
            dom.modalTitle.textContent = data.title;
            dom.modalIcon.textContent = data.icon;
            
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'long' });
            dom.modalDate.textContent = `💙 5th Monthsary • ${month} ${date.getFullYear()}`;

            dom.modalDescription.textContent = '';
            
            dom.modal.classList.remove('hidden');
            dom.modal.style.animation = 'modalFadeIn 0.4s ease-out forwards';

            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.animation = 'modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }

            setTimeout(() => {
                typewriter.animate(dom.modalDescription, data.description, 18);
            }, 400);

            celebrationEffects.generateModalHearts();
            this.trackMemory(memoryId);
            document.body.style.overflow = 'hidden';
        },

        closeModal: function() {
            if (!state.isModalOpen) return;
            state.isModalOpen = false;

            dom.modal.classList.add('hidden');
            document.body.style.overflow = '';

            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.animation = '';
            }
        },

        trackMemory: function(memoryId) {
            if (state.viewedMemories.has(memoryId)) return;
            
            state.viewedMemories.add(memoryId);
            
            if (dom.counterNumber) {
                dom.counterNumber.textContent = state.viewedMemories.size;
                dom.counterNumber.classList.remove('pop');
                void dom.counterNumber.offsetWidth;
                dom.counterNumber.classList.add('pop');
            }

            const polaroid = document.querySelector(`.polaroid[data-memory="${memoryId}"]`);
            if (polaroid) {
                polaroid.classList.add('viewed');
            }

            if (state.viewedMemories.size === state.totalMemories) {
                setTimeout(() => {
                    this.revealSpecialMemory();
                }, 800);
            }
        },

        revealSpecialMemory: function() {
            if (state.isSpecialRevealed) return;
            state.isSpecialRevealed = true;

            if (dom.specialMemory) {
                dom.specialMemory.classList.remove('hidden');
                dom.specialMemory.style.animation = 'specialFadeIn 0.8s ease-out forwards';
            }

            if (dom.continueButton) {
                dom.continueButton.classList.add('visible');
            }

            celebrationEffects.generateHearts(30);
            celebrationEffects.generateSparkles(40);
            celebrationEffects.generateConfetti(120);

            const badge = document.createElement('div');
            badge.className = 'celebration-badge';
            badge.textContent = '🌟 All Memories Unlocked! 🌟';
            badge.style.cssText = `
                display: inline-block;
                padding: 0.5rem 1.5rem;
                margin: 0.5rem 0;
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05));
                border: 1px solid rgba(251, 191, 36, 0.3);
                border-radius: 50px;
                font-size: clamp(0.9rem, 1.5vw, 1.1rem);
                color: #fbbf24;
                animation: celebrationPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            `;
            
            if (dom.specialMemory) {
                dom.specialMemory.insertBefore(badge, dom.specialMemory.firstChild);
            }

            console.log('🎉 All 8 memories viewed! Special memory unlocked! 💙');
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        generateModalHearts: function() {
            const container = dom.modal;
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            
            for (let i = 0; i < 12; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 16 + Math.random() * 24;
                const left = 5 + Math.random() * 90;
                const bottom = 5 + Math.random() * 90;
                const duration = 2 + Math.random() * 3;
                const delay = Math.random() * 1.5;
                
                heart.style.cssText = `
                    position: fixed;
                    left: ${left}%;
                    top: ${bottom}%;
                    font-size: ${size}px;
                    color: ${['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'][Math.floor(Math.random() * 6)]};
                    opacity: 0;
                    pointer-events: none;
                    animation: floatHeartUp ${duration}s ease-in ${delay}s forwards;
                    z-index: 1001;
                    text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                `;

                container.appendChild(heart);

                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }, (duration + delay) * 1000 + 500);
            }
        },

        generateHearts: function(count = 30) {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            container.innerHTML = '';
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff'];
            
            for (let i = 0; i < count; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 18 + Math.random() * 40;
                const left = Math.random() * 100;
                const duration = 4 + Math.random() * 6;
                const delay = Math.random() * 2;
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
                container.innerHTML = '';
            }, 10000);
        },

        generateSparkles: function(count = 30) {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            container.innerHTML = '';
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

        generateConfetti: function(count = 100) {
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
                container.remove();
            }, 8000);
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.memoriesContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page7.html';
            }, 1000);
        }
    };

    // ==============================================
    // MODULE: Event Listeners
    // ==============================================
    const eventManager = {
        init: function() {
            dom.polaroids.forEach((polaroid) => {
                polaroid.addEventListener('click', function() {
                    const memoryId = this.getAttribute('data-memory');
                    memoryViewer.openModal(memoryId);
                });
            });

            if (dom.modalOverlay) {
                dom.modalOverlay.addEventListener('click', function() {
                    memoryViewer.closeModal();
                });
            }

            if (dom.modalClose) {
                dom.modalClose.addEventListener('click', function() {
                    memoryViewer.closeModal();
                });
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && state.isModalOpen) {
                    memoryViewer.closeModal();
                }
            });

            if (dom.continueButton) {
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            if (dom.specialText) {
                dom.specialText.addEventListener('click', function() {
                    this.contentEditable = true;
                    this.focus();
                    this.classList.add('editing');
                });

                dom.specialText.addEventListener('blur', function() {
                    this.contentEditable = false;
                    this.classList.remove('editing');
                    try {
                        localStorage.setItem('specialMemory', this.textContent);
                    } catch (e) {}
                });

                try {
                    const saved = localStorage.getItem('specialMemory');
                    if (saved && dom.specialText) {
                        dom.specialText.textContent = saved;
                    }
                } catch (e) {}
            }

            if (dom.modalDescription) {
                dom.modalDescription.addEventListener('click', function() {
                    this.contentEditable = true;
                    this.focus();
                    this.classList.add('editing');
                });

                dom.modalDescription.addEventListener('blur', function() {
                    this.contentEditable = false;
                    this.classList.remove('editing');
                    const memoryId = dom.modalTitle.textContent;
                    try {
                        const memoryKey = 'memory_' + memoryId.replace(/\s+/g, '_');
                        localStorage.setItem(memoryKey, this.textContent);
                    } catch (e) {}
                });

                Object.keys(memoryData).forEach((id) => {
                    const data = memoryData[id];
                    if (data && data.title) {
                        try {
                            const memoryKey = 'memory_' + data.title.replace(/\s+/g, '_');
                            const saved = localStorage.getItem(memoryKey);
                            if (saved) {
                                data.description = saved;
                            }
                        } catch (e) {}
                    }
                });
            }

            document.addEventListener('keydown', function(e) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= 8 && !state.isModalOpen) {
                    memoryViewer.openModal(num);
                }
            });
        }
    };

    // ==============================================
    // MODULE: Dynamic Animations Injection
    // ==============================================
    const animationInjector = {
        inject: function() {
            const style = document.createElement('style');
            style.id = 'page6-dynamic-animations';
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

        setTimeout(() => {
            if (state.viewedMemories.size === state.totalMemories) {
                memoryViewer.revealSpecialMemory();
            }
        }, 1000);

        console.log('📸 Our Beautiful Memories loaded!');
        console.log(`💙 ${state.totalMemories} Polaroid memories waiting to be viewed.`);
        console.log('🌟 View all memories to unlock a special surprise!');
        console.log('⌨️ Tip: Press keys 1-8 to open memories quickly!');

        Object.values(memoryData).forEach(data => {
            const img = new Image();
            img.src = data.image;
        });
    }

    init();

    window.addEventListener('beforeunload', function() {
        document.body.style.overflow = '';
    });
});