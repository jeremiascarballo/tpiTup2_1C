

const Footer = () => {

    return (

        <>
            <div className="bg-black w-full h-[20vh] grid grid-cols-4 items-center px-4">
                <div className="col-span-3 flex items-center text-white">
                    <p className="text-[2rem]">UTN CINEMA</p>
                </div>
                <div className="text-white">
                    <ul className="space-y-2">
                        <li><button className="hover:underline">Login</button></li>
                        <li><button className="hover:underline">Contacto</button></li>
                    </ul>
                </div>
            </div>
        </>
    );

}

export default Footer;