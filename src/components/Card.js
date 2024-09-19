import React from 'react';
import "../index.css";
import background from "../images/background.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Card = ({ imageUrl, title, category, description, teacher, color, id, price }) => {

  const enroll = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/${userId}/enroll/${id}`,
        {}, // Empty body since no data is being sent
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Enrollment successful:', response.data);
      Swal.fire({
        title: "اشتراك الكورس",
        text: "تم الاشتراك في الكورس بنجاح",
        icon: "success",
      });
      // Handle success (e.g., show a message or update state)
    } catch (error) {
      console.error('Enrollment failed:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: "اشتراك الكورس",
        text: "يجب تسجيل الدخول",
        icon: "error",
      });
      // Handle error (e.g., show an error message)
    }
  };
  

  return (
    <div
      className={`text-white rounded-xl overflow-hidden w-full sm:w-80 shadow-lg min-h-[400px]`}
      style={{ backgroundColor: color }} dir='rtl' // Use the dynamic color prop
    >
      {/* Upper Section split into two halves */}
      <div className="flex h-60 sm:h-56">
        {/* Left Side */}
        <div className="w-1/2 bg-cover bg-center flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Side */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
      </div>

      {/* Lower Section */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>
        <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-xs inline-block">{category}</span>
        <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-xs inline-block mr-2">{price}</span>
        <p className="text-sm mt-2 text-white">{description}</p>
        <p className="mt-4 text-xs text-white">{teacher}</p>

        {/* Buttons */}
        <div className="flex mt-4 gap-2">
          <Link to={`/courses/${id}/Videos`}>
            <button className="bg-white text-blue-500 px-4 py-1 rounded-full text-sm">
              عرض الدرس
            </button>
          </Link>
          <button onClick={enroll} className="bg-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">
            إشتراك
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
