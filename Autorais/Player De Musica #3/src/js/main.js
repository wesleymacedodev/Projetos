const musicImage = document.querySelector(".img img")
const musicTitle = document.querySelector(".music")
const musicArtist = document.querySelector(".artist")
const timeBarElement = document.querySelector(".time-bar .bar")
const initialTimeElement = document.querySelector(".time-bar .time .initial")
const endTimeElement = document.querySelector(".time-bar .time .end")
const previousElement = document.querySelector(".controls .previous")
const playElement = document.querySelector(".controls .play-stop i")
const nextElement = document.querySelector(".controls .next")
const volumeBarElement = document.querySelector(".volume .bar")
const volumeMinElement = document.querySelector(".volume .min")
const volumeMaxElement = document.querySelector(".volume .max")
const musicSound = document.createElement("audio")

const playButton = "bi bi-play-fill"
const stopButton = "bi bi-stop-fill"

var index_music = 0
var playing = false
var list = []
var refresh

const musicList = [
        {
            "title":"Metamorphosis",
            "artist":"InterWorld",
            "music_path":"./src/assets/music/metamorphosis-interworld"
        },
        {
            "title":"Rupture",
            "artist":"InterWorld",
            "music_path":"./src/assets/music/rupture-interworld"
        },
        {
            "title":"So High",
            "artist":"Doja Cat",
            "music_path":"./src/assets/music/sohigh-dojacat"
        }
        ]


function musicNext() {
    if (index_music < musicList.length - 1) {index_music++} else {index_music=0}
    musicLoad()
    musicPlay()
}

function musicPrevious() {
    if (index_music == 0) {index_music = musicList.length-1} else {index_music--}
    musicLoad()
    musicPlay()
}

function musicLoad(music=musicList, index=index_music) {
    clearInterval(refresh)
    musicSound.src = `${music[index].music_path}.mp3`
    musicSound.load()

    // volume da musica e barra de controle
    if (musicSound.volume != 0.1) {
        volumeBarElement.value = musicSound.volume * 100
    } else {
        musicSound.volume = 0.1
        volumeBarElement.value = musicSound.volume * 100
    }


    musicTitle.textContent = music[index].title
    musicArtist.textContent = music[index].artist
    musicImage.src = `${music[index].music_path}.png`

    refresh = setInterval(musicUpdateTime,500)

    musicSound.addEventListener("ended", () => {
        musicNext()
    })
}

musicLoad()

function musicProgressBar () {
    let barTime = musicSound.duration * (timeBarElement.value/100)
    musicSound.currentTime = barTime
}

function musicUpdateTime () {
    // Barra de progresso
    let timeBarPosition
    timeBarPosition = musicSound.currentTime * (100/musicSound.duration)
    timeBarElement.value = timeBarPosition
    if (isNaN(timeBarPosition)) {timeBarElement.value = 0}

    // Tempo inicial e final
    let initialMinutes = Math.floor(musicSound.currentTime / 60)
    let initialSeconds = Math.floor(musicSound.currentTime % 60)
    let endMinutes = Math.floor(musicSound.duration / 60)
    let endSeconds = Math.floor(musicSound.duration % 60)
    function format2digit (value) { return (value < 10 ? "0" : "") + value}
    initialTimeElement.textContent = `${format2digit(initialMinutes)}:${format2digit(initialSeconds)}`
    // Quando a musica não retorna a duração
    if (isNaN(musicSound.duration)) {
        endTimeElement.textContent = "00:00"
    } else {
        endTimeElement.textContent = `${format2digit(endMinutes)}:${format2digit(endSeconds)}`
    }
}

function musicVolume () {
    musicSound.volume = volumeBarElement.value/100
}

function musicStatus(status) {
    status ? musicStop() : musicPlay()
}

function musicPlay() {
    musicSound.play()
    playElement.className = stopButton
    playing = true
}

function musicStop () {
    musicSound.pause()
    playElement.className = playButton
    playing = false
}

function musicVolumeMax () {
    musicSound.volume = 1
    volumeBarElement.value = musicSound.volume * 100
}

function musicVolumeMin () {
    musicSound.volume = 0
    volumeBarElement.value = musicSound.volume * 100
}

// Events
playElement.addEventListener("click", () => musicStatus(playing))
nextElement.addEventListener("click", () => musicNext())
previousElement.addEventListener("click", () => musicPrevious())
volumeMaxElement.addEventListener("click", () => musicVolumeMax())
volumeMinElement.addEventListener("click", () => musicVolumeMin())

volumeBarElement.addEventListener("change", () => musicVolume())
timeBarElement.addEventListener("change", () => musicProgressBar())








