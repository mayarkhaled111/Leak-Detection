"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Services() {
  let [ServicesData, setServicesData] = useState([]);

  async function getServices() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({data} ) => {
        if (data?.status == "success") {
          console.log(data?.data?.services);
          setServicesData(data?.data?.services);
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
    <div className="mt-20 md:p-20" id="services">
      <div className="bg-div lg:container w-[90%] bg-[#f7f7fc] md:h-[350px] m-auto rounded-3xl bg-cover bg-center md:flex justify-between items-center ">
        <div className="content p-5 flex flex-col justify-around my-5">
          <h3 className="bg-white px-5 text-[16px] text-secondColor font-[700] rounded-xl w-fit">
            خدماتنا
          </h3>
          <p className="xl:text-[40px] lg:text-[30px] md:text-[20px] text-right font-[500] my-10 md:w-[500px]">
            إختر <span className="text-secondColor">الخدمة</span> اللتي تناسب طلبك و دع الامر لخبرائنا
          </p>
          <p className="lg:text-[16px] md:text-[14px] text-[12px] text-right font-[400] text-[#ADB3DA]">
            إختر الخدمة و اخبرنا عن مشكلتك و سوف نرسل لك الفني المناسب في اسرع
            وقت
          </p>
        </div>
        <div className="images gap-6 flex justify-around flex-col-reverse relative md:h-[550px] items-center ml-5">
          {ServicesData?.slice(0, 2).map((service, index) => (
            <div key={index}>
                <div className="service-card lg:w-[200px] w-[150px] bg-white px-5 rounded-2xl shadow-lg text-center m-auto">
                    <img
                        src={service?.main_image?.media}
                        alt="Service"
                        className="w-ful object-cover rounded-lg mb-4"
                    />
                </div>
                <p className="text-center text-[16px] font-[700] mb-2">فني كشف عوازل</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
