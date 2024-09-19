import React, { useState } from 'react';
import backgroundImage from '../images/background1.png'; // Path to the image
import '../index.css'
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
// import jwt from 'jsonwebtoken' 

const LoginForm = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState("");

  const navigate = useNavigate()


  const formSumbit = (e) => {
    e.preventDefault();
    axios.post(("http://localhost:5000/api/v1/users/login"), {
      email,
      password
    }).then((res)=> {
      console.log(res.data.token)
      if(res.data.token){
      const token = res.data.token
      const currentUser = res.data
      const currentUserId = res.data.id

      
      localStorage.setItem('token', token) // Convert object to JSON string
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('currentUserId', currentUserId)

      // Retrieve and parse currentUser from localStorage
      // const userString = localStorage.getItem('currentUser');

      // const user = JSON.parse(userString); // Convert JSON string back to object

      // const currentUser = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY)
      setFlashMessage("Login Successfully")
      setFlashType(res.data.status)
      navigate('/home');
      }else {
        setFlashMessage("Login failed");
        setFlashType('error');
      }

    }).catch((error) => {
      console.log(error)
      setFlashMessage(error.response.data.message)
      setFlashType(error.response.data.status)
    })
  }

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
                {flashMessage && (
          <div className={`mb-4 p-3 rounded defaultfont ${flashType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {flashMessage}
          </div>
        )}
        <form className="w-full max-w-sm">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <input
            type="password"
            placeholder="كلمه المرور "
            className="mb-4 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            onChange={(e)=> {setPassword(e.target.value)}}
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
            onClick={formSumbit}
          >
            تسجيل دخول
          </button>
        </form>
        <p className="mt-6">
          ليس لديك حساب؟ 
          <Link to='/signup' className="text-blue-500 hover:underline">إنشاء حساب </Link>
        </p>
        <div className="mt-8 text-gray-600">
          <a href="/privacy" className="hover:underline">سياسة الخصوصية</a> | <a href="/terms" className="hover:underline">شروط الخدمة</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;