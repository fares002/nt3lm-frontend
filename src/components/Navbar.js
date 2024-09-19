import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useNavigate} from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate()

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check token validity and role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { exp, role } = decodedToken;

        if (Date.now() < exp * 1000) {
          setIsTokenValid(true);
          setUserRole(role);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsTokenValid(false);
    setUserRole('');
    navigate('/home')
    // Add any additional logout logic here
  };

  return (
    <nav className="bg-blue-700 p-4 flex justify-between items-center blaka-regular">
      {/* Links aligned to the left */}
      <div className="flex gap-6 text-white">
        {isTokenValid?(
        <>
                {/* Dropdown for حسابي */}
                <div className="relative">
          <button onClick={toggleDropdown} className="hover:underline focus:outline-none">
            حسابي
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-blue-700 rounded-lg shadow-lg z-10 text-right" dir='rtl'>
              
              {isTokenValid ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100">البروفايل</Link>
                  {userRole === 'ADMIN' && (
                    <>
                      <Link to="/addcourse" className="block px-4 py-2 hover:bg-blue-100">أضافه كورس</Link>
                      <Link to="/allCourses" className="block px-4 py-2 hover:bg-blue-100">لوحه التحكم</Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-blue-100"
                    
                  >
                    تسجيل خروج
                  </button>

                </>
              ) : (
                <Link to="/login" className="block px-4 py-2 hover:bg-blue-100">تسجيل دخول</Link>
              )}
              
            </div>
          )}
        </div>
        <Link to="/mycourses" className="hover:underline">الدروس</Link>
        <Link to="/contact" className="hover:underline">اتصل بنا</Link>
        <Link to="/about" className="hover:underline">اعرف أكثر</Link>
        </>
        ):(
          <>
        <Link to="/login" className="hover:undeline">تسجيل دخول</Link>
        <Link to="/contact" className="hover:underline">اتصل بنا</Link>
        <Link to="/about" className="hover:underline">اعرف أكثر</Link>
        
          </>
        )}
        


        <Link to="/home" className="hover:underline">الرئسيه</Link>
      </div>

      {/* Search form in the center */}
      {/* <form className="flex-grow max-w-md mx-4">
        <input
          type="text"
          placeholder="بحث عن درس"
          className="w-full p-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form> */}

      {/* Logo aligned to the right */}
      <div className="text-white text-2xl font-bold logo">نتعلّم</div>
    </nav>
  );
};

export default Navbar;




