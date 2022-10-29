import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// framer motion variants

const divMotion = {
  hidden: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: 50,
    transition: {
      duration: 0.5,
    },
  },
};

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artistInfo = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full p-2 m-2 bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        <div className="absolute inset-0 flex items-center">
          <motion.img
            variants={divMotion}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            src={artistId ? artistInfo.artwork?.url
              .replace('{w}', '500')
              .replace('{h}', '500') : songData?.images?.coverart}
            alt="profile"
            className="sm:w-40 w-16 sm:h-40 h-16 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artistInfo?.name : songData?.title}
            </p>
            {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p
                className="text-base text-gray-400 mt-2"
              >
                {songData?.subtitle}
              </p>
            </Link>
            )}

            <p className="text-base text-gray-400 mt-2">
              {artistId ? artistInfo?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
