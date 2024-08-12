import Job from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill all the requirement",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAlllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company")
      .populate("created_by");
    if (jobs.length == 0) {
      return res.status(404).json({
        message: "Jobs not found",
      });
    }

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "You have not posted any job",
      });
    }

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate("company")
      .populate("created_by");
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    return res.status(200).json({
      job,
    });
  } catch (error) {
    console.log(error);
  }
};
