import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// framer motion variants

const divMotion = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={divMotion}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="flex flex-col w-[250px] p-4 bg-pink-700 bg-opacity-75 backdrop-blur-sm animate-slideup rounded-xl cursor-pointer shadow-md"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img
        src={track?.images?.coverart}
        alt="artist"
        className="w-full h-56 rounded-xl"
      />
      <p className="mt-4 font-bold text-lg text-white truncate">{track?.subtitle}</p>
    </motion.div>
  );
};

export default ArtistCard;
