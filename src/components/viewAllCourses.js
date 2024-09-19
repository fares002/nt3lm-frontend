import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// import withReactContent from 'sweetalert2-react-content';




const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [infoMessage, setInfoMessage] = useState(''); 
  const [color, setColor] = useState(''); 

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/v1/courses/', {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
        setCourses(response.data.data.courses);
        console.log(response.data.data.courses)
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    // Set a timer to clear the message after 5 seconds
    if (infoMessage) {
      const timer = setTimeout(() => {
        setInfoMessage('');
      }, 5000);

      // Clear the timer if the component is unmounted or if infoMessage changes
      return () => clearTimeout(timer);
    }
  }, [infoMessage]);

  const deleteCourse = async (courseId) => {
    try {
      // Make the DELETE request using Axios
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/v1/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Handle success (e.g., update UI, show a success message)
      console.log('Course deleted successfully:', response.data.data);
      setInfoMessage("Course deleted successfully");
      setColor("green");
      console.log(color)
  
      // Show success message using Swal
      Swal.fire({
        title: "تم المسح!",
        text: "تم مسح الكورس بنجاح",
        icon: "success",
      });
  
      // You can refresh the list of courses or trigger a re-render here
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error deleting course:', error.message);
      setInfoMessage("Error deleting course");
      setColor("red");
      console.log(color)
  
      // Show error message using Swal
      Swal.fire({
        title: "خطأ",
        text: error.message,
        icon: "error",
      });
    }
  };
  
  // Handle button actions
  const handleDelete = (courseId) => {
    Swal.fire({
      title: "هل انت متأكد انك تريد مسح الكورس",
      text: "لن تكون قادر ان تستعيده",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(courseId);
      }
    });
  };
  
  

  const handleEdit = (id) => {
    // Implement editing logic here
    console.log('Edit course with ID:', id);
  };



  return (
    <div>
        <Navbar/>
              {/* Info Message */}
      {infoMessage && (
        <div className={`bg-${color}-500 text-blue-800 p-4 text-center mb-4`}>
          {infoMessage}
        </div>
      )}
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-right">الكورسات</h2>
      <table className="min-w-full bg-white border border-gray-200"  dir="rtl">
        <thead>
          <tr>
            <th className="border px-4 py-2">العنوان</th>
            <th className="border px-4 py-2">الوصف</th>
            <th className="border px-4 py-2">الصورة</th>
            <th className="border px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-t">
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.description}</td>
              <td className="border px-4 py-2">
                <img
                  src={`http://localhost:5000/${course.thumbnail}`}
                  alt={course.title}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                    <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mx-1"
                    >
                    مسح
                    </button>
                <Link to="/editCourse">
                    <button
                    onClick={() => handleEdit(course._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                    >
                    تعديل
                    </button>
                </Link>
                <Link to={`/courses/${course._id}`}>
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mx-1"
                    >
                        استكشاف
                    </button>
                </Link>
                <Link to={`/courses/${course._id}/addVideos`}>
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mx-1"
                    >
                        اضافه درس
                    </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default CourseTable;
