// Import of dependencies
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import imageCompression from "browser-image-compression";

// Import of ui component
import Popup from "../../components/PopUp";

// Import of data for popup window
import ImageToPdf_Data from "../../Data/Popup/Tools_Pages_Popup/ImageToPdf";

function ImageToPdf(){
  const [open, setOpen] = useState(false); // For Popup window
  const [showUploader, setShowUploader] = useState(true); // For Upload and Grid Section
  const [images, setImages] = useState([]);  // For Image rendering on grid section

  const [isDownloading, setIsDownloading] = useState(false);  // For download button animation during downloadin



  const fileInputRef = useRef(null);



  const MAX_IMAGES = 25;  // Max image input

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      setOpen(true);
      e.target.value = "";
      return;
    }

    const optimizedFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...optimizedFiles]);
    setShowUploader(false);
    e.target.value = "";
  };

  const removeImage = (removeIndex) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[removeIndex].preview);
      return prev.filter((_, i) => i !== removeIndex);
    });
  };

  const compressImage = async (file) => {
    return await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
    });
  };

  const handleReselect = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setShowUploader(true);
  }, [images]);

  const handleDownloadPdf = async () => {
    if (!images.length || isDownloading) return;
    setIsDownloading(true);

    try {
      const formData = new FormData();

      for (const img of images) {
        const compressed = await compressImage(img.file);
        formData.append("images", compressed);
      }

      const res = await fetch("/api/downloadPdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };


  return(
    <>
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center px-4 py-6 relative pt-25">

      {/* Floating Back Button */}
      <Link
        to="/Tools"
        className="fixed z-50 top-4 left-4 sm:top-6 sm:left-6
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-gray-800/80 backdrop-blur
          text-gray-300 font-semibold
          shadow-lg
          hover:text-white hover:bg-gray-700/90
          active:scale-95
          transition-all duration-200"
      >
        ← Back
      </Link>

      {/* ================= UPLOADER ================= */}
      {showUploader && (
        <div
          className="w-full max-w-lg rounded-2xl p-6 sm:p-8
            bg-gradient-to-br from-[#0b1220] via-[#0e172a] to-[#0b1220]
            border border-white/10
            shadow-[0_0_40px_rgba(0,120,255,0.08)]
            flex flex-col items-center gap-5
            hover:border-cyan-400/30 transition"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-center
              text-transparent bg-clip-text
              bg-gradient-to-r from-blue-400 to-purple-500
              drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] p-3"
          >
            Image <i className="fa-solid fa-arrow-right text-blue-400 mx-1"></i> PDF
          </h1>

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            multiple
            id="imageInput"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Icon */}
          <div className="w-16 h-16 rounded-xl flex items-center justify-center
            bg-white/5 border border-white/10 text-cyan-400/70">
            <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
          </div>

          {/* Text */}
          <p className="text-white/70 text-sm text-center leading-relaxed">
            Drag & drop images here <br />
            <span className="text-white/40">or</span>
          </p>

          {/* Upload Button */}
          <label
            htmlFor="imageInput"
            className="cursor-pointer px-6 py-2.5 rounded-lg
              bg-gradient-to-r from-cyan-500/80 to-blue-500/80
              text-white text-sm font-semibold
              hover:from-cyan-400 hover:to-blue-400
              transition shadow-md"
          >
            Upload Images
          </label>

          <p className="text-xs text-white/40">
            JPG • PNG • WEBP • Multiple allowed
          </p>
        </div>
      )}

      {/* ================= GRID ================= */}
      {!showUploader && (
        <div className="w-full max-w-6xl flex flex-col items-center gap-6">

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            hidden
            onChange={handleImageChange}
          />

          {/* Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-center
              text-transparent bg-clip-text
              bg-gradient-to-r from-blue-400 to-purple-500
              drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] p-3"
          >
            Image <i className="fa-solid fa-arrow-right text-blue-400 mx-1"></i> PDF
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">

            <button
              onClick={handleReselect}
              className="px-5 py-2.5 rounded-xl
                bg-white/10 text-white border border-white/20
                hover:bg-white/20 hover:border-white/40
                transition flex items-center gap-2"
            >
              <i className="fa-solid fa-rotate-left"></i>
              Reselect
            </button>

            <button
              onClick={() => fileInputRef.current.click()}
              className="px-5 py-2.5 rounded-xl
                bg-blue-500/20 text-blue-300 border border-blue-400/30
                hover:bg-blue-500/30 hover:text-blue-200
                transition flex items-center gap-2"
            >
              <i className="fa-solid fa-image"></i>
              Add Image
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className={`px-6 py-3 rounded-xl font-semibold text-white
                flex items-center gap-2 transition shadow-lg
                ${
                  isDownloading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-blue-500/40"
                }`}
            >
              {isDownloading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Generating…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-download"></i>
                  Download
                </>
              )}
            </button>
          </div>

          {/* Image Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden
                  bg-black/40 border border-white/10"
              >
                <img
                  src={img.preview}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => removeImage(index)}
                  aria-label="Remove image"
                  className="absolute top-2 right-2
                    bg-black/70 text-white p-2 rounded-full
                    hover:bg-red-500 transition"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup */}
      {open && (
        <Popup
          isOpen={open}
          title={ImageToPdf_Data.title}
          message={ImageToPdf_Data.message}
          btn={ImageToPdf_Data.btn}
          state={ImageToPdf_Data.state}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
    </>
  )
}

export default ImageToPdf;