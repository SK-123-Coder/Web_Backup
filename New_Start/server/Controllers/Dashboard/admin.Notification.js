// Store notification controller

import AdminNotification from "../../Models/AdminNotification.js"

export const adminNotificationStorer = async (req ,res) => {
  try {
    const { title, paragraph } = req.body;

    if (!title || !paragraph) {
      return res.status(400).json({
        message: "Title and paragraph are required",
      });
    }

    const notification = await AdminNotification.create({
      title,
      paragraph,
    });

    res.status(201).json({
      message: "Notification stored successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to store notification",
      error: error.message,
    });
  }
}