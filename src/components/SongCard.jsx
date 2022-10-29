/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

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

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <motion.div
      variants={divMotion}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="flex flex-col w-[210px] p-4 bg-pink-700 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-xl cursor-pointer shadow-md"
    >
      <div className="relative w-full h-52  group">
        <div className={`absolute inset-0 justify-center items-center rounded-xl h-44 bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song.images?.coverart} alt="song-img" className="rounded-xl h-44" />
      </div>
      <div className="mt-2 flex flex-col">
        <p className="font-semibold text-lg text-white truncate ml-1">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 mb-2 ml-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SongCard;
