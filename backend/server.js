const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const bodyParser = require("body-parser");
const path = require("path");


dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/uploads", express.static("uploads"));


app.use("/api/form", formRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
