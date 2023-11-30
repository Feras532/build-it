const express = require("express");
const passport = require("passport");
const router = express.Router();

const authMiddleware = {
  ensureAuth: function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("errors", "Login to access another page");
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
  isAuthed: function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  },
  checkAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // User is authenticated
      return next();
    } else {
      // User is not authenticated
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
};

module.exports = authMiddleware;
