import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import your Navbar component

const EditCourse = ({ courseId, onUpdate }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    duration: '',
    author: '',
    thumbnail: '',
    videos: [],
  });
  const [infoMessage, setInfoMessage] = useState('');
  const [color, setColor] = useState('');
  const [videoTitle, setVideoTitle] = useState([]);
  const [videoDescriptions, setVideoDescriptions] = useState([]);

  // Fetch the current course details when the component mounts
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseData(response.data.data);
        // Assuming video details are included in the response
        setVideoTitle(response.data.data.videoTitles || []);
        setVideoDescriptions(response.data.data.videoDescriptions || []);
      } catch (error) {
        console.error('Error fetching course details:', error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourseData({ ...courseData, [name]: files });
  };

  // Handle video details changes
  const handleVideoDetailsChange = (index, field, value) => {
    if (field === 'title') {
      const updatedTitles = [...videoTitle];
      updatedTitles[index] = value;
      setVideoTitle(updatedTitles);
    } else if (field === 'description') {
      const updatedDescriptions = [...videoDescriptions];
      updatedDescriptions[index] = value;
      setVideoDescriptions(updatedDescriptions);
    }
  };

  // Add video details
  const handleAddVideoDetails = () => {
    setVideoTitle([...videoTitle, '']);
    setVideoDescriptions([...videoDescriptions, '']);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');

      // Create a new object containing only non-empty fields
      const updatedData = {};
      for (const key in courseData) {
        if (courseData[key] && !(courseData[key] instanceof FileList && !courseData[key].length)) {
          updatedData[key] = courseData[key];
        }
      }

      await axios.patch(`http://localhost:5000/courses/${courseId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInfoMessage('Course updated successfully');
      setColor('green');
      
      // Trigger any additional update actions (e.g., refresh the list of courses)
      if (onUpdate) {
        onUpdate();
      }

    } catch (error) {
      setInfoMessage('Error updating course');
      setColor('red');
      console.error('Error updating course:', error.message);
    }
  };

  // Clear the message after 5 seconds
  useEffect(() => {
    if (infoMessage) {
      const timer = setTimeout(() => {
        setInfoMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [infoMessage]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-right">تعديل كورس</h2>
          <form onSubmit={handleSubmit} novalidate>
            <table className="min-w-full mb-6" dir="rtl">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">العنوان:</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="title"
                      value={courseData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">السعر:</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">الوصف:</td>
                  <td className="py-2 px-4">
                    <textarea
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    ></textarea>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">الفئه:</td>
                  <td className="py-2 px-4">
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Category</option>
                      <option value="علمي">علمي</option>
                      <option value="أدبي">أدبي</option>
                    </select>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">المدة:</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">الأستاذ:</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="author"
                      value={courseData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">صوره وصفيه:</td>
                  <td className="py-2 px-4">
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 text-right font-semibold">الدروس:</td>
                  <td className="py-2 px-4">
                    <input
                      type="file"
                      name="videos"
                      accept="video/*"
                      multiple
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Add Video Details */}
            <div className="mb-6" dir="rtl">
              <h3 className="text-xl font-bold mb-4">تفاصيل الدرس:</h3>
              {videoTitle.map((_, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="عنوان الدرس"
                    value={videoTitle[index]}
                    onChange={(e) => handleVideoDetailsChange(index, 'title', e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <textarea
                    placeholder="وصف الدرس"
                    value={videoDescriptions[index]}
                    onChange={(e) => handleVideoDetailsChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  ></textarea>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVideoDetails}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                اضافه تفاصيل للفيديو
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              تحديث الكورس
            </button>
          </form>
          {infoMessage && (
            <div className={`mt-4 text-${color}-600`}>
              {infoMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;

