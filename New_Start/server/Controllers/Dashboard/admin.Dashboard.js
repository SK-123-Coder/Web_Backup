// Server statics controller

import si from "systeminformation";

export const getSystemInfo = async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const ping = await si.inetLatency();

    res.json({
      cpuLoad: Number(cpu.currentLoad.toFixed(2)),

      ramUsed: Number((mem.active / (1024 ** 3)).toFixed(2)),
      ramTotal: Number((mem.total / (1024 ** 3)).toFixed(2)),

      latency: ping || 0,
      timestamp: Date.now()
    });
  } catch (err) {
    res.status(500).json({
      error: "Error fetching system info",
      details: err.message
    });
  }
};