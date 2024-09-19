import landing from "../images/landing.jpg"
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div className="relative w-screen h-screen">
            <Link to='/home'>
            <img
                src={landing}
                alt="loading"
                className="w-full h-full "
            /></Link>
            </div>



        
        </>
    )
}


export default Landing;