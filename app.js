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
const User = require("./models/User")
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

// Creating a Handlebars instance with the json helper
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
      json: function (context) {
          return JSON.stringify(context);
      }
  }
});

//handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.get('/public/assets/part_dataset/:part', (req, res) =>{
  const { part } = req.params;
  let jsonpath = `public/assets/part_dataset/${part}`
  res.sendFile(path.join(__dirname, jsonpath))
})

const examplePC = {
  totalPrice: "1500",
  CPU: {
    brand: "Intel",
    model: "Core i7-10700K",
    price: "340"
  },
  GPU: {
    brand: "NVIDIA",
    model: "GeForce RTX 3070",
    price: "500"
  },
  MotherBoard: {
    brand: "ASUS",
    model: "ROG Strix Z490-E Gaming",
    price: "250"
  },
  Case: {
    brand: "NZXT",
    model: "H510",
    price: "70"
  },
  Rams: {
    brand: "Corsair",
    model: "Vengeance LPX 16GB",
    price: "80"
  },
  SSD: {
    brand: "Samsung",
    model: "970 EVO Plus 1TB",
    price: "150"
  },
  HDD: {
    brand: "Seagate",
    model: "Barracuda 2TB",
    price: "50"
  },
  M2: {
    brand: "Western Digital",
    model: "Blue SN550 1TB",
    price: "100"
  },
  PSU: {
    brand: "Corsair",
    model: "RM750x",
    price: "110"
  }
};

// addPCConfigurationToUser('656720910d50adaea327fd11',examplePC)

// addPCConfigurationToUser('656720910d50adaea327fd11',examplePC)

// addPCConfigurationToUser('656720910d50adaea327fd11',examplePC)

// // Function to add PC configuration to a user's profile
// async function addPCConfigurationToUser(userId, pcConfig) {
//   try {
//       const user = await User.findById(userId);
//       if (user) {
//           user.pcConfig.push(pcConfig);
//           await user.save();
//           console.log('PC configuration added successfully.');
//       } else {
//           console.log('User not found.');
//       }
//   } catch (error) {
//       console.error('Error adding PC configuration:', error);
//   }
// }

// module.exports = User;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
