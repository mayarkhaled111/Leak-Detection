"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function WhatWeOffers() {
  let [offersData, setOffersData] = useState([]);
  let [mainImage, setMainImage] = useState([]);

  async function getOffersData() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({ data }) => {
        if (data?.status == "success") {
          console.log(data?.data?.what_we_offers);
          setOffersData(data?.data?.what_we_offers);
          setMainImage(data?.data?.home_slider?.big_image)
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  useEffect(() => {
    getOffersData();
  }, []);
  return (
    <div className="bg-mainColor py-8 lg:h-[560px] min-[560px]">
      <div className="mb-14 md:container lg:h-[550px] min-[550px]">
        <div className=" px-7 relative h-full">
          <div className="lg:w-1/3 lg:absolute top-[10%] right-0 ">
            {offersData?.slice(0, 2).map((ele) => (
              <div
                key={ele?.id}
                className="flex items-center gap-3 my-6 text-white"
              >
                <div className="bg-secondColor rounded-full">
                  <img src={ele?.image} alt="" className="" />
                </div>
                <div>
                  <h3 className="text-[16px] font-[700]">
                    مهارة وخبرة فريق العمل
                  </h3>
                  <p className="text-[12px] text-[#F7F7FC]">
                    يتمتع فريقنا بسنوات من الخبرة في المجال لضمان تقديم خدمات
                    عالية الجودة.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 lg:absolute lg:top-1/2 lg:right-1/2 lg:translate-x-[50%] lg:translate-y-[-50%]">
            <img src={mainImage} className="w-full"/> 
          </div>
          <div className="lg:w-1/3 lg:absolute bottom-[20%] left-0 ">
            {offersData?.slice(2, 4).map((ele) => (
              <div
                key={ele?.id}
                className="flex items-center gap-3 my-6 text-white"
              >
                <div className="bg-secondColor rounded-full w-[64px]">
                  <img src={ele?.image} alt="" className="" />
                </div>
                <div>
                  <h3 className="text-[16px] font-[700]">
                    مهارة وخبرة فريق العمل
                  </h3>
                  <p className="text-[12px] text-[#F7F7FC]">
                    يتمتع فريقنا بسنوات من الخبرة في المجال لضمان تقديم خدمات
                    عالية الجودة.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
