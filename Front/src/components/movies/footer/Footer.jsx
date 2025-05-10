import { useNavigate } from "react-router";

const Footer = () => {

    const navigate = useNavigate();

    const HandleRedirectLoginUser = () => {
        navigate("/login")
    }   

    const HandleRedirectContact = () => {
        navigate("/contact")
    }

    return (

        <>
            <div className="bg-black w-full h-[20vh] grid grid-cols-4 items-center px-4">
                <div className="col-span-3 flex items-center text-white">
                    <p className="text-[2rem]">UTN CINEMA</p>
                </div>
                <div className="text-white">
                    <ul className="space-y-2">
                        <li><button className="hover:underline" onClick={HandleRedirectLoginUser} >Login</button></li>
                        <li><button className="hover:underline" onClick={HandleRedirectContact}>Contacto</button></li>
                    </ul>
                </div>
            </div>
        </>
    );

}

export default Footer;