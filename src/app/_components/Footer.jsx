import Image from "next/image";
import React from "react";
import logo from "../../assets/Image/footer-logo.png";
import googlePlay from "../../assets/Image/googlePlay.png";
import appStore from "../../assets/Image/appStore.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

export default function Footer() {
  return (
    <div className="bg-[#FAFDFF]" id="contact">
      <div className=" md:container py-20">
        <div className=" px-7">
          <div className="lg:flex md:flex justify-between items-center gap-5 flex-wrap">
            <div className="lg:w-1/3 md:w-1/3 text-center md:text-right my-10">
              <div>
                <Image src={logo} alt="logo" className="w-[100px]"></Image>
              </div>
              <p className="text-[14px] my-7 font-[400] md:max-w-[260px]">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى
              </p>
              <ul className="flex gap-3 justify-center md:justify-start">
                <li>
                  <FacebookIcon></FacebookIcon>
                </li>
                <li>
                  <YouTubeIcon></YouTubeIcon>
                </li>
                <li>
                  <InstagramIcon></InstagramIcon>
                </li>
                <li>
                  <TwitterIcon></TwitterIcon>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/3 text-center my-10">
              <p className="text-[20px] font-[500] mb-5">هل لديك اسئله</p>
              <ul>
                <li className="text-[14px] ">
                  contact@company.com {' '}
                  <EmailOutlinedIcon
                    style={{ color: "#3162DA", fontFamily: "small" }}
                  ></EmailOutlinedIcon>
                </li>
                <li className="text-[14px]" >
                  (414) 687 - 5892
                  <LocalPhoneOutlinedIcon
                    style={{ color: "#3162DA", fontFamily: "small" }}
                  ></LocalPhoneOutlinedIcon>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/3 text-center my-10">
              <p className="text-[20px] font-[500] mb-5">الوصول السريع</p>
              <ul>
                <li className="text-[14px]">خدماتنا</li>
                <li className="text-[14px]">اطلب الخدمه</li>
              </ul>
            </div>
            <div className="lg:w-1/5 md:w-1/3 text-center my-10">
              <p className="text-[20px] font-[500] mb-5">حول موقعنا</p>
              <ul>
                <li className="text-[14px]">من نحن</li>
                <li className="text-[14px]">تواصل معنا</li>
                <li className="text-[14px]">الشروط والاحكام</li>
                <li className="text-[14px]">سياسه الخصوصيه</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5">
            <Image
              src={appStore}
              alt="appStore"
              className="md:w-[120px] w-[120px]"
            ></Image>
            <Image
              src={googlePlay}
              alt="googlePlay"
              className="md:w-[150px] w-[160px]"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
