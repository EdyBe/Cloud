const { supabase } = require('../models/supabase');

const getTeacherVideos = async (req, res) => {
  const { teacherId } = req.query;

  try {
    const { data: teacher } = await supabase
      .from('users')
      .select('class_code, school_name')
      .eq('user_id', teacherId)
      .single();

    if (!teacher) throw new Error("Teacher not found");

    const { data, error } = await supabase
      .from('videos')
      .select('cloudflare_video_id, class_code, user_id')
      .eq('class_code', teacher.class_code)
      .eq('school_name', teacher.school_name);

    if (error) throw error;

    const videosByClass = data.reduce((acc, video) => {
      if (!acc[video.class_code]) acc[video.class_code] = {};
      if (!acc[video.class_code][video.user_id]) acc[video.class_code][video.user_id] = [];
      acc[video.class_code][video.user_id].push(video.cloudflare_video_id);
      return acc;
    }, {});

    res.status(200).json(videosByClass);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTeacherVideos };
