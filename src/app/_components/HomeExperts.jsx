"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function HomeExperts() {
  let [HomeExpertsData, setHomeExpertsData] = useState([]);

  async function getServices() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({ data }) => {
        if (data?.status == "success") {
          console.log(data?.data?.home_experts);
          setHomeExpertsData(data?.data?.home_experts);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  useEffect(() => {
    getServices();
  }, []);
  return (
    <div className="mb-14 md:container">
      <div className=" px-7">
        <div className="flex justify-between items-center">
        <div><h3 className="bg-[#3162DA0A] px-5 text-[16px] text-secondColor font-[700] rounded-xl w-fit">
          خبرائنا
        </h3>
        <h4 className="xl:text-[40px] lg:text-[30px] md:text-[20px] text-right font-[500] my-4 lg:my-3 md:w-[400px]">افضل خبراء لدينا</h4>
        </div>
        <div><button className="button">تواصل معنا</button></div>
        </div>
        <div className="md:flex justify-between items-center my-3">
        {HomeExpertsData?.map((ele, index) => (
          <div key={index} className="text-center flex justify-center gap-3 flex-col my-4">
            <img src={ele?.image}></img>
            <h4 className="md:text-[24px] font-bold">نادر كمال</h4>
            <span className="text-[#BDBDD3]">خبير تسريب المياه</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
