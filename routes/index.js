const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", {
    layout: "main",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { layout: "main" });
});

router.get("/CreatePC", (req, res) => {
  res.render("createPc", { layout: "main" });
});

module.exports = router;
