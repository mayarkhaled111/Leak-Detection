"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function BestExpert() {
  let [ExpertData, setExpertData] = useState([]);
  let [advantages, setAdvantages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getHome() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({ data }) => {
        if (data?.status == "success") {
          console.log(data?.data?.home_about);
          console.log(data?.data?.advantages);
          setExpertData(data?.data?.home_about);
          setAdvantages(data?.data?.advantages);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  useEffect(() => {
    getHome();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="md:container my-40" id="about">
      <div className="lg:flex items-center px-7">
        <div className="lg:w-2/3">
          <h3 className="bg-[#3162DA0A] px-5 text-[16px] font-[700] rounded-xl w-fit text-secondColor">
            من نحن
          </h3>
          <p className="md:font-[500] md:text-[40px] my-8">
            أفضل الفنيين الخبراء لخدمتك
          </p>
          <div className="md:flex md:flex-wrap gap-5">
            {advantages.map((ele, index) => (
              <div
                key={index}
                className="flex items-center gap-3 my-4 md:w-[45%]"
              >
                <img
                  src={ele?.image}
                  alt="image"
                  className="md:w-[80px] w-10"
                />
                <div className="content">
                  <p className="md:text-[20px]">تقييمات عالية</p>
                  <span className="text-[#ADB3DA] text-[14px] md:text-[16px]">
                    تتميز حدماتنا و خبرائنا بأفضل تقييمات رضا العملاء
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="button">
            اعرف المزيد
          </button>
        </div>
        <div className="relative lg:w-[350px] w-[200px] h-[200px] lg:h-[350px] m-auto lg:mt-0 mt-8">
          <div className="absolute overflow-hidden top-1/2 z-10 translate-y-[-40%] w-[100%] text-center m-auto">
            <img
              className="w-[100%] h-full object-cover rounded-full m-auto"
              src={ExpertData?.image}
              alt="videoPoster"
            />
            <div
              className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-secondColor flex items-center justify-center cursor-pointer"
              onClick={openModal}
            >
              <PlayArrowIcon className="text-white" />
            </div>

            
          </div>

          <div className="absolute z-[3] top-[4%] left-[-8%] w-[90%] h-[90%]  bg-[#F7F7FC] rounded-full"></div>

          <div className="absolute bottom-[-10%] right-[-3%] w-[90%] h-[90%] border-[1px] border-secondColor rounded-full"></div>
        </div>
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
                  <video
                    controls
                    className="w-full h-auto"
                    src={ExpertData?.video}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
    </div>
  );
}
