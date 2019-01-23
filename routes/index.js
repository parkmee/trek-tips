import path from "path";
import express from "express";
import apiRoutes from "./api";

const router = express.Router();

// API Routes
router.use("/api", apiRoutes);

/* router.use((req, res) => {
  res.sendFile(path.join(__dirname, "not sure what to put here"))
}) */

module.exports = router;