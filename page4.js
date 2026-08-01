/**
 * ==============================================
 * page4.js - Relationship Quiz
 * Theme: Happy 5th Monthsary Hubby 💙
 * ==============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==============================================
    // QUIZ DATA
    // ==============================================
    const quizData = [
        {
            question: 'Kinsa pirmi mauna og pangaway?',
            answers: ['Wifey', 'Hubby', 'Misunderstanding'],
            response: '"Usahay si Wifey, usahay si Hubby, pero kasagaran misunderstanding ra gyud. 😂"'
        },
        {
            question: 'Clingy ba si Wifey?',
            answers: ['Yes', 'Super Yes', 'Super kaayo 😂'],
            response: '"Correct! kay palangga mana kayo ni putot si hubby. ❤️🤣"'
        },
        {
            question: 'Clingy ba si Hubby?',
            answers: ['Secretly Yes', 'Yes', 'Super clingy 😂'],
            response: '"Aysus... Maulaw lang jud mo ingon, gusto kaya ni putot ng clingy nga laki. 😂❤️"'
        },
        {
            question: 'kinsay perme mingawon sa atong duha?',
            answers: ['Wifey', 'Hubby', 'Both'],
            response: '"Sympre kitang duha, normal man jud na kay love na to ang isat-isa lovehonon.❤️"'
        },
        {
            question: 'Kinsa pirmi mag overthink?',
            answers: ['Wifey', 'Hubby', 'both'],
            response: '"Wrong answer, dli man overthink tawag ana, Gimingaw ra jud si putot sa iyang bana, pasensya na hubby love ra jud teka. 😂"'
        },
        {
            question: 'kinsa ang manyak sa atong duha?',
            answers: ['Wifey', 'Hubby', 'Both'],
            response: '"Sympre kitang duha duhh... feeling inosente sad ka. tawag ana lambing dli manyak. 🤭"'
        },
        {
            question: 'Kung magkita ta, unsa atong una buhaton?',
            answers: ['Hug', 'kiss', 'hinagwaay'],
            response: '"Honestly... all of the above! tapos human sa exciting part na dayon ang favorite na to. 😂❤️"'
        },
        {
            question: 'Kinsa ang mas gwapo?',
            answers: ['Hubby', 'Hubby', 'Hubby'],
            response: '"Grabe pud ka confident oy! HAHAHA. 😂"'
        },
        {
            question: 'Kinsa ang pinakagwapa?',
            answers: ['Wifey', 'Wifey', 'Wifey'],
            response: '"Sakto! Wala nay lain tubag ana. kng naay lain ipabarang teka ❤️"'
        },
        {
            question: 'Pila ka percent ang gugma ni Putot ug Hubby?',
            answers: ['100%', '1000%', 'Infinite'],
            response: '"SYSTEM ERROR: Ang atong gugma dili na ma-compute kay unlimited na. ❤️😂"'
        }
    ];

    // ==============================================
    // DOM REFERENCES
    // ==============================================
    const dom = {
        questionText: document.getElementById('questionText'),
        answerBtns: document.querySelectorAll('.btn-answer'),
        responseBox: document.getElementById('responseBox'),
        responseText: document.getElementById('responseText'),
        progressBar: document.getElementById('progressBar'),
        questionCounter: document.getElementById('questionCounter'),
        prevButton: document.getElementById('prevButton'),
        nextButton: document.getElementById('nextButton'),
        quizCard: document.getElementById('quizCard'),
        scoreCard: document.getElementById('scoreCard'),
        continueButton: document.getElementById('continueButton'),
        directNextPage: document.getElementById('directNextPage'),
        floatingHearts: document.getElementById('floatingHearts'),
        sparkles: document.getElementById('sparkles'),
        quizContent: document.querySelector('.quiz-content')
    };

    // ==============================================
    // STATE
    // ==============================================
    const state = {
        currentQuestion: 0,
        selectedAnswers: new Array(quizData.length).fill(null),
        isNavigating: false,
        isAnswering: false,
        quizComplete: false
    };

    // ==============================================
    // MODULE: Quiz Renderer
    // ==============================================
    const quizRenderer = {
        renderQuestion: function() {
            const index = state.currentQuestion;
            const data = quizData[index];

            dom.questionText.style.opacity = '0';
            dom.questionText.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                dom.questionText.textContent = data.question;
                dom.questionText.style.opacity = '1';
                dom.questionText.style.transform = 'translateY(0)';
            }, 200);

            dom.answerBtns.forEach((btn, i) => {
                if (i < data.answers.length) {
                    btn.textContent = data.answers[i];
                    btn.style.display = 'block';
                    if (state.selectedAnswers[index] === i) {
                        btn.classList.add('selected');
                        btn.disabled = true;
                    } else {
                        btn.classList.remove('selected');
                        btn.disabled = false;
                    }
                } else {
                    btn.style.display = 'none';
                }
            });

            dom.responseBox.classList.remove('visible');
            dom.responseBox.classList.add('hidden');

            dom.questionCounter.textContent = `Question ${index + 1} of ${quizData.length}`;
            dom.progressBar.style.width = ((index / quizData.length) * 100) + '%';
            dom.prevButton.disabled = index === 0;
            
            if (state.selectedAnswers[index] !== null) {
                dom.nextButton.classList.remove('hidden');
            } else {
                dom.nextButton.classList.add('hidden');
            }

            if (index === quizData.length - 1) {
                dom.nextButton.textContent = '🎉 See Results';
            } else {
                dom.nextButton.textContent = 'Next ➡';
            }
        },

        highlightAnswer: function(selectedIndex) {
            dom.answerBtns.forEach((btn, i) => {
                if (i === selectedIndex) {
                    btn.classList.add('selected');
                    btn.disabled = true;
                }
            });
        },

        showResponse: function(responseText) {
            dom.responseText.textContent = responseText;
            dom.responseBox.classList.remove('hidden');
            void dom.responseBox.offsetWidth;
            dom.responseBox.classList.add('visible');
        }
    };

    // ==============================================
    // MODULE: Quiz Navigation
    // ==============================================
    const quizNavigation = {
        nextQuestion: function() {
            const currentIndex = state.currentQuestion;
            
            if (currentIndex === quizData.length - 1) {
                this.showResults();
                return;
            }

            state.currentQuestion++;
            quizRenderer.renderQuestion();
            dom.quizCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },

        prevQuestion: function() {
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                quizRenderer.renderQuestion();
                dom.quizCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        },

        showResults: function() {
            state.quizComplete = true;
            
            const quizCard = dom.quizCard;
            quizCard.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            quizCard.style.opacity = '0';
            quizCard.style.transform = 'scale(0.92) translateY(-20px)';

            setTimeout(() => {
                quizCard.style.display = 'none';
                dom.scoreCard.classList.remove('hidden');
                dom.scoreCard.classList.add('visible');
                
                // Show the direct navigation button
                if (dom.directNextPage) {
                    dom.directNextPage.classList.remove('hidden');
                    dom.directNextPage.href = 'page5.html';
                }
                
                celebrationEffects.generateHearts();
                celebrationEffects.generateSparkles();
                celebrationEffects.generateConfetti();
            }, 600);
        }
    };

    // ==============================================
    // MODULE: Answer Handler
    // ==============================================
    const answerHandler = {
        handleAnswer: function(event) {
            const btn = event.currentTarget;
            const index = state.currentQuestion;
            
            if (state.isAnswering || state.selectedAnswers[index] !== null) return;
            
            state.isAnswering = true;
            const selectedIndex = parseInt(btn.getAttribute('data-answer'));
            
            state.selectedAnswers[index] = selectedIndex;
            quizRenderer.highlightAnswer(selectedIndex);
            quizRenderer.showResponse(quizData[index].response);
            
            dom.nextButton.classList.remove('hidden');
            celebrationEffects.generateMiniHearts();
            celebrationEffects.bounceCard();

            btn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 300);

            state.isAnswering = false;
        }
    };

    // ==============================================
    // MODULE: Celebration Effects
    // ==============================================
    const celebrationEffects = {
        generateMiniHearts: function() {
            const container = dom.quizCard;
            const heartChars = ['♥', '❤', '💙', '💕', '💖', '💗'];
            
            for (let i = 0; i < 8; i++) {
                const heart = document.createElement('span');
                heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                
                const size = 16 + Math.random() * 20;
                const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
                const distance = 50 + Math.random() * 60;
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
                setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000 + 500);
            }
        },

        bounceCard: function() {
            const card = dom.quizCard;
            card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = 'scale(1.02)';
            setTimeout(() => { card.style.transform = 'scale(1)'; }, 300);
        },

        generateHearts: function() {
            const container = dom.floatingHearts || document.querySelector('.floating-hearts');
            if (!container) return;

            container.innerHTML = '';
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

            setTimeout(() => { container.innerHTML = ''; }, 10000);
        },

        generateSparkles: function() {
            const container = dom.sparkles || document.querySelector('.sparkles');
            if (!container) return;

            container.innerHTML = '';
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
        },

        generateConfetti: function() {
            const container = document.createElement('div');
            container.className = 'confetti-container';
            container.style.cssText = `
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 10;
                overflow: hidden;
            `;
            dom.quizContent.appendChild(container);

            const colors = ['#ff6b6b', '#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a8a4ff', '#ffffff', '#f97316'];
            const count = 100;

            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const size = 6 + Math.random() * 10;
                const duration = 3 + Math.random() * 4;
                const delay = Math.random() * 2;
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

            setTimeout(() => { container.remove(); }, 8000);
        }
    };

    // ==============================================
    // MODULE: Navigation
    // ==============================================
    const navigator = {
        navigateToNext: function() {
            if (state.isNavigating) return;
            state.isNavigating = true;

            const content = dom.quizContent;
            if (content) {
                content.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.92) translateY(-30px)';
            }

            setTimeout(() => {
                window.location.href = 'page5.html';
            }, 1000);
        }
    };

    // ==============================================
    // MODULE: Event Listeners
    // ==============================================
    const eventManager = {
        init: function() {
            dom.answerBtns.forEach((btn) => {
                btn.addEventListener('click', answerHandler.handleAnswer.bind(answerHandler));
            });

            dom.nextButton.addEventListener('click', function() {
                quizNavigation.nextQuestion();
            });

            dom.prevButton.addEventListener('click', function() {
                quizNavigation.prevQuestion();
            });

            if (dom.continueButton) {
                dom.continueButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.navigateToNext();
                });
            }

            // Direct next page - only works if quiz is complete
            if (dom.directNextPage) {
                dom.directNextPage.addEventListener('click', function(e) {
                    if (!state.quizComplete) {
                        e.preventDefault();
                        alert('Please complete all quiz questions first! ❤️\n\nAnswer all 10 questions and click "See Results" to continue.');
                    }
                });
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight' && !dom.nextButton.classList.contains('hidden')) {
                    dom.nextButton.click();
                }
                if (e.key === 'ArrowLeft' && !dom.prevButton.disabled) {
                    dom.prevButton.click();
                }
            });
        }
    };

    // ==============================================
    // MODULE: Dynamic Animations
    // ==============================================
    const animationInjector = {
        inject: function() {
            const style = document.createElement('style');
            style.id = 'page4-dynamic-animations';
            style.textContent = `
                @keyframes miniHeartFloat {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
                    20% { opacity: 1; transform: translate(calc(-50% + var(--dx) * 0.3), calc(-50% + var(--dy) * 0.3)) scale(1.1); }
                    80% { opacity: 0.8; }
                    100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.5); }
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
        quizRenderer.renderQuestion();
        console.log('💙 Relationship Quiz Loaded!');
        console.log('📊 Answer all 10 questions to see your results!');
        console.log('🎉 On Question 10, click "See Results" to finish!');
    }

    init();

    window.addEventListener('beforeunload', function() {});
});