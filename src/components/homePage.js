import React from 'react';
import Navbar from './Navbar';
import Card from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingComponent from './loading'; 

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  // List of background colors
  const colors = ['#f26e06', '#f5c518', '#1db1eb', '#6600eb', '#e00881', '#48ca4c'];

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/courses');
        setCourses(response.data.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  },[]);

  const searchCourses = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/courses/search`, {
        params: { query: searchTerm }, // Send the search term as a query parameter
      });
      return response.data; // Return the searched courses
    } catch (error) {
      console.error('Error searching for courses:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    const searchedCourses = await searchCourses(searchTerm);
    setCourses(searchedCourses); // Update the state with the searched courses
  };

  return (
    <>
<div className="bg-gray-100 min-h-screen">
  {/* Navbar */}
  <Navbar />

  {/* Search and Filter Section */}
  <div className="p-4">
    <div className="flex flex-col sm:flex-row sm:justify-center items-center my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onInputCapture={handleSearch}
        placeholder="ابحث عن درس"
        className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-full mb-2 sm:mb-0"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-6 py-2 rounded-full ml-2">
        بحث
      </button>
    </div>

    <div className="flex flex-col sm:flex-row justify-center gap-4 my-4">
      <select className="border border-gray-300 p-2 rounded-full mb-2 sm:mb-0">
        <option>المادة</option>
      </select>
      <select className="border border-gray-300 p-2 rounded-full mb-2 sm:mb-0">
        <option>الاستاذ</option>
      </select>
      <select className="border border-gray-300 p-2 rounded-full mb-2 sm:mb-0">
        <option>المدة</option>
      </select>
    </div>
  </div>

  {/* Cards Section */}
  <div className="flex flex-wrap justify-center gap-4 p-5">
  {courses.length === 0 ? (
    <LoadingComponent /> // Your loading component
  ) : (
    courses.map((course, index) => {
      // Randomly select a color from the colors array
      const color = colors[index % colors.length];

      return (
        <Card
          key={course._id}
          id={course._id}
          imageUrl={`http://localhost:5000/${course.thumbnail}`}
          title={course.title}
          category={course.category}
          description={course.author}
          teacher={course.teacher}
          price={course.price}
          color={color} // Pass the random color as a prop
        />
      );
    })
  )}
  </div>
</div>
</>
  );
}

export default HomePage;
