import { Router } from "express";
import authentication from "../middlewares/authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJob,
  updateStatus,
} from "../controllers/application.js";
const router = Router();

router.post("/apply/:id", authentication, (req, res) => {
  applyJob(req, res);
});
router.get("/get", authentication, (req, res) => {
  getAppliedJob(req, res);
});
router.get("/:id/applicants", authentication, (req, res) => {
  getApplicants(req, res);
});
router.put("/status/:id/update", authentication, (req, res) => {
  updateStatus(req, res);
});
export default router;
