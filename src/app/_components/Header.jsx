"use client";
import React, { useContext } from "react";
import Image from "next/image";
import logo from "../../assets/Image/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from "@/Context/AuthContext";

export default function Header({ onLoginClick }) {
  let { isLogin, setLogin } = useContext(auth)

  function logout() {
    localStorage.removeItem('userToken')
    setLogin(null)
  }
  return (
    <header className="bg-mainColor text-white py-4 shadow-md">
      <div className="md:container px-4 mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center gap-2">
          <Image className="logo" src={logo} alt="logo"></Image>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          <a href="#home" className="hover:text-blue-300">
            الرئيسية
          </a>
          <a href="#services" className="hover:text-blue-300">
            خدمات
          </a>
          <a href="#about" className="hover:text-blue-300">
            من نحن
          </a>
          <a href="#contact" className="hover:text-blue-300">
            تواصل معنا
          </a>
        </nav>

        <div className="flex gap-4 items-center flex-row-reverse">
          <div className="flex items-center gap-1 cursor-pointer">
            <select className="bg-transparent cursor-pointer" dir="ltr">
              <option value="EN">EN</option>
              <option value="AR">AR</option>
            </select>
            <LanguageIcon />
          </div>
          <div className="bg-[#FFFFFF0D] p-2 rounded-lg cursor-pointer">
            {isLogin ? <LogoutIcon onClick={logout}></LogoutIcon> : <PersonIcon onClick={onLoginClick}></PersonIcon>}
          </div>

          <div className="relative bg-[#FFFFFF0D] p-2 rounded-lg">
            <NotificationsIcon className="text-xl cursor-pointer" />
            <span className="absolute top-[15%] right-[15%] w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
