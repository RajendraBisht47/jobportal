import { Router } from "express";
import authentication from "../middlewares/authentication.js";
import {
  getAdminJobs,
  postJob,
  getAlllJobs,
  getJobById,
} from "../controllers/job.js";
const router = Router();

router.post("/post", authentication, (req, res) => {
  postJob(req, res);
});
router.get("/get", (req, res) => {
  getAlllJobs(req, res);
});
router.get("/getadminjobs", authentication, (req, res) => {
  getAdminJobs(req, res);
});
router.get("/get/:id", authentication, (req, res) => {
  getJobById(req, res);
});

export default router;
