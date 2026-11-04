const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  {
    name: "Dil Dhadakne Do",
    artist: "Artist 1",
    src: "songs/Dil Dhadakne Do.mp3",
  },
  { name: "Hai Junoon", artist: "K.K.", src: "songs/Hai Junoon.mp3" },
  {
    name: "Show Me Love",
    artist: "WizTheMc, Tyla, Bees & Honey ",
    src: "songs/Show Me Love.mp3",
  },
];
let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  title.textContent = songs[index].name;
  artist.textContent = songs[index].artist;
  audio.src = songs[index].src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "⏸️";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
  isPlaying = false;
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${minutes}:${sec.toString().padStart(2, "0")}`;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

loadSong(songIndex);
