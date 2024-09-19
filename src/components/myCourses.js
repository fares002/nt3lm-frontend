import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState([])
  const userId = localStorage.getItem('currentUserId');
  const token = localStorage.getItem('token');
  
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${userId}/enrolled-courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data.user);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    // Call both functions
    fetchCourses();
    fetchUser();
  }, [userId, token]);


  return (
<>
  <Navbar />
  <div className="flex flex-col md:flex-row">
    {/* Left Side: Progress Bars */}
    <div className="w-full md:w-1/4 flex flex-col items-center space-y-6 p-4">
      {/* Example Progress Bar */}
      <div className="relative w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-pink-500"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-gray-200" style={{ clipPath: 'inset(60% 0 0 0)' }}></div>
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl font-bold">60%</span>
        </div>
      </div>
      <div className="relative w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-purple-500"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-gray-200" style={{ clipPath: 'inset(85% 0 0 0)' }}></div>
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl font-bold">85%</span>
        </div>
      </div>
    </div>

    {/* Middle Section: Courses */}
    <div className="w-full md:w-2/4 p-4 space-y-4" dir='rtl'>
      <h1 className='text-4xl mb-12 text-center'>دروسي</h1>
      {courses.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <p className="text-lg font-semibold">أنت غير مشترك في أي كورس</p>
        </div>
      ) : (
        courses.map((course, index) => (
          <div key={index} className="flex rounded-xl overflow-hidden shadow-lg bg-blue-100 p-4 mb-4">
            <div className="w-1/4 flex items-center justify-center max-h-48">
              <img 
                src={`http://localhost:5000/${course.thumbnail.replace(/\\/g, '/')}`} 
                alt={course.title} 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div className="w-3/4 p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm mb-2">{course.description}</p>
              <div className="flex items-center space-x-2">
                <Link to={`/courses/${course._id}/Videos`}>
                  <button className="bg-green-500 text-white px-4 py-1 rounded-full mt-20">بدأ الدرس</button>
                </Link>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full mt-20 mr-3">{course.category}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Right Side: Profile */}
    <div className="w-full md:w-1/4 p-4 flex flex-col items-center space-y-4">
      <img src={`http://localhost:5000/${user.avatar}`} alt="Profile" className="w-24 h-24 rounded-full" />
      <h3 className="text-xl font-bold">{user.fullName}</h3>
      <p className="text-gray-500">طالب</p>
      <p className="text-gray-500">المستوى السادس</p>
    </div>
  </div>
</>

  );
};

export default Dashboard;
