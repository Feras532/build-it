const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const PartRequest = require('../models/PartRequest');

router.post("/register", async (req, res) => {
  const { userName, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!userName || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  // Check if username already exists
  const existingUserByUsername = await User.findOne({ userName: userName });
  if (existingUserByUsername) {
    errors.push({ msg: "Username is already registered" });
  }

  if (errors.length > 0) {
    // Registration errors occurred, set flash message
    req.flash("error", errors[0].msg);
    res.redirect("/login");
  } else {
    // Validation passed
    User.findOne({ email: email.toLowerCase() }).then((user) => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        req.flash("error", errors[0].msg); // Set flash message for this error
        res.redirect("/login");
      } else {
        const newUser = new User({
          userName,
          email,
          password,
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                res.redirect("/login"); // Redirect to login after successful registration
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

router.post("/fetchData", async (req, res) => {
  try {
    const basketString = JSON.stringify(req.body.basket);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: req.body.systemMessageContent,
          },
          {
            role: "user",
            content: basketString,
          },
        ],
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

router.post("/upgrade-data", async (req, res) => {
  try {
    const { systemMessageContent, inputString } = req.body;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: systemMessageContent,
          },
          {
            role: "user",
            content: inputString,
          },
        ],
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching upgrade data:", error);
    res.status(500).send("Error fetching upgrade data");
  }
});

router.delete('/deletePC/:userName/:pcId', async (req, res) => {
  try {
    const { userName, pcId } = req.params;
    // Find the user by username
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Logic to delete the PC configuration from the user's pcConfig array
    await User.updateOne(
      { _id: user._id },
      { $pull: { pcConfig: { _id: pcId } } } // Ensure pcId is cast to the correct type if necessary
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting PC:', error);
    res.status(500).json({ success: false });
  }
});

router.post('/savePC', async (req, res) => {
  const userId = req.user.id;
  const pcConfig = req.body; // The PC configuration object sent from the client

  try {
      const user = await User.findById(userId); // Find the user in the database
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }
      user.pcConfig.push(pcConfig); // Add the PC configuration to the user's document
      await user.save(); // Save the updated user document
      res.json({ success: true });
  } catch (error) {
      console.error('Error in /savePC:', error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post('/request-part', async (req, res) => {
  try {
      // Destructure the request body to get the submitted values
      const { name, email, partDetails } = req.body;

      // Create a new document from the PartRequest model
      const newRequest = new PartRequest({ name, email, partDetails });

      // Save the new part request to the database
      await newRequest.save();

      // Respond with a success message
      res.json({ success: true, message: 'Your request has been submitted successfully.' });
      // res.redirect("/");
  } catch (error) {
      console.error('Failed to submit request:', error);
      res.status(500).json({ success: false, message: 'There was an error processing your request.' });
  }
});

module.exports = router;