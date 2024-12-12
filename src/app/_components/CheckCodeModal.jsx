"use client";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

export default function CheckCodeModal({ open, onClose, onSwitchToResetPassword }) {
    const [countries, setCountries] = useState([]);
    const inputsRef = useRef([]);


    // function to get countries
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

    useEffect(() => {
        getCountries();
    }, []);

    //   to check code using api
    async function checkCode(values) {
        try {
            let { data } = await axios.post(
                `https://phpv8.aait-d.com/leak_detection/public/api/website/check-code`, values
            );
            if (data?.status === "success") {
                console.log(data);
                localStorage.setItem("formData", JSON.stringify(values));
                toast.info("رمز التحقق صحيح")
                onSwitchToResetPassword()

            }
        } catch (error) {
            console.error("Error checking code:", error);
        }
    }

    //   validation in to inputs
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

    });

    //   use formik to handle submit
    let formik = useFormik({
        initialValues: {
            phone_code: "",
            phone: "",
            code: "",
        },
        validationSchema,
        onSubmit: checkCode,
    });

    //   to handle input code 
    const handleInputChange = (e, index) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) {
            formik.setFieldValue(
                "code",
                formik.values.code.substring(0, index) +
                value +
                formik.values.code.substring(index + 1)
            );

            if (index < inputsRef.current.length - 1) {
                const nextInput = inputsRef.current[index + 1];
                if (nextInput) nextInput.focus();
            }
        } else {
            e.target.value = "";
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value) {
            if (index > 0) {
                const previousInput = inputsRef.current[index - 1];
                if (previousInput) previousInput.focus();
            }
        }
    };

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
                    تأكيد الهوية
                </Typography>
                <Typography variant="body1" style={{ 'textAlign': 'center', 'margin': '0 0 20px 0', 'color': '#ABABAB' }}> ادخل الكود المرسل إليك من خلال رقم الهاتف</Typography>
                <form onSubmit={formik.handleSubmit}>
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
                    <div className="flex justify-center gap-2 my-7">
                        {[0, 1, 2, 3].map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                id="code"
                                maxLength="1"
                                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl"
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                value={formik.values.code[index] || ""}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-secondColor font-medium rounded-full text-md px-5 py-2.5 mb-2 focus:outline-none"
                    >
                        إرسال
                    </button>
                </form>
            </Box>
        </Modal>
    )
}
