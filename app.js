const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");

// Load config
dotenv.config({ path: "config/config.env" });

connectDB();
connectDB({ serverSelectionTimeoutMS: 30000 }); // Increase timeout to 30 seconds

// Passport config
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB connection string here
    }),
  })
);

// Initialize connect-flash
app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./controller/auth"));

//handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get('/public/assets/part_dataset/:part', (req, res) =>{
  const { part } = req.params;
  let jsonpath = `public/assets/part_dataset/${part}`
  res.sendFile(path.join(__dirname, jsonpath))
})

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
