import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AddCourse = () => {
  // State for course fields
  const [courseData, setCourseData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    duration: '',
    author: '',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitles] = useState([]);
  const [videoDescriptions, setVideoDescriptions] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.name === 'thumbnail') {
      setThumbnail(e.target.files[0]);
    } else if (e.target.name === 'videos') {
      setVideos([...e.target.files]);
    }
  };

  // Add video title and description
  const handleAddVideoDetails = () => {
    setVideoTitles([...videoTitle, '']);
    setVideoDescriptions([...videoDescriptions, '']);
  };

  // Handle video titles and descriptions input
  const handleVideoDetailsChange = (index, type, value) => {
    if (type === 'title') {
      const newTitles = [...videoTitle];
      newTitles[index] = value;
      setVideoTitles(newTitles);
    } else if (type === 'description') {
      const newDescriptions = [...videoDescriptions];
      newDescriptions[index] = value;
      setVideoDescriptions(newDescriptions);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    formData.append('description', courseData.description);
    formData.append('category', courseData.category);
    formData.append('duration', courseData.duration);
    formData.append('author', courseData.author);

    // Append thumbnail
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    // Append videos

    videos.forEach((video, index) => {
        // Add the video file
        formData.append(`videos`, video)
        formData.append(`videoTitle`, videoTitle[index] || ''); // Add the video title
        formData.append(`videosDes`, videoDescriptions[index] || ''); // Add the video description
    });

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    

    try {
      await axios.post('http://localhost:5000/api/v1/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course added successfully!');
    } catch (error) {
      console.log
      ('Error adding course:', error);
      alert('Failed to add course.', error);
    }
  };

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-right">إضافه كورس جديد</h2>
        <form onSubmit={handleSubmit}>
          <table className="min-w-full mb-6" dir='rtl'>
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
          <div className="mb-6" dir='rtl'>
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
            إضافه الكورس
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddCourse;

