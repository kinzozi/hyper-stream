class VideoControls {
    constructor(videoPlayer) {
        this.video = videoPlayer;
        this.container = document.querySelector('.player-container');
        this.progressBar = document.querySelector('.progress-bar');
        this.progress = document.querySelector('.progress');
        this.playPauseBtn = document.getElementById('playPause');
        this.rewindBtn = document.getElementById('rewind');
        this.forwardBtn = document.getElementById('forward');
        this.volumeBtn = document.getElementById('volume');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.fullscreenBtn = document.getElementById('fullscreen');
        
        this.setupEventListeners();
        this.setupKeyboardControls();
    }

    setupEventListeners() {
        // Play/Pause
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.video.addEventListener('click', () => this.togglePlay());
        
        // Update play/pause button state
        this.video.addEventListener('play', () => {
            this.playPauseBtn.textContent = '⏸';
        });
        this.video.addEventListener('pause', () => {
            this.playPauseBtn.textContent = '▶';
        });

        // Progress bar
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.progressBar.addEventListener('click', (e) => this.seek(e));

        // Forward/Rewind
        this.rewindBtn.addEventListener('click', () => this.skip(-10));
        this.forwardBtn.addEventListener('click', () => this.skip(10));

        // Volume
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('input', (e) => {
            this.video.volume = e.target.value;
            this.updateVolumeIcon();
        });

        // Fullscreen
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'arrowleft':
                case 'j':
                    this.skip(-10);
                    break;
                case 'arrowright':
                case 'l':
                    this.skip(10);
                    break;
                case 'f':
                    this.toggleFullscreen();
                    break;
                case 'm':
                    this.toggleMute();
                    break;
            }
        });
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    updateProgress() {
        const percentage = (this.video.currentTime / this.video.duration) * 100;
        this.progress.style.width = `${percentage}%`;
    }

    seek(event) {
        const rect = this.progressBar.getBoundingClientRect();
        const pos = (event.clientX - rect.left) / rect.width;
        this.video.currentTime = pos * this.video.duration;
    }

    skip(seconds) {
        this.video.currentTime += seconds;
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateVolumeIcon();
        this.volumeSlider.value = this.video.muted ? 0 : this.video.volume;
    }

    updateVolumeIcon() {
        if (this.video.muted || this.video.volume === 0) {
            this.volumeBtn.textContent = '🔇';
        } else if (this.video.volume < 0.5) {
            this.volumeBtn.textContent = '🔉';
        } else {
            this.volumeBtn.textContent = '🔊';
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize video controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const controls = new VideoControls(videoPlayer);
});