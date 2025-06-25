
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white w-full py-6 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">UTN CINEMA</h2>
          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} UTN CINEMA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  };
  

export default Footer;