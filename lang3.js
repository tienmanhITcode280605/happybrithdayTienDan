document.addEventListener('DOMContentLoaded', function () {
            var developBtn = document.querySelector('.js-develop-button');
            var photoDiv = document.querySelector('.js-photo');
            var video = document.getElementById('polaroidVideo');
            developBtn.addEventListener('click', function () {
                photoDiv.style.display = 'none';
                video.style.display = 'block';
                video.currentTime = 0;
                video.play();
            });
            // Nút ← quay về index1.html
            var resetBtn = document.querySelector('.js-reset-button');
            resetBtn.addEventListener('click', function () {
                window.location.href = 'index1.html';
            });
        });