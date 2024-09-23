# 🎬 Local Video Streamer

## 📝 Description

Local Video Streamer is a Next.js-based web application designed to serve and stream video files from your laptop over your local network. This project allows you to easily access and watch your personal movie collection from any device connected to your home network.

## ✨ Features

- 🗂 Browse and select videos from your local collection
- 📺 Stream videos directly in the browser
- ℹ️ Display video metadata (file size, last modified date)
- 🖱 Simple and intuitive user interface
- 📱 Responsive design for various screen sizes

## 🛠 Prerequisites

- 📦 Node.js (v14 or later recommended)
- 📦 npm (comes with Node.js)
- 🎥 A collection of video files (.mp4, .webm, .ogg, .mkv supported)

## 🚀 Installation

1. Clone this repository or download the source code:
   ```
   git clone https://github.com/dev-sandip/local-video-streamer.git
   cd local-video-streamer
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Place your video files in the `public/videos` directory of the project.

## 🏃‍♂️ Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open a web browser and navigate to `http://localhost:3000` (or the appropriate local IP address if accessing from another device on the network).

3. Use the dropdown menu to select and play videos from your collection.

## 🌐 Accessing Over the Network

To access the video streamer from other devices on your local network:

1. Find your computer's local IP address (e.g., 192.168.1.100).
2. On the other device, open a web browser and go to `http://[YOUR_IP_ADDRESS]:3000` (replace [YOUR_IP_ADDRESS] with your actual IP address).

Note: Ensure that your firewall settings allow incoming connections on port 3000, or whichever port you've configured for the Next.js server.

## 🎨 Customization

- To change the supported video formats, modify the file extension filter in `app/api/videos/route.ts`.
- To customize the appearance, edit the React components in `app/components/LocalVideoPlayerComponent.tsx`.

## 🔒 Security Considerations

This application is designed for use on a trusted local network. It does not include authentication or encryption features. Do not expose this server directly to the internet without implementing proper security measures.

## 🤝 Contributing

Contributions to improve Local Video Streamer are welcome. Please feel free to submit pull requests or create issues for bugs and feature requests.

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)