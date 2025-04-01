const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
require("./models/associations");
const routes = require("./routes/index");
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === "production",  
      httpOnly: true, 
      maxAge: 3600000,
    }
  })
);

app.use("/api", routes);

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Database sync failed:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Book Buying Website API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
