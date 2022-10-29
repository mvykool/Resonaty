/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { motion } from 'framer-motion';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

// framer motion variants

const sideMusicMotion = {
  hidden: {
    scale: 1,
  },
  hover: {
    originX: 0,
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const divMotion = {
  hidden: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.2,
    rotate: 50,
    transition: {
      duration: 0.5,
    },
  },
};

const TopSongsCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <motion.div
    variants={sideMusicMotion}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className="w-full flex flex-row items-center hover:bg-pink-700 py-2 p-3 rounded-lg cursor-pointer mb-1"
  >
    <h4 className="font-bold text-base text-white mr-3">{ i + 1 }.</h4>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images?.coverart}
        alt={song?.title}
        className="w-16 h-16 rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-200">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </motion.div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topSongs = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
	  };

	  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
	  };

  return (
    <div
      ref={divRef}
      className="xl:ml-4 mr-4 xl:mb-2 mb-6 flex-1 xl:max-w-[430px] max-w-full flex flex-col"
    >

      <div className="w-full flex flex-col mt-0 mb-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-pink-600 font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More..</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={FreeMode}
          className="mt-4"
        >
          { topSongs?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '15%', height: 'auto', padding: '1px', margin: '5px' }}
              className="shadow-lg rounded-full animate-slideright my-2"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <motion.img
                  variants={divMotion}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full flex flex-col xl:mt-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-pink-600 font-bold text-2xl">Top Songs</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More..</p>
          </Link>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          { topSongs?.map((song, i) => (
            <TopSongsCard
              key={song.key}
              song={song}
              i={i}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
