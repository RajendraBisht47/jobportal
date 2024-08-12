import { Router } from "express";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/company.js";
import authentication from "../middlewares/authentication.js";
const router = Router();

router.post("/register", authentication, (req, res) => {
  registerCompany(req, res);
});
router.get("/get", authentication, (req, res) => {
  getCompany(req, res);
});
router.get("/get/:id", authentication, (req, res) => {
  getCompanyById(req, res);
});
router.put("/update/:id", authentication, (req, res) => {
  updateCompany(req, res);
});

export default router;
