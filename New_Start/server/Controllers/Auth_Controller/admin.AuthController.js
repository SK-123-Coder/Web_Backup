// Authentication of admin for dashboard

export const adminAuthController = (req, res) => {
  const { pass } = req.body;

  if (pass === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({
        success: true,
        redirectUrl: "/admin",
    });
  } else {
    return res.status(401).json({ success: false });
  }
};