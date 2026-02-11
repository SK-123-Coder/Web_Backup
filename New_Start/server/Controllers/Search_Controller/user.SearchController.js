// Handle search bar request controller

import {searchRoutes} from '../../data/searchRoutes.js'

export const SearchController = (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "Keyword is required"
    });
  }

  const searchText = keyword.toLowerCase().trim();

  // Simple & effective matching
  const matchedRoute = searchRoutes.find(route =>
    route.keywords.some(k => searchText.includes(k))
  );

  if (!matchedRoute) {
    return res.json({
      success: false,
      message: "No matching found",
      suggestion: "Try using keywords like 'image to pdf', 'compress image'"
    });
  }

  return res.json({
    success: true,
    route: matchedRoute.route,
    action: matchedRoute.action
  });
};