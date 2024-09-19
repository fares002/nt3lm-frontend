import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('currentUserId');
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data.user);
      } catch (err) {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg " dir='rtl'>
      <div className="flex items-center mb-6">
        <img
          src={`http://localhost:5000/${user.avatar}`} // Adjust the path to the avatar
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-blue-500 ml-24"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold text-gray-800">{user.fullName}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">كورساتي:</h3>
      <ul className="list-disc list-inside mb-4">
        {user.enrolledCourses.length > 0 ? (
          user.enrolledCourses.map((course) => (
            <li key={course._id} className="text-gray-700 text-lg">
              {course.title} {/* Adjust according to your course structure */}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No enrolled courses</li>
        )}
      </ul>
      <button
        onClick={handleLogout}
        className="w-32 bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        تسجيل خروج
      </button>
    </div>
    </>
  );
};

export default UserProfile;
