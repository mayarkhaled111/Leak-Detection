"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { Modal, Box, Typography,IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", 
  height: '400px',
  overflow: 'scroll',
  maxWidth: "500px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function RegisterModal({ open, onClose,onSwitchToLogin }) {
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState('');


  // to get countries using api
  async function getCountries() {
    try {
      const response = await axios.get(
        `https://phpv8.aait-d.com/leak_detection/public/api/general/countries`
      );
      if (response?.data?.status === "success") {
        setCountries(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  // to show and hide password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  // handle register using api
  function handleRegister(values) {
    axios
      .post(
        "https://phpv8.aait-d.com/leak_detection/public/api/website/register",
        values
      )
      .then(({ data }) => {
        if (data?.status === "success") {
          toast.success(data?.message);
          formik.resetForm();  // تفريغ الحقول
          onClose();  // إغلاق مودال التسجيل
          onSwitchToLogin();  // فتح مودال تسجيل الدخول
        }
      })
      .catch((errors) => {
        setError(errors?.response?.data?.message);
      });
  }

  // validation function using Yup
  let validationSchema = Yup.object({
    full_name: Yup.string().min(3, 'يجب ان يكون اكثر من ٣ احرف').required('الاسم مطلوب'),
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

    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة') // التحقق من تطابق كلمة المرور مع `password`
      .required('تأكيد كلمة المرور مطلوب')
  });

  // using formik to get data from user
  let formik = useFormik({
    initialValues: {
      image: "test.png",
      full_name: "",
      phone_code: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
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
          انشاء حساب جديد
        </Typography>
        <form
          className="w-full"
          onSubmit={formik.handleSubmit}
        >
          <label className="text-[14px]">الاسم</label>
          <div className="mb-6 relative">
            <input
              className="w-full border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.full_name}
              onChange={formik.handleChange}
              id="full_name"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
              <PersonOutlineIcon />
            </span>
            {formik.errors.full_name && formik.touched.full_name ? (
              <p className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.full_name}
              </p>
            ) : null}
          </div>

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
              <span className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.phone_code}
              </span>
            ) : null}
            {formik.errors.phone && formik.touched.phone ? (
              <span className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.phone}
              </span>
            ) : null}
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
                {showPassword ? <VisibilityOffIcon size={20} /> : <RemoveRedEyeIcon size={20} />}
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <p className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <label className="text-[14px]"> تأكيد كلمة المرور </label>
            <div className="relative mt-2">
              <input
                type={showRePassword ? "text" : "password"}
                id="rePassword"
                className="w-full border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="تأكيد كلمة المرور"
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
              />
              <span
                onClick={toggleRePassword}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showRePassword ? <VisibilityOffIcon size={20} /> : <RemoveRedEyeIcon size={20} />}
              </span>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.rePassword}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-secondColor font-medium rounded-full text-md px-5 py-2.5 mb-2 focus:outline-none"
          >
            انشاء حساب جديد
          </button>

          <p className="text-center text-sm mt-2">
            <span>
              لديك حساب بالفعل ؟ <span className="text-secondColor cursor-pointer" onClick={onSwitchToLogin}>تسجيل دخول</span>
            </span>
          </p>
        </form>
      </Box>
    </Modal>
  );
}
