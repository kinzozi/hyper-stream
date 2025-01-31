class SubtitleManager {
    constructor(videoPlayer) {
        this.videoPlayer = videoPlayer;
        this.track = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const subtitleInput = document.getElementById('subtitleInput');
        const subtitleToggle = document.getElementById('subtitleToggle');

        subtitleToggle.addEventListener('click', () => {
            subtitleInput.click();
        });

        subtitleInput.addEventListener('change', (e) => {
            this.loadSubtitleFile(e.target.files[0]);
        });
    }

    loadSubtitleFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const extension = file.name.split('.').pop().toLowerCase();
            
            if (extension === 'srt') {
                // Convert SRT to WebVTT
                const srtContent = e.target.result;
                const vttContent = this.convertSrtToVtt(srtContent);
                this.createSubtitleTrack(vttContent);
            } else if (extension === 'vtt') {
                // Use WebVTT directly
                this.createSubtitleTrack(e.target.result);
            }
        };
        reader.readAsText(file);
    }

    convertSrtToVtt(srtContent) {
        // Add WebVTT header
        let vttContent = 'WEBVTT\n\n';

        // Convert SRT timestamps to WebVTT format
        const converted = srtContent
            .replace(/\r/g, '')
            .replace(/^\d+\n/gm, '')  // Remove subtitle numbers
            .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2')  // Replace comma with dot in timestamps
            .replace(/\n\n\n/g, '\n\n');  // Fix spacing

        return vttContent + converted;
    }

    createSubtitleTrack(content) {
        // Remove existing track if any
        if (this.track) {
            this.videoPlayer.removeChild(this.track);
        }

        // Create blob URL for the subtitle content
        const blob = new Blob([content], { type: 'text/vtt' });
        const subtitleUrl = URL.createObjectURL(blob);

        // Create and add the new track
        this.track = document.createElement('track');
        this.track.kind = 'subtitles';
        this.track.label = 'Custom Subtitles';
        this.track.srclang = 'en';
        this.track.src = subtitleUrl;
        this.track.default = true;

        this.videoPlayer.appendChild(this.track);

        // Clean up the URL when the video is unloaded
        this.videoPlayer.addEventListener('emptied', () => {
            URL.revokeObjectURL(subtitleUrl);
        }, { once: true });

        // Enable subtitles
        const tracks = this.videoPlayer.textTracks;
        if (tracks.length > 0) {
            tracks[tracks.length - 1].mode = 'showing';
        }
    }
}

// Initialize subtitle manager when video player is ready
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const subtitleManager = new SubtitleManager(videoPlayer);
});