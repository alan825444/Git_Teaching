const menuBtn = document.querySelector('.menu-btn');
const container = document.querySelector('.container');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playpause');


let shuffle = false; // 隨機播放狀態
let repeat = false; // 重複播放狀態
const playList = []; // 播放清單

menuBtn.addEventListener('click', () => {
    container.classList.toggle('active');
});



function musicPlay() {
    audio.play();
    playBtn.onclick = musicPause;
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
}

function musicPause() {
    audio.pause();
    playBtn.onclick = musicPlay;
    playBtn.classList.add('fa-play');
    playBtn.classList.remove('fa-pause');
}  

