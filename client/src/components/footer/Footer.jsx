import { FaFacebookF, FaInstagram, FaXing, FaPinterestP } from 'react-icons/fa';
import { MdHome, MdShoppingCart, MdPerson, MdPhoneAndroid, MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="flex border-inherit shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)]">
      {/* Left Section */}
      <div className="flex-1 p-2 space-y-5">
        <h1 className="text-3xl text-[#06B6D4]">VEGA</h1>
        <p className='text-[12px]'>
        Es una compañía dedicada al servicio de plantillas (templates) para todo tipo de páginas web que requieran de un diseño gráfico adecuado a su público o target, y además también contamos con soporte para que la página pueda adaptarse a las necesidades del servicio o producto que se requiera, ya sea con hosting o creación de formularios para administrar información.
        </p>
        <div className="flex space-x-5">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#06B6D4]">
            <FaFacebookF />
          </div>
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#06B6D4]">
            <FaInstagram />
          </div>
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#06B6D4]">
            <FaXing />
          </div>
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#06B6D4]">
            <FaPinterestP />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-5 space-y-5">
        <h3 className="text-xl font-bold mb-6">Contacto</h3>
        <div className="flex items-center space-x-3">
          <MdHome className="text-2xl" />
          <span>Michichan, concord 123</span>
        </div>
        <div className="flex items-center space-x-3">
          <MdPhoneAndroid className="text-2xl" />
          <span>+1 234 56 78</span>
        </div>
        <div className="flex items-center space-x-3">
          <MdEmail className="text-2xl" />
          <span>vegasupport@vega.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;