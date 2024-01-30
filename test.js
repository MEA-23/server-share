import express from "express";
const app = express();

app.listen(3000, "192.168.161.237", () => {
  console.log("Server is running on port 3000");
});
