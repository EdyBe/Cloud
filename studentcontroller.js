const { supabase } = require('../models/supabase');

const getStudentVideos = async (req, res) => {
  const { userId } = req.query;

  try {
    const { data, error } = await supabase
      .from('videos')
      .select('cloudflare_video_id, class_code')
      .eq('user_id', userId);

    if (error) throw error;

    // Group videos by class code
    const videosByClass = data.reduce((acc, video) => {
      if (!acc[video.class_code]) acc[video.class_code] = [];
      acc[video.class_code].push(video.cloudflare_video_id);
      return acc;
    }, {});

    res.status(200).json(videosByClass);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStudentVideos };
