"use client";
import React, { useEffect, useState } from "react";
import videoPoster from "../../assets/Image/video-poster.jpeg";
import person from "../../assets/Image/person.png";
import axios from "axios";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import CallReceivedOutlinedIcon from '@mui/icons-material/CallReceivedOutlined';

export default function HomeSlider() {
  let [HomeData, setHomeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getHome() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({ data }) => {
        if (data?.status == "success") {
          console.log(data?.data?.home_slider);
          setHomeData(data?.data?.home_slider);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getHome();
  }, []);

  return (
    <div className="bg-mainColor min-h-screen relative md:px-0 px-8" id="home">
      <div className="relative min-h-screen py-6 ">
        <div className="lg:absolute top-[5%] right-[5%] mx-auto max-w-[370px] my-6 text-white"><h1 className="font-[700] text-[32px]">مرحبًا بكم في موقعنا الخاص بخدمات كشف العوازل وتسريب المياه</h1></div>
        <div className="bg-[#0A4088] rounded-[50px] mx-auto w-full max-w-[370px] p-4 relative lg:absolute lg:top-12 lg:left-[7%]">
          <p className="text-[13px] text-white text-center">
          نهتم بتلبية احتياجاتكم. سواء كنتم تحتاجون إلى إصلاح أو تركيب أنابيب الماء أو الصرف الصحي.
          </p>
        </div>
        <div className="relative text-center m-auto mx-auto lg:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2">
          <div className="w-fit m-auto">
            <img
              className="w-full max-w-[582px] h-auto md:max-w-[482px]"
              src={HomeData?.big_image}
              alt="Main"
            />
          </div>

          <div className="arrow m-auto my-10 relative lg:absolute lg:-left-1/2 lg:translate-x-[35%] lg:top-1/2 lg:w-60 max-w-[370px] h-40 bg-[#0A4088] rounded-[29px] p-4 lg:translate-y-[-50%]">
            <div className="flex items-center">
              <div className="w-[52px] h-[53px] rounded-full">
                <Image className="rounded-full" src={person} alt="person" />
              </div>
              <p className="p-2">
                <span className="text-[16px] text-white">احمد محمد</span>
                <br />
                <span className="text-[#ADB3DA] text-[12px]">
                  فني كشف تسريبات
                </span>
              </p>
            </div>
            <div className="bg-[#184881] w-fit px-3 rounded-lg my-3">
              <span className="text-[#F5BE0B] text-[14px]">
                <StarIcon style={{ color: "#F5BE0B", fontSize: "medium" }} />{" "}
                4.5
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden relative my-10 w-[200px] h-[200px] mx-auto lg:absolute lg:bottom-[10%] lg:right-[10%] ">
          <div className="overlay w-full h-full absolute rounded-full inset-0 bg-[#00377366] z-1"></div>
          <Image
            className="w-full h-full object-cover rounded-full"
            src={videoPoster}
            alt="videoPoster"
          />
          <div
            className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-secondColor flex items-center justify-center cursor-pointer"
            onClick={openModal}
          >
            <PlayArrowIcon className="text-white" />
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="relative w-[80%] max-w-4xl">
                <button
                  onClick={closeModal}
                  className="absolute top-[-20px] right-[-20px] text-white text-xl"
                >
                  ×
                </button>
                <video controls className="w-full h-auto" src={HomeData?.video}>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-[79px] md:h-[79px] w-[40px] h-[40px] left-[5%] bottom-[5%] rounded-full bg-secondColor absolute md:left-[10%] md:bottom-[10%] flex justify-center items-center"><CallReceivedOutlinedIcon style={{'color':'#fff'}}></CallReceivedOutlinedIcon></div>
      </div>
    </div>
  );
}
