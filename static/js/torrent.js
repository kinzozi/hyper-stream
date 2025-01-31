class TorrentHandler {
    constructor() {
        this.client = new WebTorrent();
        this.videoPlayer = document.getElementById('videoPlayer');
        this.setupEventListeners();
    }

    setupEventListeners() {
        const fileInput = document.getElementById('torrentInput');
        const dropZone = document.querySelector('.file-input');

        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Setup drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.style.borderColor = '#666';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = '#444';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.style.borderColor = '#444';
            
            const files = e.dataTransfer.files;
            if (files.length) {
                this.handleFileSelect({ target: { files } });
            }
        });
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check for torrent files
        if (file.name.endsWith('.torrent')) {
            this.loadTorrent(file);
            return;
        }

        // Check for MP4 files - handle both MIME type and extension
        if (file.type.includes('video/mp4') || file.name.toLowerCase().endsWith('.mp4')) {
            this.loadDirectVideo(file);
            return;
        }

        alert('Please select a torrent file or MP4 video');
    }

    loadTorrent(torrentFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.client.add(e.target.result, (torrent) => {
                // Find the largest file (assuming it's the video)
                const file = torrent.files.reduce((a, b) => 
                    a.length > b.length ? a : b
                );

                // Only proceed if it's an MP4
                if (!file.name.endsWith('.mp4')) {
                    alert('No MP4 video found in torrent');
                    return;
                }

                // Stream to video player
                file.streamTo(this.videoPlayer);
                
                // Update download progress
                torrent.on('download', () => {
                    const progress = (torrent.progress * 100).toFixed(1);
                    console.log(`Download progress: ${progress}%`);
                });
            });
        };
        reader.readAsArrayBuffer(torrentFile);
    }

    loadDirectVideo(file) {
        if (!file.type.includes('video/mp4') && !file.name.toLowerCase().endsWith('.mp4')) {
            alert('Please select an MP4 video file');
            return;
        }

        try {
            const url = URL.createObjectURL(file);
            this.videoPlayer.src = url;
            
            // Start playing when ready
            this.videoPlayer.onloadeddata = () => {
                this.videoPlayer.play().catch(e => console.error('Playback failed:', e));
            };

            // Clean up the URL when the video is unloaded
            this.videoPlayer.onended = () => {
                URL.revokeObjectURL(url);
            };
        } catch (error) {
            console.error('Error loading video:', error);
            alert('Error loading video file');
        }
    }

    destroy() {
        if (this.client) {
            this.client.destroy();
        }
    }
}

// Initialize torrent handler
const torrentHandler = new TorrentHandler();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    torrentHandler.destroy();
});