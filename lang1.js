function toggleMenu() {
    menuOpen = !menuOpen;
    dropdown.classList.toggle('active', menuOpen);
    overlay.classList.toggle('active', menuOpen);
    const lines = hamburger.querySelectorAll('.menu-line');
    if (menuOpen){
      lines[0].style.transform = 'rotate(45deg) translate(6px,6px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(6px,-6px)';
    } else {
      lines[0].style.transform = lines[2].style.transform = 'none';
      lines[1].style.opacity = '1';
    }
  }
  hamburger.onclick = toggleMenu;
  overlay.onclick   = toggleMenu;
  dropdown.querySelectorAll('.menu-item').forEach(it=>{
    it.onclick = () => {
      const k = it.dataset.k;
      if (k === 'album') {
        document.querySelector('.screen').style.transform = 'translateX(-100%)';
        document.querySelector('.screen').style.transition = 'transform 0.3s ease';
        setTimeout(() => {
          window.location.href = 'index2.html';
        }, 300);
        return;
      }
      toast('Đã chọn: ' + k);
      toggleMenu();
    };
  });
  likeBtn.onclick = () => {
    liked = !liked;
    likes += liked ? 1 : -1;
    localStorage.setItem('liked', JSON.stringify(liked));
    localStorage.setItem('likes', String(likes));
    renderLike();
    floatingHeart();
  };


document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem('autoPlayMusic') === '1') {
    var audio = document.getElementById("myAudio");
    function playMusicOnce() {
      if (audio && audio.paused) {
        audio.play().catch(()=>{});
      }
      document.removeEventListener('touchstart', playMusicOnce);
      document.removeEventListener('mousedown', playMusicOnce);
    }
  document.body.addEventListener('touchstart', playMusicOnce);
  document.body.addEventListener('mousedown', playMusicOnce);
  console.log('Music play handler attached. Tap/click anywhere to play.');
    localStorage.removeItem('autoPlayMusic');
  }
});
