let currentPin = '';
        const correctPin = '6161';
        const maxLength = 4;
        const pinDots = document.querySelectorAll('.pin-dot');
        const container = document.querySelector('.container');
        let wrongCount = 0; // đếm số lần nhập sai
    
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
        // Set flag để auto play music trên index1.html
        localStorage.setItem('autoPlayMusic', '1');
        window.location.href = 'index10.html';
    } else {
        wrongCount++; // tăng số lần nhập sai
        let message = '';

        if (wrongCount === 1) {
            message = '💕em nhập sai 3 lần là được💗^^';
        } else if (wrongCount === 2) {
            message = '💕Chúc mừng sinh nhật nguoidepgainhat thegioi💕';
        } else if (wrongCount == 3) {
            message = '💗xinh vay chac la co bi kip rieng nhi💗 ';
        } else if (wrongCount >=4 ) {
            message = '💗pass :6161💗';
        }

        alert(message);
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
// Tạo trái tim rơi
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💗";

    // Random vị trí ngang
    heart.style.left = Math.random() * 100 + "vw";

    // Random kích thước
    heart.style.fontSize = (18 + Math.random() * 18) + "px";

    // Random thời gian rơi
    heart.style.animationDuration = (2.5 + Math.random() * 1.5) + "s";

    document.body.appendChild(heart);

    // Xóa tim sau khi rơi xong
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Tạo liên tục
setInterval(createHeart, 400);
