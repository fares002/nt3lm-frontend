import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const CourseVideos = () => {
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the currently selected video
  const { courseId } = useParams();

  useEffect(() => {
    // Fetch the course data
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/courses/${courseId}`);
        setCourse(response.data.data.course);
        if (response.data.data.course.videos.length > 0) {
          // Set the first video as the default selected video
          setSelectedVideo(response.data.data.course.videos[0]);
        }
      } catch (error) {
        console.error('Error fetching the course data:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="text-center mt-10">Loading course data...</div>;
  }
  console.log(selectedVideo.url[0])

  return (
   <div>
     <Navbar/>
    <div className="container mx-auto px-4 py-8 grid grid-cols-3 gap-4">
        
      {/* Left side: Video Player and Description */}
      <div className="col-span-2" dir='rtl'>
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>
        {selectedVideo ? (
          <div>
            {/* Video Player */}
            <video
                key={selectedVideo.url[0]} // Add key prop to force re-render
                width="640"
                height="360"
                controls
                className="w-full rounded-lg mb-4"
              >
                {selectedVideo.url && selectedVideo.url[0] ? (
                  <source
                    src={`http://localhost:5000/${selectedVideo.url[0].replace(/\\/g, '/')}`} // Safely replace backslashes with forward slashes
                    type="video/mp4"
                  />
                ) : (
                  <p>No video source available</p>
                )}
                Your browser does not support the video tag.
              </video>


            {/* Course and Video Description */}
            <div className="bg-blue-100 p-4 rounded-lg">

              <h3 className="text-xl font-bold mt-4 mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-700">{selectedVideo.description}</p>
            </div>
          </div>
        ) : (
          <div className="text-center">No video selected</div>
        )}
      </div>

      {/* Right side: Sidebar with Video Titles */}
      <div className="bg-gray-100 p-4 rounded-lg"  dir='rtl'>
        <h3 className="text-xl font-bold mb-4">الفيديوهات</h3>
        {course.videos.map((video, index) => (
          <button
            key={index}
            className="w-full bg-gray-400 text-black py-2 px-4 rounded-lg mb-2 hover:bg-blue-600"
            onClick={() => setSelectedVideo(video)} // Update selected video
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CourseVideos;


