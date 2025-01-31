class TorrentPlayer {
    constructor() {
        this.videoElement = document.getElementById('videoPlayer');
        this.fileInput = document.querySelector('.file-input');
        this.fileInputText = this.fileInput.querySelector('p');
        this.originalText = this.fileInputText.textContent;
        this.initializePlayer();
    }

    initializePlayer() {
        // Set default video properties
        this.videoElement.preload = 'auto';
        this.videoElement.playsInline = true;

        // Error handling
        this.videoElement.addEventListener('error', (e) => {
            console.error('Video Error:', e);
            this.handleVideoError(e);
            this.updateFileInputState('error');
        });

        // Loading states
        this.videoElement.addEventListener('loadstart', () => {
            this.updateFileInputState('loading');
        });

        this.videoElement.addEventListener('waiting', () => {
            this.fileInputText.textContent = 'Buffering...';
        });

        // Ready states
        this.videoElement.addEventListener('canplay', () => {
            this.updateFileInputState('ready');
        });

        this.videoElement.addEventListener('playing', () => {
            this.fileInput.style.display = 'none';
        });

        // Reset state when video ends
        this.videoElement.addEventListener('ended', () => {
            this.fileInput.style.display = 'block';
            this.updateFileInputState('default');
        });
    }

    updateFileInputState(state) {
        switch (state) {
            case 'loading':
                this.fileInputText.textContent = 'Loading video...';
                this.fileInput.style.borderColor = '#666';
                break;
            case 'ready':
                this.fileInputText.textContent = 'Video ready - Click to play';
                this.fileInput.style.borderColor = '#4CAF50';
                break;
            case 'error':
                this.fileInputText.textContent = 'Error loading video - Click to try again';
                this.fileInput.style.borderColor = '#f44336';
                break;
            default:
                this.fileInputText.textContent = this.originalText;
                this.fileInput.style.borderColor = '#444';
        }
    }

    handleVideoError(error) {
        let message = 'An error occurred while playing the video.';
        
        if (this.videoElement.error) {
            switch (this.videoElement.error.code) {
                case 1:
                    message = 'Video loading aborted';
                    break;
                case 2:
                    message = 'Network error occurred while loading video';
                    break;
                case 3:
                    message = 'Error decoding video';
                    break;
                case 4:
                    message = 'Video format not supported';
                    break;
            }
        }
        
        alert(message);
    }
}

// Initialize the player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.torrentPlayer = new TorrentPlayer();
});