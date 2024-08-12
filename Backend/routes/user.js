import { Router } from "express";
import { login, register, updateprofile, logout } from "../controllers/user.js";
const router = Router();
import authentication from "../middlewares/authentication.js";

router.post("/register", (req, res) => {
  register(req, res);
});
router.post("/login", (req, res) => {
  login(req, res);
});
router.put("/profile/update", authentication, (req, res) => {
  updateprofile(req, res);
});
router.post("/logout", (req, res) => {
  logout(req, res);
});

export default router;
