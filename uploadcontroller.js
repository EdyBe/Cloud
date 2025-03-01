const fetch = require('node-fetch');
const { supabase } = require('../models/supabase');

const uploadVideo = async (req, res) => {
  try {
    const { videoUrl, userId, classCode, schoolName } = req.body;

    // Step 1: Upload video to Cloudflare Stream
    const cloudflareResponse = await fetch('https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/stream', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: videoUrl  // assuming you send the video URL
      }),
    });

    const cloudflareData = await cloudflareResponse.json();
    const cloudflareVideoId = cloudflareData.result.uid;  // Video ID from Cloudflare Stream

    // Step 2: Save metadata to Supabase database
    const { data, error } = await supabase.from('videos').insert([
      { 
        cloudflare_video_id: cloudflareVideoId,
        user_id: userId,
        class_code: classCode,
        school_name: schoolName,
      }
    ]);

    if (error) throw error;

    res.status(200).json({ success: true, video: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { uploadVideo };
