import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location, userId } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "Company name already exist",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Registered Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Founded",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location, logo } = req.body;

    const updateData = {
      name: companyName,
      description,
      website,
      location,
      logo,
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
