import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import os from "os";

const app = express();
app.use(cors());

let directory = "";

// Process command line arguments to get directory path
const input = process.argv[2];
if (input) {
  try {
    if (!fs.existsSync(input)) {
      console.error(`Directory ${input} does not exist.`);
      process.exit(1);
    }
    directory = path.resolve(input);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
} else {
  const defaultPublicDir = "./public";
  if (!fs.existsSync(defaultPublicDir)) {
    fs.mkdirSync(defaultPublicDir);
    console.log(`Created ${defaultPublicDir} directory.`);
  }
  directory = path.resolve(defaultPublicDir);
}

app.use(express.static(directory));

function formatSize(size) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${units[i]}`;
}

app.get("/", (req, res) => {
  const files = fs.readdirSync(directory);
  let content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Files Available for Download</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .file-info {
          display: flex;
          align-items: center;
        }
        .file-name {
          margin-right: 10px;
        }
        .file-size {
          font-size: 0.9em;
          color: #666;
        }
        a {
          padding: 10px;
          background-color: #f0f0f0;
          text-decoration: none;
          color: #333;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Files Available for Download</h1>
        <ul>
  `;

  if (files.length === 0) {
    content += `<li>No files available for download in ${directory}</li>`;
  } else {
    files.forEach((file) => {
      const stats = fs.statSync(path.join(directory, file));
      const fileSize = formatSize(stats.size);
      content += `
        <li>
          <div class="file-info">
            <div class="file-name">${file}</div>
            <div class="file-size">${fileSize}</div>
          </div>
          <a href="${file}">Click to Download</a>
        </li>`;
    });
  }

  content += `
        </ul>
      </div>
    </body>
    </html>
  `;

  res.send(content);
});

const PORT = 3000;
// Function to check if LAN connection is available
function hasLANConnection() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaceInfo = networkInterfaces[interfaceName];
    for (const iface of interfaceInfo) {
      if (iface.family === "IPv4" && !iface.internal) {
        // If any non-internal IPv4 interface is found, assume LAN connection available
        return true;
      }
    }
  }
  return false;
}

let ipAddress;

// Check if LAN connection is available
if (hasLANConnection()) {
  // If LAN connection available, use the LAN IP address
  ipAddress = getLocalIpAddress();
} else {
  // If LAN connection not available, use WiFi IP address
  ipAddress = getWifiIpAddress();
}

if (ipAddress) {
  app.listen(PORT, ipAddress, () => {
    console.log(`Server started on http://${ipAddress}:${PORT}`);
  });
} else {
  console.error("You are not connected to any network.");
}

// Function to get LAN IP address
function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaceInfo = networkInterfaces[interfaceName];
    for (const iface of interfaceInfo) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

// Function to get WiFi IP address
function getWifiIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaceInfo = networkInterfaces[interfaceName];
    for (const iface of interfaceInfo) {
      if (
        iface.family === "IPv4" &&
        iface.internal === false &&
        interfaceName.toLowerCase().includes("wlan")
      ) {
        return iface.address;
      }
    }
  }
  return null;
}
