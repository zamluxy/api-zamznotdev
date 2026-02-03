import axios from "axios";

export default async function handler(req, res) {
  const { apikey, text } = req.query;

  // cek api key
  if (!global.apikey?.includes(apikey)) {
    return res.status(403).json({ status: false, error: "Apikey invalid" });
  }

  if (!text) {
    return res.status(400).json({ status: false, error: "Missing text" });
  }

  try {
    const url = `https://api.deline.web.id/maker/brat?text=${encodeURIComponent(text)}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", "image/png");
    res.send(response.data);
  } catch (e) {
    res.status(500).json({ status: false, error: "API error", detail: e.message });
  }
}
