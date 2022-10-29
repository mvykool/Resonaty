/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { logo } from '../assets';
import { links } from '../assets/constants';

/* framer motion variants */

const navLinkMotion = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.2,
    },
  },
};

const NavLinks = ({ handleClick }) => (
  <div className="mt-[-5px} sm:mt-1">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start
	 items-center my-6 lg:ml-5 text-sm font-medium text-white hover:text-pink-700"
        onClick={() => handleClick && handleClick()}
      >
        <motion.div
          variants={navLinkMotion}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="flex"
        >
          <link.icon className="w-6 h-6 mr-3" />
          {link.name}
        </motion.div>
      </NavLink>
	 ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[220px] py-1 px-4 bg-[#181523]">
        <img src={logo} alt="logo" className="w-[550px] h-[240px] object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        { mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
	  ) : (
  <HiOutlineMenu
    className="w-6 h-6 text-white mr-2"
    onClick={() => setMobileMenuOpen(true)}
  />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#342b4d] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>

    </>
  );
};

export default Sidebar;
