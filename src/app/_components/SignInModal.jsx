"use client";
import { Modal, Box, Typography,IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { auth } from "@/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", 
    maxWidth: "500px",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
};

export default function SignInModal({ open, onClose, onForgotPasswordClick, onSwitchToRegister }) {
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  let {setLogin} = useContext(auth)


  // to get countries using api
  async function getCountries() {
    try {
      const response = await axios.get(
        `https://phpv8.aait-d.com/leak_detection/public/api/general/countries`
      );
      console.log(response?.data);
      if (response?.data?.status === "success") {
        setCountries(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

//   to toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

//   to handle login using api
  function handleLogin(values) {
    axios
      .post(
        "https://phpv8.aait-d.com/leak_detection/public/api/website/login",
        values
      )
      .then(({ data }) => {
        if (data?.status == "success") {
          onClose();
          formik.resetForm();
          toast.info('welcome')
          localStorage.setItem('userToken' , data?.data?.token)
          setLogin(jwtDecode(data?.data?.token))
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

//   validation using yup
  let validationSchema = Yup.object({
    phone_code: Yup.mixed()
      .oneOf(
        countries.map((country) => country.phone_code),
        "رمز الدولة غير صالح"
      )
      .required("رمز الدولة مطلوب"),
    phone: Yup.string()
      .matches(
        /^05\d{8}$/,
        "رقم الهاتف السعودي يجب أن يبدأ بـ 05 ويتبعه 8 أرقام"
      )
      .required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .matches(/^\d{6,}$/, "كلمة المرور يجب أن تكون مكونة من 6 أرقام أو أكثر")
      .required("كلمة المرور مطلوبة"),
  });

//   use formik to get data from user and handle submit
  let formik = useFormik({
    initialValues: {
      phone_code: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    getCountries();
  }, []);


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
      <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom style={{'textAlign' : 'center' , 'fontSize' : '28px', 'fontWeight' : 'bold'}}>
          تسجيل الدخول
        </Typography>
        <form
          className="w-full"
          onSubmit={formik.handleSubmit}
        >
          <label className="text-[14px]">رقم الهاتف</label>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
              <select
                onBlur={formik.handleBlur}
                value={formik.values.phone_code}
                onChange={formik.handleChange}
                id="phone_code"
                className="w-full sm:w-[20%] border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 mb-3 sm:mb-0"
                dir="ltr"
              >
                <option>Code</option>
                {countries?.map((country) => (
                  <option key={country?.id} value={country?.phone_code}>
                    {country?.phone_code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="phone"
                className="w-full sm:w-[75%] border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5"
                placeholder="رقم الهاتف"
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            {formik.errors.phone_code && formik.touched.phone_code ? (
              <span
                id="filled_success_help"
                className="text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.phone_code}{" "}
              </span>
            ) : (
              ""
            )}
            {formik.errors.phone && formik.touched.phone ? (
              <span
                id="filled_success_help"
                className="text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.phone}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="mb-6">
            <label className="text-[14px]"> كلمة المرور</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="كلمه المرور"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span
                onClick={togglePassword}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <VisibilityOffIcon size={20} />
                ) : (
                  <RemoveRedEyeIcon size={20} />
                )}
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <p
                id="filled_success_help"
                className="text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.password}
              </p>
            ) : (
              ""
            )}
            <span className="text-secondColor cursor-pointer" onClick={onForgotPasswordClick}>
              نسيت كلمه المرور؟
            </span>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-secondColor font-medium rounded-full text-md px-5 py-2.5 mb-2 focus:outline-none"
          >
            تسجيل الدخول
          </button>

          <p className="text-center text-sm mt-2">
            <span>ليس لديك حساب ؟ </span>
            <span className="text-secondColor cursor-pointer" onClick={onSwitchToRegister}>
              انشاء حساب جديد
            </span>
          </p>
        </form>
      </Box>
    </Modal>
  );
}
