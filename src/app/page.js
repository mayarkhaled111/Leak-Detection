"use client";
import React, { useState } from "react";
import HomeSlider from "./_components/HomeSlider";
import Services from "./_components/Services";
import BestExpert from "./_components/BestExpert";
import HomeServices from "./_components/HomeServices";
import HomeExperts from "./_components/HomeExperts";
import Testimonials from "./_components/Testimonials";
import WhatWeOffers from "./_components/WhatWeOffers";
import Application from "./_components/Application";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import SignInModal from "./_components/SignInModal";
import RegisterModal from "./_components/RegisterModal";
import ForgetPasswordModel from "./_components/ForgetPasswordModel";
import CheckCodeModal from "./_components/CheckCodeModal";
import ResetPasswordModel from "./_components/ResetPasswordModel";
import FooterBottom from "./_components/FooterBottom";

export default function page() {
  const [modalState, setModalState] = useState({
    login: false,
    register: false,
    forgotPassword: false,
    codeVerification: false,
    resetPassword: false,
  });

  //to open modal
  const openModal = (type) => {
    setModalState((prevState) => ({
      login: false,
      register: false,
      forgotPassword: false,
      [type]: true, 
    }));
  };

  // to close modal
  const closeModal = (type) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: false,
    }));
  };
  return (
    <div>
      <Header onLoginClick={() => openModal("login")}></Header>
      <SignInModal
        open={modalState.login}
        onClose={() => closeModal("login")}
        onSwitchToRegister={() => {
          closeModal("login");
          openModal("register");
        }}
        onForgotPasswordClick={() => {
          closeModal("login");
          openModal("forgotPassword");
        }}
      />
      <RegisterModal
        open={modalState.register}
        onClose={() => closeModal("register")}
        onSwitchToLogin={() => {
          closeModal("register");
          openModal("login");
        }}
      />

      <ForgetPasswordModel
        open={modalState.forgotPassword}
        onClose={() => closeModal("forgotPassword")}
        onSwitchToCheckCode={() => {
          closeModal("forgotPassword");
          openModal("codeVerification");
        }}
      />

      <CheckCodeModal
        open={modalState.codeVerification}
        onClose={() => closeModal("codeVerification")}
        onSwitchToResetPassword={() => {
          closeModal("codeVerification");
          openModal("resetPassword");
        }}
      />

      <ResetPasswordModel
        open={modalState.resetPassword}
        onClose={() => closeModal("resetPassword")}
        onSwitchToLogin={() => {
          closeModal("resetPassword");
          openModal("login");
        }}
      />
      <HomeSlider></HomeSlider>
      <Services></Services>
      <BestExpert></BestExpert>
      <HomeServices></HomeServices>
      <HomeExperts></HomeExperts>
      <Testimonials></Testimonials>
      <WhatWeOffers></WhatWeOffers>
      <Application></Application>
      <Footer></Footer>
      <FooterBottom></FooterBottom>
    </div>
  );
}
