import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job does not exist",
      });
    }
    const userId = req.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(404).json({
        message: "Already applied",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);

    await job.save();

    return res.status(200).json({
      message: "Applied successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    //nested populate
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (applications.length == 0) {
      return res.status(404).json({
        message: "No result",
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdBy: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "No applicant",
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Please Select the status",
      });
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "application",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "status updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
