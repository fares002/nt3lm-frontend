import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const AddVideosToCourse = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([{ file: null, title: '', description: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch course information
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/v1/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        setCourseData(response.data.data.course);
      } catch (err) {
        setError('Error fetching course details');
        console.error(err.message);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Handle video input changes
  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  // Add a new video input field
  const addVideoField = () => {
    setVideos([...videos, { file: null, title: '', description: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    videos.forEach((video, index) => {
      if (video.file) formData.append('videos', video.file);
      formData.append('videoTitles', video.title);
      formData.append('videoDescriptions', video.description);
    });

    try {
      const token = localStorage.getItem('authToken');
      console.log(courseId)
      await axios.put(`http://localhost:5000/api/v1/courses/${courseId}/addVideosToCourse`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Videos added successfully!');
    } catch (error) {
      console.error('Error adding videos:', error);
      setError('Error adding videos');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!courseData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-right">تفاصيل الكورس</h2>
          <table className="min-w-full bg-white border border-gray-200 mb-6" dir='rtl'>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">العنوان:</td>
                <td className="py-2 px-4">{courseData.title}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">السعر:</td>
                <td className="py-2 px-4">{courseData.price}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">الوصف:</td>
                <td className="py-2 px-4">{courseData.description}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">الفئه:</td>
                <td className="py-2 px-4">{courseData.category}</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleSubmit} className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-right">إضافة فيديوهات</h2>
            {videos.map((video, index) => (
              <div key={index} className="mb-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(index, 'file', e.target.files[0])}
                  className="mb-2"
                />
                <input
                  type="text"
                  placeholder="عنوان الفيديو"
                  value={video.title}
                  onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="وصف الفيديو"
                  value={video.description}
                  onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300"
                />
              </div>
            ))}
            <button type="button" onClick={addVideoField} className="mb-4 p-2 bg-blue-500 text-white rounded">
              إضافة فيديو آخر
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-2 bg-green-500 text-white rounded"
            >
              {isSubmitting ? 'جاري الإضافة...' : 'إضافة الفيديوهات'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideosToCourse;
