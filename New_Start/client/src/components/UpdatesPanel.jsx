// Import of dependencies
import { useEffect, useState } from "react";

const UpdatesPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);  // Set notification
  const [loading, setLoading] = useState(true); 


  // Fetching notification from server
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/auth/getNotification");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch");
        }

        setNotifications(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  if (loading) {
    return <p className="text-gray-400 text-center">Loading notifications...</p>;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>

      {/* Drawer */}
      <aside
        aria-label="Notifications panel"
        className={`fixed top-0 right-0 h-full w-full sm:w-3/4 md:w-2/3 lg:w-1/3 
          bg-gradient-to-b from-gray-950 to-gray-900 text-white shadow-2xl 
          transform transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]
          z-50 overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-950/90 backdrop-blur z-10">
          <h3 className="text-lg font-semibold tracking-wide text-gray-200">
            Notifications
          </h3>

          <button
            onClick={onClose}
            aria-label="Close notifications"
            className="text-gray-400 hover:text-[#5FBFF9] text-3xl leading-none transition"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-8">
          {/* Intro */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Latest <span className="text-[#5FBFF9]">Updates</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm md:text-base max-w-md mx-auto">
              Important announcements, feature updates, and system notices.
            </p>
          </div>

          {/* Notifications */}
          <div className="max-w-4xl mx-auto space-y-4">
            {notifications.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium">No notifications yet</p>
                <p className="text-sm mt-1">You’re all caught up 🚀</p>
              </div>
            )}

            {notifications.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4
                  hover:border-[#5FBFF9]/60 hover:bg-gray-800 transition"
              >
                <div className="flex justify-between gap-4 items-start mb-1">
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {item.title}
                  </h3>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default UpdatesPanel;