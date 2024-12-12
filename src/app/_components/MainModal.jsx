import React, { useState } from "react";
import Header from "./components/Header";
import SignInModal from "./components/SignInModal";
import RegisterModal from "./components/RegisterModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import EnterCodeModal from "./components/EnterCodeModal";
import ResetPasswordModal from "./components/ResetPasswordModal";

export default function MainModal() {
  const [openModal, setOpenModal] = useState(null); // 'login', 'register', إلخ

  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <Header onLoginClick={() => handleOpenModal("login")} />

      {/* مودالات */}
      <SignInModal
        open={openModal === "login"}
        onClose={handleCloseModal}
        onForgotPassword={() => handleOpenModal("forgotPassword")}
        onSwitchToRegister={() => handleOpenModal("register")}
      />

      <RegisterModal
        open={openModal === "register"}
        onClose={handleCloseModal}
        onSwitchToLogin={() => handleOpenModal("login")}
      />

      <ForgotPasswordModal
        open={openModal === "forgotPassword"}
        onClose={handleCloseModal}
        onSendCode={() => handleOpenModal("enterCode")}
      />

      <EnterCodeModal
        open={openModal === "enterCode"}
        onClose={handleCloseModal}
        onSubmitCode={() => handleOpenModal("resetPassword")}
      />

      <ResetPasswordModal
        open={openModal === "resetPassword"}
        onClose={handleCloseModal}
        onResetComplete={() => handleOpenModal("login")}
      />
    </>
  );
}