// Imports of dependencies
import { useEffect, useState } from "react";
import socket from '../socket.js'

function AdminPage(){

    // For live analysis of user
    const [users, setUsers] = useState(0); // Live count
    const [dailyUsers, setDailyUsers] = useState(0);  // daily count

    useEffect(() => {
        socket.on("userCount", setUsers);
        socket.on("dailyActiveUsers", setDailyUsers);

        return () => {
        socket.off("userCount");
        socket.off("dailyActiveUsers");
        };
    }, []);



    // For system statics
    const [systemInfo, setSystemInfo] = useState(null);  // Set live state of server
    const [loading, setLoading] = useState(true);  // If state not received

    useEffect(() => {
    const fetchSystemInfo = async () => {
        try {
        const response = await fetch("/api/auth/systemInfo");
        const data = await response.json();
        setSystemInfo(data);
        } catch (error) {
        console.error("Failed to fetch system info:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchSystemInfo();

    // auto-refresh every 5 seconds to render server state every 5 sec
    const interval = setInterval(fetchSystemInfo, 5000);
    return () => clearInterval(interval);

    }, []);



    // Handle notification input feilds
    const [title, setTitle] = useState("");  // For title feild
    const [paragraph, setParagraph] = useState("");  // For paragraph feild
    const [load, setLoad] = useState(false);

    const handleSubmit = async (e) => {  // handle and sends data from input feild to backend
        e.preventDefault();

        if (!title.trim() || !paragraph.trim()) {
        alert("Title and message are required");
        return;
        }

        try {
        setLoad(true);

        const res = await fetch("/api/auth/NotificationStore", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title,
            paragraph,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to send notification");
        }

        console.log("Notification sent:", data);

        // reset form
        setTitle("");
        setParagraph("");

        } catch (err) {

            console.error(err);
            alert(err.message);

        } finally {

            setLoad(false);

        }
    };
    return(
        <>
        {/* Page Wrapper */}
        <div className="min-h-screen bg-gray-950 text-gray-100 p-6">

        {/* Centered Container */}
        <div className="max-w-5xl mx-auto">

            {/* Heading */}
            <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-wide">
                CraftDex Dashboard
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
                System overview & user analytics
            </p>
            </div>

            {/* Grid Section → Single Column */}
            <div className="grid grid-cols-1 gap-8">

            {/* ================= SERVER STATS ================= */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-blue-400">SERVER</h2>

                <div className="grid sm:grid-cols-3 gap-4">
                {/* CPU */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">CPU Usage</p>
                    <p className="text-2xl font-bold">
                    {loading ? "--" : `${systemInfo.cpuLoad}%`}
                    </p>
                </div>

                {/* RAM */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">RAM Usage</p>
                    <p className="text-2xl font-bold">
                    {loading
                        ? "--"
                        : `${systemInfo.ramUsed} / ${systemInfo.ramTotal} GB`}
                    </p>
                </div>

                {/* Latency */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Latency</p>
                    <p className="text-2xl font-bold">
                    {loading ? "--" : `${systemInfo.latency} ms`}
                    </p>
                </div>
                </div>
            </div>

            {/* ================= USER STATS ================= */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-green-400">USERS</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                {/* Live Users */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Live Users</p>
                    <p className="text-2xl font-bold">{users}</p>
                </div>

                {/* Daily Users */}
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Daily Active Users</p>
                    <p className="text-2xl font-bold">{dailyUsers}</p>
                </div>
                </div>
            </div>

            {/* ================= NOTIFICATION ================= */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-purple-400">
                    Notification Controller
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                    Send real-time alerts to active users
                    </p>
                </div>

                {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {/* Inputs Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Title */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 uppercase tracking-wide">
                            Title
                            </label>
                            <input
                            type="text"
                            placeholder="Server Maintenance"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-[42px] bg-gray-800 border border-gray-700 rounded-lg px-4
                                text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                                focus:border-purple-500"
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 uppercase tracking-wide">
                            Message
                            </label>
                            <textarea
                            rows={1}
                            placeholder="Scheduled maintenance at 12:00 AM IST"
                            value={paragraph}
                            onChange={(e) => setParagraph(e.target.value)}
                            className="w-full h-[42px] resize-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2
                                text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                                focus:border-purple-500"
                            />
                        </div>
                        </div>

                        {/* Centered Action */}
                        <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-12 py-3 rounded-lg font-medium text-white
                            bg-purple-600 hover:bg-purple-700 active:bg-purple-800
                            transition shadow-lg shadow-purple-600/20
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Notification"}
                        </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        </div>
        </>
    )
}

export default AdminPage;