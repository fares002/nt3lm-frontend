import React from 'react';
import Navbar from './Navbar'; // Assume this is your previous Navbar component
import "../index.css"
import contact from "../images/contact.jpg"
const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8">

        {/* Right Side: Image */}
      <div className="w-full md:w-1/2 p-4">
          <img
            src={contact} // Update this with your image path
            alt="Contact Illustration"
            className="w-full h-auto"
          />
        </div>
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-5xl font-bold text-blue-700 mb-6 text-right">!اتصل بنا</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-right text-blue-700 mb-1">:البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-right text-blue-700 mb-1">:الرسالة</label>
              <textarea
                placeholder="اكتب رسالتك هنا"
                className="w-full p-2 border border-gray-300 rounded-lg h-32"
              ></textarea>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
              إرسال
            </button>
          </form>
          {/* Contact Info */}
          <div className="mt-8 text-right">
            <p>+966123456789 :رقم الهاتف</p>
            <p>عنوان الشركة: شارع الملك نمر، محطة بتروناس</p>
            <p>عنوان البريد: example@example.com</p>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default ContactPage;
