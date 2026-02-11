// Search keyword data

export const searchRoutes = [
  // For Tools
  {
    id: 1,
    keywords: ["image to pdf", "convert image", "jpg to pdf"],
    route: "/imageToPdf",
    action: "IMAGE_TO_PDF"
  },
  {
    id: 2,
    keywords: ["compress image", "reduce image size"],
    route: "/tools",
    action: "IMAGE_COMPRESS"
  },
  {
    id: 3,
    keywords: ["enhance image", "image quality", "sharpen image"],
    route: "/tools",
    action: "IMAGE_ENHANCE"
  },
  {
    id: 4,
    keywords: ["object remover", "image mark", "mark remover"],
    route: "/tools",
    action: "WATERMARK_REMOVER"
  },
  {
    id: 4,
    keywords: ["background", "background remover"],
    route: "/tools",
    action: "IMAGE_background_REMOVER"
  },
  {
    id: 5,
    keywords: ["video remover", "video object remover"],
    route: "/tools",
    action: "VIDEO_BACKGROUND"
  },
  {
    id: 6,
    keywords: ["backend", "logic maker", "ai backend maker"],
    route: "/tools",
    action: "LOGCHART"
  },

  // For Docs
  {
    id: 7,
    keywords: ["docs", "documentation", "tools docs"],
    route: "/docs",
    action: "DOCUMENTATION"
  },
  {
    id: 8,
    keywords: ["logchart documentation", "logchart docs"],
    route: "/docscontent/products/1",
    action: "LOGCHART_DOCUMENTATION"
  },
  {
    id: 9,
    keywords: ["image to pdf docs", "jpg to pdf docs"],
    route: "/docs",
    action: "IMAGE_TO_PDF_DOCUMENTATION"
  },
  {
    id: 10,
    keywords: ["image compressor docs", "image resiser docs"],
    route: "/docs",
    action: "IMAGE COMPRESOR"
  },
  {
    id: 11,
    keywords: ["image enhancer docs", "image quality enhancer docs"],
    route: "/docs",
    action: "IMAGE ENHANCER"
  },
  {
    id: 12,
    keywords: ["watermark remover docs", "object remover from image docs"],
    route: "/docs",
    action: "WATERMARK REMOVER"
  },
  {
    id: 13,
    keywords: ["image background remover docs", "background remover docs"],
    route: "/docs",
    action: "IMAGE BACKGROUND REMOVER"
  },
  {
    id: 14,
    keywords: ["video background remover docs", "background remover from video docs"],
    route: "/docs",
    action: "VIDEO BACKGROUND REMOVER"
  },
  {
    id: 15,
    keywords: ["tools", "products", "product", "tool"],
    route: "/tools",
    action: "PAGES"
  },
  {
    id: 16,
    keywords: ["home", "home page", "landing page", "landing"],
    route: "/",
    action: "PAGES"
  }

];