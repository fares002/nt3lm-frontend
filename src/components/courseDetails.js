import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory

const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from the URL
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/v1/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseData(response.data.data.course);
      } catch (err) {
        setError('Error fetching course details');
        console.error(err.message);
      }
    };

    fetchCourseData();
  }, [courseId]); // Re-fetch if courseId changes

  if (error) return <div className="text-red-600">{error}</div>;
  if (!courseData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-right">تفاصيل الكورس</h2>
          <table className="min-w-full bg-white border border-gray-200" dir='rtl'>
            <tbody>
            <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">صوره وصفيه:</td>
                <td className="py-2 px-4">
                  {courseData.thumbnail && (
                    <img src={`http://localhost:5000/${courseData.thumbnail}`} alt="Course Thumbnail" className="w-32 h-32 object-cover" />
                  )}
                </td>
              </tr>
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
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">المدة:</td>
                <td className="py-2 px-4">{courseData.duration}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">الأستاذ:</td>
                <td className="py-2 px-4">{courseData.author}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-right font-semibold">الدروس:</td>
                <td className="py-2 px-4">
                  {courseData.videos && courseData.videos.map((video, index) => (
                    <div key={index} className="mb-2">
                      <p>الفيديو {index + 1}:</p>
                      <p>العنوان: {video.title}</p>
                      <p>الوصف: {video.description}</p>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
