# Hyper Stream

A minimal and elegant WebTorrent player for Linux, designed for simplicity and performance.

![Hyper Stream - A Simple Torrent Player for Linux]("HYPER STREAM_.png")

## Features

- Clean and modern user interface
- Real-time torrent streaming
- Video playback controls
- Subtitle support
- Lightweight and resource-efficient
- Cross-platform web interface

## Technology Stack

- Backend: Python with Flask
- Frontend: HTML5, CSS3, JavaScript
- Torrent Engine: WebTorrent
- Video Player: HTML5 Video API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kinzozi/hyper-stream.git
cd hyper-stream
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
npm install
```

## Usage

1. Start the application:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Enter a torrent magnet link or hash to start streaming.

## Development

The application structure is organized as follows:

```
hyper-stream/
├── app.py              # Flask application entry point
├── templates/          # HTML templates
├── static/            
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript modules
├── requirements.txt    # Python dependencies
└── package.json       # Node.js dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- WebTorrent team for their excellent torrent client
- Flask community for the robust web framework
- All contributors and users of Hyper Stream
