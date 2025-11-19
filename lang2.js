// Data management
        let albumPhotos = [];
        let currentFilter = 'all';

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            updateTime();
            initSamplePhotos();
            renderPhotos();
            
            // Update time every minute
            setInterval(updateTime, 60000);
            // Phát nhạc tự động hoặc khi chạm màn hình
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
            } else {
                // Nếu không có biến, vẫn thử phát tự động trên máy tính
                if (!isMobile) {
                    audio.play().catch(()=>{});
                }
            }
        });

        // Update current time
        function updateTime() {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                           now.getMinutes().toString().padStart(2, '0');
            document.getElementById('currentTime').textContent = timeStr;
        }

        // Go back function
        function goBack() {
            window.location.href = 'index10.html';
        }

        // Save photos to localStorage
        function savePhotos() {
            localStorage.setItem('loveAlbumPhotos', JSON.stringify(albumPhotos));
        }

        // Render photos grid
        function renderPhotos() {
            const grid = document.getElementById('photosGrid');
            const emptyState = document.getElementById('emptyState');
            const container = document.getElementById('photosContainer');

            // Filter photos based on current filter
            let filteredPhotos = albumPhotos;
            switch(currentFilter) {
                case 'favorite':
                    filteredPhotos = albumPhotos.filter(photo => photo.favorite);
                    break;
                case 'recent':
                    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
                    filteredPhotos = albumPhotos.filter(photo => photo.timestamp > weekAgo);
                    break;
                case 'memory':
                    filteredPhotos = albumPhotos.filter(photo => photo.category === 'memory');
                    break;
            }

            document.getElementById('totalPhotos').textContent = albumPhotos.length;

            if (filteredPhotos.length === 0) {
                emptyState.style.display = 'block';
                grid.style.display = 'none';
                return;
            }

            emptyState.style.display = 'none';
            grid.style.display = 'flex';
            grid.style.overflowX = 'auto';
            grid.style.gap = '16px';
            grid.innerHTML = '';

            filteredPhotos.forEach((photo, index) => {
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo-item';
                photoDiv.style.minWidth = photo.ratio === 'portrait' ? '120px' : (photo.ratio === 'square' ? '220px' : '320px');
                photoDiv.style.height = '220px';
                photoDiv.style.flex = '0 0 auto';
                photoDiv.innerHTML = `
                    <img src="${photo.src}" alt="Memory ${index + 1}" style="width:100%;height:100%;object-fit:cover;" onclick="openPhotoModal('${photo.id}')">
                    <div class="photo-date">${photo.date}</div>
                    <div class="photo-actions">
                        <button class="action-btn heart ${photo.favorite ? 'active' : ''}" 
                                onclick="toggleFavorite('${photo.id}')" 
                                title="${photo.favorite ? 'Bỏ yêu thích' : 'Yêu thích'}">
                            ${photo.favorite ? '❤️' : '🤍'}
                        </button>
                        <button class="action-btn delete" 
                                onclick="deletePhoto('${photo.id}')" 
                                title="Xóa ảnh">
                            🗑️
                        </button>
                    </div>
                `;
                grid.appendChild(photoDiv);
            });
        }

        // Filter photos by category
        function filterPhotos(category) {
            currentFilter = category;
            
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            renderPhotos();
        }

        // Toggle favorite status
        function toggleFavorite(photoId) {
            const photo = albumPhotos.find(p => p.id == photoId);
            if (photo) {
                photo.favorite = !photo.favorite;
                savePhotos();
                renderPhotos();
                
                // Show floating heart if favorited
                if (photo.favorite) {
                    const btn = event.target;
                    showFloatingHeart(btn);
                }
            }
        }

        // Delete photo
        function deletePhoto(photoId) {
            if (confirm('Bạn có chắc muốn xóa kỷ niệm này không?')) {
                albumPhotos = albumPhotos.filter(photo => photo.id != photoId);
                savePhotos();
                renderPhotos();
            }
        }

        // Open photo modal
        function openPhotoModal(photoId) {
            const photo = albumPhotos.find(p => p.id == photoId);
            if (photo) {
                document.getElementById('modalPhoto').src = photo.src;
                document.getElementById('modalDate').textContent = photo.date;
                document.getElementById('photoModal').classList.add('active');
            }
        }

        // Close photo modal
        function closePhotoModal() {
            document.getElementById('photoModal').classList.remove('active');
        }

        // Show floating heart animation
        function showFloatingHeart(element) {
            const rect = element.getBoundingClientRect();
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '❤️';
            heart.style.left = rect.left + rect.width/2 + 'px';
            heart.style.top = rect.top + 'px';
            heart.style.position = 'fixed';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }

    
        document.getElementById('photoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closePhotoModal();
            }
        });

        // Handle keyboard events
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePhotoModal();
            }
        });

         document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('backToHome').onclick = function() {
          window.location.href = 'index1.html';
        };
      });

      document.addEventListener('DOMContentLoaded', function() {
            var photoList = Array.from(document.querySelectorAll('.photo-item img'));
            var currentIndex = -1;
            var modal = document.getElementById('photoModal');
            var modalImg = document.getElementById('modalPhoto');
            var modalDate = document.getElementById('modalDate');

            // Xử lý click vào ảnh bất kỳ để mở modal
            photoList.forEach(function(img, idx) {
                img.addEventListener('click', function() {
                    openPhotoModal(idx);
                });
            });

            // Nút chuyển ảnh
            document.getElementById('prevPhotoBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentIndex > 0) {
                    openPhotoModal(currentIndex - 1);
                }
            });
            document.getElementById('nextPhotoBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentIndex < photoList.length - 1) {
                    openPhotoModal(currentIndex + 1);
                }
            });

            // Đóng modal khi click ra ngoài hoặc nhấn ESC
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closePhotoModal();
                }
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closePhotoModal();
                }
                if (e.key === 'ArrowLeft' && currentIndex > 0 && modal.classList.contains('active')) {
                    openPhotoModal(currentIndex - 1);
                }
                if (e.key === 'ArrowRight' && currentIndex < photoList.length - 1 && modal.classList.contains('active')) {
                    openPhotoModal(currentIndex + 1);
                }
            });

            // Xử lý vuốt trái/phải trên mobile
            let touchStartX = null;
            modalImg.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                }
            });
            modalImg.addEventListener('touchend', function(e) {
                if (touchStartX !== null && e.changedTouches.length === 1) {
                    let touchEndX = e.changedTouches[0].clientX;
                    let dx = touchEndX - touchStartX;
                    if (Math.abs(dx) > 50) {
                        if (dx < 0 && currentIndex < photoList.length - 1) {
                            openPhotoModal(currentIndex + 1);
                        } else if (dx > 0 && currentIndex > 0) {
                            openPhotoModal(currentIndex - 1);
                        }
                    }
                    touchStartX = null;
                }
            });

            function openPhotoModal(idx) {
                currentIndex = idx;
                modalImg.src = photoList[idx].src;
                modalDate.textContent = photoList[idx].alt;
                modal.classList.add('active');
            }

            window.closePhotoModal = function() {
                modal.classList.remove('active');
                currentIndex = -1;
            }
        });