const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
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
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Server now running on port ${PORT}`));