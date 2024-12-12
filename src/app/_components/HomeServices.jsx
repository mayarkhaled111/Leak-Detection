"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function HomeServices() {
  let [HomeServicesData, setHomeServicesData] = useState([]);

  async function getServices() {
    axios
      .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
      .then(({ data }) => {
        if (data?.status == "success") {
          console.log(data?.data?.home_services);
          setHomeServicesData(data?.data?.home_services);
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
      <div className=" px-7 lg:flex lg:flex-row flex-col lg:justify-between lg:items-center ">
      {HomeServicesData?.map((ele, index) => (
  <div
    key={ele?.id}
    className="lg:w-[400px] flex justify-center relative lg:h-[400px] md:w-[300px] md:h-[300px] sm:w-[250px] sm:h-[250px] w-[80%] h-[200px] m-auto"
  >
    <div className="absolute top-0 left-0 w-[95%] h-[95%] bg-[#3162DA0A] rotate-[-25deg] rounded-3xl"></div>
    
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]">
      <img className="w-full object-contain rounded-lg" src={ele?.image} alt="" />
    </div>
  </div>
))}

        <div className="lg:w-1/2 lg:mt-0 mt-14">
          <div className="content">
            <h3 className="bg-[#3162DA0A] px-5 text-[16px] text-secondColor font-[700] rounded-xl w-fit">
              خدمة تسريب المياه
            </h3>
            <h4 className="xl:text-[40px] lg:text-[30px] md:text-[20px] text-right font-[500] my-4 lg:my-8 md:w-[400px]">
              إصلاح وتسريب المياه
            </h4>
            <p className="lg:text-[16px] md:text-[14px] text-[12px] text-right font-[400] text-[#ADB3DA]">
              نحن فريق من الخبراء نهتم بتلبية احتياجاتكم في مجال الصيانة . سواء
              كنتم تحتاجون إلى إصلاح أو تركيب أنابيب الماء أو الصرف الصحي، أو
              تركيب أجهزة الحمام والمطبخ، فإننا هنا لنساعدكم. نحن نقدم خدماتنا
              للعملاء في جميع أنحاء المدينة ونضمن لكم جودة العمل والموثوقية في
              كل مشروع نقوم به.
            </p>
          </div>
          <ul className="mt-5">
            <li className="md:text-[16px] font-[400] text-[12px] my-1"> <CheckCircleIcon style={{'fontSize':'medium','color':'#3162da'}}/> مدة الضمان قد تختلف حسب نوع الخدمة التي تم تقديمها </li>
            <li className="md:text-[16px] font-[400] text-[12px] my-1"><CheckCircleIcon style={{'fontSize':'medium','color':'#3162da'}}/> ضمانًا على المواد التي نستخدمها في الأعمال التي نقوم بها</li>
            <li className="md:text-[16px] font-[400] text-[12px] my-1"><CheckCircleIcon style={{'fontSize':'medium','color':'#3162da'}}/> تقديم خدمات عالية الجودة ونضمن رضاالعملاء </li>
          </ul>
          <button className="button">
          تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
}
