const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const rootRouter = require("./routes/router");

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_ATLASS_URL)
  .then(() => console.log("connected to db successfully"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>homepage</h1>");
});

app.use("/api", rootRouter);

app.listen(port, () => console.log(`app running at port:${port}`));
