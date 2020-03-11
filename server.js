const express = require("express");
const app = express();
const connectDb = require("./config/db");
const users = require("./route/api/users");
const auth = require("./route/api/auth");
const posts = require("./route/api/posts");
const profile = require("./route/api/profile");
const consultant = require("./route/api/consultant");

connectDb();
// Init BodyParsr
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/consultant", consultant);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
