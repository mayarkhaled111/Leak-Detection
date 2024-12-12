"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function Testimonials() {
    let [testimonialData, setTestimonialData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function getTestimonial() {
      axios
        .get(`https://phpv8.aait-d.com/leak_detection/public/api/website/home`)
        .then(({ data }) => {
          if (data?.status == "success") {
            console.log(data?.data?.testimonials);
            setTestimonialData(data?.data?.testimonials);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }


    useEffect(() => {
        getTestimonial();
    }, []);


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
        );
      };


  return (
    <div className="mb-14 md:container">
      <div className=" px-7">
        <div className="flex justify-between items-center">
        <div><h3 className="bg-[#3162DA0A] px-5 text-[16px] text-secondColor font-[700] rounded-xl w-fit">
        تقييماتنا
        </h3>
        <h4 className="xl:text-[40px] lg:text-[30px] md:text-[20px] text-right font-[500] my-4 lg:my-3 md:w-[400px]"> اراء عملائنا </h4>
        </div>
        <div className="relative flex gap-4">
        <div className="">
        <button
          className="bg-blue-500 text-white rounded-full p-1 shadow-md"
       onClick={handlePrev}
        >
          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
        </button>
      </div>
        <div className="">
        <button
          className="bg-gray-300 text-gray-700 rounded-full p-1 shadow-md"
          onClick={handleNext}
        >
          <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
        </button>
      </div>
      
        </div>
        </div>
        <div className="md:flex justify-between items-center my-3">
        {testimonialData.map((ele) => (
          <div
            key={ele?.id}
            className={`w-full transition-transform duration-500 my-4`}
          >
            <div className="flex flex-col gap-7 bg-[#3162DA08] rounded-lg p-10  mx-2">
            <h3><FormatQuoteIcon style={{'color' : '#3162da'}}></FormatQuoteIcon></h3>
            <p className="md:text-[16px] text-[14px] font-[400]">"لقد استدعيت فريق تسريب المياه الخاص بكم لإصلاح تسريب في منزلي، وأنا سعيد جدًا بالخدمة التي تلقيتها. كان الفريق محترفًا وودودًا، وأصلحوا المشكلة بسرعة وبأعلى جودة. أوصي بشدة بخدماتكم."</p>
            <div className="flex items-center gap-4  mx-2">
                <img src={ele?.image} className="w-[52px]"></img>
                <div>
                    <p>احمد عامر</p>
                    <span className="text-[14px] text-[#BDBDD3]">مؤسس شركة CAS</span>
                </div>
                
            </div>
            </div>
          </div>
        ))}
        </div>
        <div className="flex mt-4 gap-2 justify-center">
        {testimonialData.map((_, index) => (
          <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full ${
            index === currentIndex ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></button>
        ))}
      </div>
      </div>
    </div>
  )
}
