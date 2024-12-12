"use client";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { toast } from "react-toastify";

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

export default function ResetPasswordModel({ open, onClose, onSwitchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);


    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleRePassword = () => {
        setShowRePassword(!showRePassword);
    };


    async function updatePassword(values) {
        if (values.password !== values.rePassword) {
            toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
            return;
        }

        const storedData = JSON.parse(localStorage.getItem("formData"));

        let dataToSend = {
            _method: "PATCH",
            phone_code: storedData.phone_code,
            phone: storedData.phone,
            code: storedData.code,
            password: values.password,
        };

        try {
            let data = await axios.post(
                `https://phpv8.aait-d.com/leak_detection/public/api/client/reset-password`,
                dataToSend
            );
            if (data?.status === 200) {
                toast.info('تم تعديل كلمه المرور');
                onSwitchToLogin()
            }
        } catch (error) {
            toast.error('حدث خطأ أثناء تعديل كلمة المرور');
        }
    }

    let validationSchema = Yup.object({
        password: Yup.string()
            .matches(/^\d{6,}$/, "كلمة المرور يجب أن تكون مكونة من 6 أرقام أو أكثر")
            .required("كلمة المرور مطلوبة"),
    });

    let formik = useFormik({
        initialValues: {
            _method: "PATCH",
            phone_code: localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")).phone_code : '',
            phone: localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")).phone : '',
            code: localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")).code : '',
            password: "",
            rePassword: ''
        },
        validationSchema,
        onSubmit: updatePassword,
    });
    


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
                <Typography variant="h4" gutterBottom style={{ 'textAlign': 'center', 'fontSize': '28px', 'fontWeight': 'bold' }}>
                    تغيير كلمة المرور
                </Typography>

                <form
                    className="w-full"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-6">
                        <label className="text-[14px]"> كلمة المرور</label>
                        <div className="relative mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
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
                    </div>

                    <div className="mb-6">
                        <label className="text-[14px]"> تأكيد كلمة المرور </label>
                        <div className="relative mt-2">
                            <input
                                type={showRePassword ? "text" : "password"}
                                id="rePassword"
                                className="w-full border border-gray-100 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                            />
                            <span
                                onClick={toggleRePassword}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {showRePassword ? (
                                    <VisibilityOffIcon size={20} />
                                ) : (
                                    <RemoveRedEyeIcon size={20} />
                                )}
                            </span>
                        </div>
                        {formik.errors.rePassword && formik.touched.rePassword ? (
                            <p
                                id="filled_success_help"
                                className="text-xs text-red-600 dark:text-red-400"
                            >
                                {formik.errors.rePassword}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-secondColor font-medium rounded-full text-md px-5 py-2.5 mb-2 focus:outline-none"
                    >
                        تاكيد
                    </button>
                </form>
            </Box>
        </Modal>
    );
}
