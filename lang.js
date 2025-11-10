let currentPin = '';
        const correctPin = '2008';
        const maxLength = 4;
        const pinDots = document.querySelectorAll('.pin-dot');
        const container = document.querySelector('.container');
    
        function updateDisplay() {
            pinDots.forEach((dot, index) => {
                if (index < currentPin.length) {
                    dot.classList.add('filled');
                } else {
                    dot.classList.remove('filled');
                }
            });
        }
        function addDigit(digit) {
            if (currentPin.length < maxLength) {
                currentPin += digit;
                updateDisplay();
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                if (currentPin.length === maxLength) {
                    setTimeout(checkPin, 200);
                }
            }
        }
        function deleteDigit() {
            if (currentPin.length > 0) {
                currentPin = currentPin.slice(0, -1);
                updateDisplay();
            }
        }
        function checkPin() {
            if (currentPin === correctPin) {
                // Set flag to auto play music on in1.html
                localStorage.setItem('autoPlayMusic', '1');
                window.location.href = 'index1.html';
            } else {
                alert('sai rồi Tiên Đan ơi ^^') ;
                container.classList.add('shake');
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                setTimeout(() => {
                    container.classList.remove('shake');
                    currentPin = '';
                    updateDisplay();
                }, 1000);
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                addDigit(e.key);
            } else if (e.key === 'Backspace') {
                deleteDigit();
            } else if (e.key === 'Enter' && currentPin.length === maxLength) {
                checkPin();
            }
        });

        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);