import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoVega from "../../assets/images/VEGA logo.svg";
import typeVega from "../../assets/images/VEGA type.svg";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className='w-full h-full flex justify-center' style={{ background: 'linear-gradient(to bottom, white, silver)' }}>
      
      <div className='justify-center items-center'>

      <div className='mt-[5rem]'>

        
        <motion.img
          src={logoVega}
          alt="logo"
          className="w-[350px] h-[350px]"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 90 }}
          transition={{ duration: 2, ease: "linear" }}
          // onAnimationComplete={() => navigate('/Home')}
        />
        <motion.img
          src={typeVega}
          alt="type"
          className="w-[400px] h-[400px] mt-[-8rem]"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "linear" }}
        />
      </div>
    </div>
    </div>

  );
};

export default Landing;
