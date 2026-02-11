import InterestedEmail from "../../Models/Intrested.user.js";

export const intrestedEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if email already exists
    const existingEmail = await InterestedEmail.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered",
      });
    }

    // Save email
    const newEmail = new InterestedEmail({ email });
    await newEmail.save();

    return res.status(201).json({
      success: true,
      message: "Email registered successfully",
    });

  } catch (err) {
    console.error("Interested email error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};