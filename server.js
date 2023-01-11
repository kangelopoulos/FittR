const express = require("express");
const path = require("path");

const app = express();

/**
 * Proper routing for production/development
 */
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../build")));
  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../build/index.html"));
  });
  app.get("/*", (req, res) => {
    return res.status(200).redirect("/");
  });
}

app.listen(PORT, () => console.log(`Server now running on port ${PORT}`));