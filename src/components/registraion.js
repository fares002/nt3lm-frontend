import React, { useState , useEffect} from 'react';
import axios from 'axios';
import backgroundImage from '../images/background1.png'; // Path to the image
import '../index.css'
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000); // Clear message after 3 seconds

      // Cleanup timer if component unmounts or flashMessage changes
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const formSumbit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users/register', {
      fullName,
      email,
      password,
      passwordConfirmation,
    })
      .then(function (response) {
        setFlashMessage("User created successful!");
        setFlashType("success");
        navigate('/login')
      })
      .catch(function (error) {
        setFlashMessage(error.response.data.message || "Registration failed.");
        setFlashType("error");
      });
  };

  return (
    <div className="flex h-screen blaka-regular">
      {/* Left Image Section */}
      <div className="w-1/2">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-white">
        <Link to ="/" >
          <h1 className="text-4xl font-extrabold mb-8">نتعلّم</h1>
        </Link>
                {/* Flash Message */}
        {flashMessage && (
          <div className={`mb-4 p-3 rounded defaultfont ${flashType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {flashMessage}
          </div>
        )}
        <form className="w-full max-w-sm" onSubmit={formSumbit}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 formfont font-sans"
            onChange={(event)=> {setFullName(event.target.value)}}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 formfont font-sans"
            onChange={(event)=> {setEmail(event.target.value)}}
          />
          <input
            type="text"
            placeholder="كلمة المرور"
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 formfont font-sans"
            onChange={(event)=> {setPassword(event.target.value)}}
          />
          <input
            type="text"
            placeholder="تأكيد كلمه المرور"
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 formfont font-sans"
            onChange={(event)=> {setPasswordConfirmation(event.target.value)}}
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            إنشاء حساب
          </button>
        </form>
        <p className="mt-6">
          هل لديك حساب؟ <a href="/login" className="text-blue-500 hover:underline">تسجيل الدخول</a>
        </p>
        <div className="mt-8 text-gray-600">
          <a href="/privacy" className="hover:underline">سياسة الخصوصية</a> | <a href="/terms" className="hover:underline">شروط الخدمة</a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;



