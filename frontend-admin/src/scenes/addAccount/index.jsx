//adding account component

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from "react-toastify";

const AddAccount = () => {

	const[username, setUsername] = useState("")
	const[password, setPassword] = useState("")
	const[email, setEmail] = useState("")
	const[phoneNumber, setPhoneNumber] = useState("")
	const[address, setAddress] = useState("")
	const[name, setName] = useState("")
	const[adminID, setAdminID] = useState("")
	const [data, setData] = useState([]);
	const usenavigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {

	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("theFuckingToken")},
		body: JSON.stringify({username: values.username, password: values.password, email: values.email, phoneNumber: values.phoneNumber, address: values.address, name: values.name, area: values.area}),
	};

	const fetchData = await fetch(
		"http://127.0.0.1:8000/center/create", requestOptions
	);

	const data = await fetchData.json();
	setData(data);
	toast.success("Cấp tài khoản thành công!");
	usenavigate('/');

  };

  if (data.detail != null) {
	return <>{<Navigate to='/login'/>}</>
}

  return (
    <Box m="20px">
      <Header title="Thêm mới tài khoản" subtitle="Cung cấp tài khoản cho các trung tâm đăng kiểm mới" />
	  <ToastContainer theme='colored' position='top-center'></ToastContainer>      
               
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên đăng nhập"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
			 
			   <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
			  <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
			  
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên trung tâm đăng kiểm"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Khu vực"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.area}
                name="area"
                error={!!touched.area && !!errors.area}
                helperText={touched.area && errors.area}
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
			  
			  
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo tài khoản mới
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("Bắt buộc"),
  password: yup.string().required("Bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Bắt buộc"),
  address: yup.string().required("Bắt buộc"),
  name: yup.string().required("Bắt buộc"),
  area: yup.string().required("Bắt buộc"),
});


const initialValues = {
  username: "",
  password: "",
  email: "",
  phoneNumber: "",
  address: "",
  name: "",
  area: "",
};



export default AddAccount;