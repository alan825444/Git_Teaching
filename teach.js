// const 常數，特性:不能被重新賦值
// 好處: 1.程式碼更安全 2.程式碼更容易閱讀
// #idname .menu-btn
const menuBtn = document.querySelector('.menu-btn');
const container = document.querySelector('.container');
const plusBtn = document.querySelector('.plus-btn');
const readyList = document.querySelector('.ready-wrapper');

// 事件監聽
// addEventListener('click', 函式) = onclick
menuBtn.addEventListener('click', function() {
    container.classList.toggle('active');
})

plusBtn.addEventListener('click', function() {
    container.classList.toggle('plus-active');
})


let playing = false; // 播放狀態
let currentSong = 0; // 目前播放歌曲的索引值
let shuffle = false; // 隨機播放狀態
let repeat = false; // 全曲循環
let repeatOne = false; //單曲循環
const audio = new Audio(); // 建立音樂播放器

// 寫了一個註解
// 寫更多的註解


// 陣列(Array)物件
// 陣列名稱 = [物件1, 物件2, 物件3]
// 物件 = {key1:value1, key2:value2}
// 車子 = {brand:'Toyota', color:'red', price:1000000}
const songs = [
    {
        title: 'mogu',
        artist: 'mogu',
        img_src: '1.jpg',
        src: 'mogu.mp3'
    },
    {
        title: 'capibara',
        artist: 'capibara',
        img_src: '2.jpg',
        src: 'capibara.mp3'
    }
    
]

const readyListSongs = [
    {
        title: 'Devil',
        artist: 'Devil',
        img_src: '3.jpg',
        src: 'DEVIL.mp3'
    },
    {
        title: 'Until the End',
        artist: 'Until the End',
        img_src: '4.jpg',
        src: 'Until_the_End.mp3'
    },
    {
        title: 'YeahYeahYeahOOO',
        artist: 'YeahYeahYeahOOO',
        img_src: '5.jpg',
        src: 'YeahYeahYeahOOO.mp3'
    }
]

const allSongsList = songs.concat(readyListSongs);

// initialize 初始化
function init() {
    updatePlayList(songs);
    updateReadyList(songs,readyListSongs);
    dragInit();
    loadSong(currentSong);
}

const playListContainer = document.querySelector('#playlist');
const infoWrapper = document.querySelector('.info');
const coverImage = document.querySelector('.cover-image');
// const currentSongTitle = document.querySelector('.current-song-title');
const playPauseBtn = document.querySelector('#playpause');
const stopMusic = document.querySelector('#stopMusic');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const prev3secBtn = document.querySelector('#prev3s');
const next3secBtn = document.querySelector('#next3s');

const progressbar = document.querySelector('#progressBar');
const currentTimeEl = document.querySelector('.current-time'); // element
const durationEl = document.querySelector('.duration');

function updatePlayList(songs) {
    // 先將所有存在的元素清除
    playListContainer.innerHTML = '';

    songs.forEach((song, index) => {
        const title = song.title;
        const src = song.src;

        const tr = document.createElement('tr');
        tr.classList.add('song');
        tr.draggable = true;
        tr.innerHTML = `
        <td class="no">
            <h5>${index + 1}</h5>
        </td>
        <td class="title">
            <h6>${title}</h6>
        </td>
        <td class="length">
            <h5>3:00</h5>
        </td>`;

        playListContainer.appendChild(tr);

        const audioForDuration = new Audio(`media/${src}`);
        audioForDuration.addEventListener('loadedmetadata', () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector('.length h5').innerText = songDuration;
        })

        // 20240530完成
        tr.addEventListener('click', () => {
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove('active');
            playPauseBtn.classList.replace('fa-play', 'fa-pause');
            playing = true;
        });
    })
}

const readyListContainer = document.querySelector('#readyList');
const playingListContainer = document.querySelector('#playingList');

function updateReadyList(songs, readyListSongs) {
    let readyContainer = readyListContainer.children[0];
    let playingContainer = playingListContainer.children[0];
    readyContainer.innerHTML = '';
    playingContainer.innerHTML = '';

    readyListSongs.forEach((song, index) => {
        const title = song.title;
        const src = song.src;

        const tr = document.createElement('tr');
        tr.classList.add('dragSong');
        tr.draggable = true;
        tr.innerHTML = `
        <td class="no">
            <i class="fa-solid fa-grip-lines" style="cursor: grab;"></i>
        </td>
        <td class="title">
            <h6>${title}</h6>
        </td>
        <td class="length">
            <h5>3:00</h5>
        </td>`;

        readyContainer.appendChild(tr);

        const audioForDuration = new Audio(`media/${src}`);
        audioForDuration.addEventListener('loadedmetadata', () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector('.length h5').innerText = songDuration;
        })
    })

    songs.forEach((song, index) => {
        const title = song.title;
        const src = song.src;

        const tr = document.createElement('tr');
        tr.classList.add('dragSong');
        tr.draggable = true;
        tr.innerHTML = `
        <td class="no">
            <i class="fa-solid fa-grip-lines" style="cursor: grab;"></i>
        </td>
        <td class="title">
            <h6>${title}</h6>
        </td>
        <td class="length">
            <h5>3:00</h5>
        </td>`;

        playingContainer.appendChild(tr);

        const audioForDuration = new Audio(`media/${src}`);
        audioForDuration.addEventListener('loadedmetadata', () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector('.length h5').innerText = songDuration;
        })
    })
}


function formatTime (time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}


function loadSong(songIndex) {
   infoWrapper.innerHTML = `
    <h2>${songs[songIndex].title}</h2>
    <h3>${songs[songIndex].artist}</h3>
   `

   coverImage.style.backgroundImage = `url('media/${songs[songIndex].img_src}')`;

   progressbar.value = 0;
   audio.src = `media/${songs[songIndex].src}`;
}



nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
prev3secBtn.addEventListener('click', () => changeTime(-5));
next3secBtn.addEventListener('click', () => changeTime(5));
 
playPauseBtn.addEventListener('click', () => {
    if (playing) {
        // replace('舊的class', '新的class')
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
        playing = false;
        audio.pause();
    } else {
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
        playing = true;
        audio.play();
    }
})

stopMusic.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
})

function normalPlay() {
    if ( currentSong < songs.length - 1) {
        currentSong++;
    } else {
        audio.pause();
        playing = false;
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
        return
    }

    loadSong(currentSong);


    if (playing) {
        audio.play();
    }
}

function nextSong() {
    if ( currentSong < songs.length - 1) {
        currentSong++;
    } else {
        currentSong = 0;
    }

    loadSong(currentSong);


    if (playing) {
        audio.play();
    }
}

function prevSong() {
    if (currentSong > 0) {
        currentSong--;
    } else {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    if (playing) {
        audio.play();
    }
}

function changeTime(time) {
    audio.currentTime += time;
}


// 進度條
function progress() {
    let duration = audio.duration;
    let currentTime = audio.currentTime;

    // isNaN() 判斷是否為數字
    isNaN(duration) ? duration = 0 : duration = duration;
    // if (isNaN(duration)) {
    //     duration = duration;
    // } else {
    //     duration = 0;
    // }
    isNaN(currentTime) ? currentTime = 0 : currentTime = currentTime;

    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
    
    console.log(currentTime);
    console.log(duration);
    let progressPercent = (currentTime / duration) * 100;
    isNaN(progressPercent) ? progressPercent = 0 : progressPercent = progressPercent;
    progressbar.value = progressPercent;

}

// timeupdate 事件: 播放時間更新時觸發
audio.addEventListener('timeupdate', progress)


progressbar.addEventListener('input', () => {
    audio.currentTime = progressbar.value * audio.duration / 100;
})

// progressbar.addEventListener('change', () => {
//     console.log("change");
//     audio.currentTime = progressbar.value * audio.duration / 100;
// })

// 播放模式
const repeatBtn = document.querySelector('#repeat');
const shuffleBtn = document.querySelector('#shuffle');
const repeatoneBtn = document.querySelector('#repeatOne');

repeatBtn.addEventListener('click', () => {
    repeat = !repeat;
    shuffle = false;
    repeatOne = false;
    repeatBtn.classList.toggle('active');
    shuffleBtn.classList.remove('active');
    repeatoneBtn.classList.remove('active');
})

shuffleBtn.addEventListener('click', () => {
    shuffle = !shuffle;
    repeat = false;
    repeatOne = false;
    repeatBtn.classList.remove('active');
    shuffleBtn.classList.toggle('active');
    repeatoneBtn.classList.remove('active');
})

repeatoneBtn.addEventListener('click', () => {
    repeatOne = !repeatOne;
    repeat = false;
    shuffle = false;
    repeatBtn.classList.remove('active');
    shuffleBtn.classList.remove('active');
    repeatoneBtn.classList.toggle('active');
})

// ended 事件: 播放結束時觸發
audio.addEventListener('ended', () => {
    if (repeat) {
        nextSong();
    } else if (repeatOne) {
        loadSong(currentSong);
        audio.play();
    } else if (shuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
        loadSong(currentSong);
        audio.play();
    } else {
        normalPlay();
    }
})

// 歌單拖曳
function dragInit () {
    const dragSongs = document.querySelectorAll('.dragSong');
    const readyListArea = document.querySelector('#readyList');
    const playingListArea = document.querySelector('#playingList');
    
    dragSongs.forEach((song, index) => {
        song.addEventListener('dragstart', (e) => {
            let selected = e.target;
            let fromArea = selected.parentNode.parentNode.id
    
            playingListArea.addEventListener('dragover', (e) => {
                e.preventDefault();
            })
    
            playingListArea.addEventListener('drop', (e) => {
                playingListArea.children[0].appendChild(selected);
                selected = null;
            })
    
            readyListArea.addEventListener('dragover', (e) => {
                e.preventDefault();
            })
    
            readyListArea.addEventListener('drop', (e) => {
                readyListArea.children[0].appendChild(selected);
                selected = null;
            })
        })
    })
}

const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', refreshSongs);

function refreshSongs() {
    const readyList = document.querySelector('#playingList').querySelectorAll('.dragSong');
    const newSongs = [];
    const newReadySongs = [];
    readyList.forEach((item, index) => {
        const songTitile = item.querySelector('.title h6').innerText;
        // const song = allSongsList.find((song) => song.title === songTitile);
        for (let i = 0; i < allSongsList.length; i++) {
            if (allSongsList[i].title === songTitile) {
                newSongs.push(allSongsList[i]);
            }
        }
    })
    allSongsList.forEach((song, index) => {
        if (!newSongs.includes(song)) {
            newReadySongs.push(song);
        }
    })

    // 將songs清空
    songs.length = 0;
    readyListSongs.length = 0;
    console.log(newSongs);
    newSongs.forEach((song, index) => {
        songs.push(song);
    })
    newReadySongs.forEach((song, index) => {
        readyListSongs.push(song);
    })

    currentSong = 0;
    playing = false;

    updatePlayList(songs);
    updateReadyList(songs,readyListSongs);
    dragInit();
    container.classList.remove('plus-active');
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
    audio.pause();
    loadSong(currentSong);
}



init();
