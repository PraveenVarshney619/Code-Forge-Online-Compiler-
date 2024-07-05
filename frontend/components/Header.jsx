// components/Header.js
import React, { useState, useEffect,useId  } from 'react';
import Image from 'next/image';
import logo from "../images/logo.png";
import "react-toastify/dist/ReactToastify.css";
import LanguageDropdown from './LanguageDropdown';
import ThemeDropdown from './ThemeDropdown';


const Header = ({ onSelectChange, handleThemeChange, theme, handleSubmit,initializeWebSocket,room,setRoom }) => {
  
  return (
    <div className='position:fixed w-full top-0 left-0'>
    <nav className='w-full flex md:justify-center justify-between items-center p-2 rounded-t-none rounded-b-lg bg-[#001f3f]'>
      <div className="md:flex-[1.0] flex-initial justify-center items-center">
        <Image src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul  className="text-white md:flex hidden justify-between items-center flex-initial ">
        <li className='flex items-center'>
          <button onClick={initializeWebSocket} className='mx-2'> 
            <span className='text-black transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 hover:bg-indigo-900 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'>
              Enter Room
            </span>
          </button>
            <textarea 
              rows="1"
              placeholder={`Enter Room No.`} 
              value={room} 
              style={{ resize: "none" }}
              onChange={(e) => setRoom(e.target.value)} 
              className="text-black w-1/2 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)]  hover:shadow transition duration-200 bg-white "
              >
            </textarea>
          
        </li>
        <li className="py-2 mx-2">
          <button onClick={handleSubmit}>
            <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 hover:bg-indigo-900 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'>
              Run
            </span>
          </button>
        </li>
        <li className="py-2 mx-2">
          <LanguageDropdown onSelectChange={onSelectChange}/>
        </li >
        <li className="py-2 mx-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </li>
      </ul>
    </nav>
    </div>
  );
};
export default Header;
