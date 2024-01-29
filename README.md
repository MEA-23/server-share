# server-share

Welcome to the File Server project! This application allows you to easily set up a local file server to share files over your network. Below you'll find instructions on how to set up and use the server correctly.

### How It Works

The File Server is built using Node.js and Express.js framework. It serves files from a specified directory and provides a simple web interface to view and download these files. Here's a breakdown of its functionality:

1. **Server Setup**: The server listens on port 3000 by default. It automatically detects your local IP address to make accessing the server convenient on your local network.

2. **File Serving**: Upon starting the server, it serves files from a specified directory. If no directory is provided, it defaults to serving files from a `public` directory in the project root.

3. **Web Interface**: Accessing the server via a web browser presents a list of files available for download. Each file is listed with its name and size, and clicking on a file initiates the download.

### Installation and Setup

To get started with the File Server, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Dependencies**: Navigate to the project directory in your terminal and run `npm install` to install the required dependencies.

3. **Run the Server**: Start the server by running `npm start` or `node app.js` in your terminal. Optionally, you can specify a directory to serve files from by providing it as a command-line argument, e.g., `node app.js /path/to/your/directory`.

### Usage

Once the server is running, you can access it from any device connected to your local network:

1. **Accessing the Web Interface**: Open a web browser and enter the URL `http://[localIPAddress]:3000` where `[localIPAddress]` is the IP address of the machine running the server.

2. **Viewing Files**: You'll see a list of files available for download. Click on any file to start downloading it.

3. **Downloading Files**: Simply click on the file name to download it to your device.

### Configuration

If you need to customize the server's behavior, you can do so by modifying the `app.js` file:

- **Changing the Port**: You can modify the `PORT` variable to change the port on which the server listens.
- **Customizing File Serving Directory**: Adjust the `directory` variable to specify the directory from which files should be served.

### Support

If you encounter any issues or have questions about the File Server, feel free to open an issue on GitHub or reach out to mea.xuser23@gmail.com.

### License

This project is licensed under the [License Name] License. See the LICENSE file for details.

Thank you for using the File Server! We hope it simplifies sharing files within your network.
