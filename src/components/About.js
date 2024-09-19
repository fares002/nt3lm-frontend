import Navbar from "./Navbar"
import about1 from "../images/about1.png"
import about2 from "../images/about2.png"
import "../index.css"
const About = () =>
{
    return(
        <>
    
          {/* Content Section */}
    <div className="flex flex-col min-h-screen">
    <Navbar/>
      <div className="flex flex-col md:flex-row flex-grow">
        {/* left side - Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-md">
            <img
              src={about1}
              alt="Student illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Right side - Text content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-7xl font-bold mb-7 text-black text-right">من نحن؟</h1>
          <p className="text-gray-700 text-right">
          مرحبًا بكم في نتعلّم!
          نحن منصة تعليمية مبتكرة موجهة لطلاب المدارس بمختلف المراحل الدراسية. هدفنا الرئيسي هو تقديم محتوى تعليمي
          متميز ومبسط يساعد الطلاب على فهم الدروس بشكل أعمق وأسهل، وتحفيزهم لتحقيق أقصى إمكانياتهم.

          في نتعلّم، نؤمن بأن التعلم هو حق للجميع، ونسعى إلى جعل التعليم متاحًا بطرق عصرية وممتعة. نقدم كورسات تفاعلية، شروحات شاملة، 
          ومصادر تعليمية متنوعة تغطي مختلف المواد الدراسية بطريقة تساعد الطلاب على التفاعل مع المحتوى وفهمه بشكل أفضل.
          </p>
        </div>
      </div>
      </div>

    <div className="flex flex-col min-h-screen" style={{background: '#f26e06'}}>
      <div className="flex flex-col md:flex-row flex-grow">
        {/* left side - Image */}
        {/* Right side - Text content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-7xl font-bold mb-7 text-white text-right">المهمة</h1>
          <p className="text-gray-700 text-right text-white" dir="rtl">
            نسعى إلى تعزيز مفهوم التعلم الذاتي عند الطلاب، وتزويدهم بالأدوات اللازمة لتحقيق 
            النجاح الأكاديمي عبر أساليب تعليمية مبتكرة. من خلال منصتنا، نهدف إلى: 
          </p>
          <ul className="list-disc list-inside text-gray-700 text-right text-white mb-4" dir="rtl">
            <li>تقديم دروس تتماشى مع المناهج الدراسية بأسلوب مبسط وسهل الفهم</li>
            <li>تمكين الطلاب من الوصول إلى محتوى متنوع يتناسب مع مستواهم التعليمي</li>
            <li>تعزيز التعلم الذاتي وتنمية المهارات الشخصية لكل طالب</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-full">
            <img
              src={about2}
              alt="Student illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      </div>
    </>
    );

}

export default About