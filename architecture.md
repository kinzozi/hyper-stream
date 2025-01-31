# Torrent Player Architecture

## Overview
A lightweight video player application for playing MP4 files from torrents with subtitle support, designed for performance and simplicity.

## Core Components

### 1. Video Player Module
- HTML5 video element as the base player
- Custom controls overlay for better UX
- WebVTT subtitle support
- Keyboard shortcuts for common actions

### 2. Torrent Handler
- WebTorrent integration for torrent processing
- Stream management for efficient playback
- File type validation (MP4)
- Download progress tracking

### 3. Subtitle Manager
- Support for common subtitle formats (.srt, .vtt)
- Auto-conversion to WebVTT format
- Subtitle track selection interface
- Timing synchronization with video

### 4. User Interface
- Minimal, clean design
- Custom video controls:
  - Play/Pause toggle
  - 10s forward/backward buttons
  - Progress bar with seek functionality
  - Volume control
  - Subtitle track selector
  - Fullscreen toggle

## Technical Stack

### Frontend
- HTML5 for video playback
- Vanilla JavaScript for lightweight performance
- CSS3 for styling and animations
- WebTorrent.js for torrent handling

### Libraries
- WebTorrent (torrent handling)
- subtitle.js (subtitle format conversion)

## Performance Considerations
- Lazy loading of non-essential components
- Efficient memory management
- Stream-based playback to minimize initial load time
- Hardware acceleration when available

## File Structure
```
/
├── index.html           # Main application entry
├── styles/
│   └── main.css        # Core styles
├── js/
│   ├── player.js       # Video player implementation
│   ├── torrent.js      # Torrent handling logic
│   ├── subtitles.js    # Subtitle processing
│   └── controls.js     # Custom controls logic
└── assets/
    └── icons/          # UI icons
```

## Implementation Notes
1. Use HTML5 video API for core playback functionality
2. Implement custom controls for better UX
3. Handle subtitle track loading and synchronization
4. Ensure efficient torrent streaming
5. Maintain VLC-like performance through minimal dependencies