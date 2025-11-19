// Create floating hearts
        function createFloatingHearts() {
            const heartsContainer = document.querySelector('.floating-hearts');
            const heartSymbols = ['♡', '♥', '💗'];
            
            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 6 + 's';
                heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
                heartsContainer.appendChild(heart);
            }
        }
        
        function sendMessage() {
            const button = document.querySelector('.send-button');
            const originalText = button.innerHTML;
            
            button.innerHTML = 'Anh biết mà ♡';
            button.style.background = 'linear-gradient(135deg, #ff8fab, #ff6b9d)';
        }
        
        function createHeartExplosion() {
            const button = document.querySelector('.send-button');
            const rect = button.getBoundingClientRect();
            
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.innerHTML = '♡';
                heart.style.position = 'fixed';
                heart.style.left = rect.left + rect.width/2 + 'px';
                heart.style.top = rect.top + rect.height/2 + 'px';
                heart.style.color = '#ff6b9d';
                heart.style.fontSize = '20px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                
                document.body.appendChild(heart);
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = 50 + Math.random() * 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let posX = rect.left + rect.width/2;
                let posY = rect.top + rect.height/2;
                let opacity = 1;
                
                const animate = () => {
                    posX += vx * 0.1;
                    posY += vy * 0.1 + 2;
                    opacity -= 0.02;
                    
                    heart.style.left = posX + 'px';
                    heart.style.top = posY + 'px';
                    heart.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        heart.remove();
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }

                document.addEventListener('DOMContentLoaded', function() {
                    createFloatingHearts();
                    document.getElementById('backToHome').onclick = function() {
                        window.location.href = 'index10.html';
                    };

                    var audio = document.getElementById('myAudio');
                    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (localStorage.getItem('autoPlayMusic') === '1') {
                        if (isMobile) {
                            var playOnTouch = function() {
                                audio.play();
                                window.removeEventListener('touchstart', playOnTouch);
                                localStorage.removeItem('autoPlayMusic');
                            };
                            window.addEventListener('touchstart', playOnTouch);
                        } else {
                            audio.play();
                            localStorage.removeItem('autoPlayMusic');
                        }
                    }
                });
        
        document.addEventListener('mousemove', function(e) {
            if (Math.random() < 0.1) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '♥';
                sparkle.style.position = 'fixed';
                sparkle.style.left = e.pageX + 'px';
                sparkle.style.top = e.pageY + 'px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.fontSize = '12px';
                sparkle.style.zIndex = '999';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0% { opacity: 1; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1) rotate(180deg); }
                100% { opacity: 0; transform: scale(0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);