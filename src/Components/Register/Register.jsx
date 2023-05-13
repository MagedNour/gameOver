import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';

function Register(props) {


    let user = {
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: ""
    }

    const navigate = useNavigate();

    async function registerNewUser(obj) {


        try {
            let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', obj)
            console.log(data);
            if (data.message == "success") {
                $(".successMsg").fadeIn(500, function () {
                    navigate('/login')
                })
            }
        }
        catch (err) {

            $(".errMsg").fadeIn(500, function () {
                setTimeout(() => {
                    $(".errMsg").fadeOut(500)
                }, 3000);
            })

        }
    }

    let myFromik = useFormik({

        initialValues: user,

        onSubmit: function (values) {
            console.log("Submit...", values);

            registerNewUser(values);

        },

        validate: function (values) {

            let errors = {}

            if (values.name.length < 3 || values.name.length > 10) {
                errors.name = "Name must be more than 3 char and less than 10"
            }

            if (!values.email.includes('@') || !values.email.includes('.com')) {
                errors.email = "Email must be valid"
            }
            if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone = "Phone must be an Egyptian number"
            }
            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "password must be 6 to 12 characters"
            }

            if (values.password !== values.rePassword) {
                errors.rePassword = "Password and rePassword not matched"
            }


            return errors;
        }
    })


    return (
        <>
            <div className="container py-5 mt-5">


                <div style={{ 'display': 'none' }} className="errMsg alert alert-danger text-center">Account Already Exists</div>
                <div style={{ 'display': 'none' }} className="successMsg alert alert-success text-center">Congratulations</div>

                <div className="container">
                    <div className="row">


                        <div className="col-md-6 gx-0">
                            <img src={require('../../images/gaming.ebaf2ffc84f4451d.jpg')} className='w-100 h-100' alt="Gaming Logo" />
                        </div>



                        <div className="col-md-6 bg-gray py-5 px-2 register" >

                            <h4 className='text-center main-color mb-3'>Create My Account!</h4>
                            <form onSubmit={myFromik.handleSubmit}>

                                <div className="row">
                                    <div className=' col-md-6'>
                                        <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.name} id='name' type="text" className='form-control deep-dark mb-3 me-3' placeholder='name' />
                                        {myFromik.errors.name && myFromik.touched.name ? <div className='alert alert-warning text-center'>{myFromik.errors.name}</div> : ' '}
                                    </div>

                                    <div className='col-md-6'>
                                        <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.phone} id='phone' type="text" className='form-control deep-dark mb-3' placeholder='phone' />
                                        {myFromik.errors.phone && myFromik.touched.phone ? <div className='alert alert-warning text-center'>{myFromik.errors.phone}</div> : ''}
                                    </div>
                                </div>

                                <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.email} id='email' type="email" className='form-control deep-dark mb-3' placeholder='email' />
                                {myFromik.errors.email && myFromik.touched.email ? <div className='alert alert-warning text-center'>{myFromik.errors.email}</div> : ''}


                                <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.password} id='password' type="password" className='form-control deep-dark mb-3' placeholder='password' />
                                {myFromik.errors.password && myFromik.touched.password ? <div className='alert alert-warning text-center'>{myFromik.errors.password}</div> : ''}


                                <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.rePassword} id='rePassword' type="password" className='form-control deep-dark mb-3' placeholder='rePassword' />
                                {myFromik.errors.rePassword && myFromik.touched.rePassword ? <div className='alert alert-warning text-center'>{myFromik.errors.rePassword}</div> : ''}



                                <button type='submit' className='btn btn-secondary submit-btn text-white mt-3 w-100'> Create Account</button>

                            </form>
                            <div className='text-center text-muted small mt-3 border-bottom border-secondary pb-3'>
                                <span>This site is protected by reCAPTCHA and the Google </span>
                                <Link to="https://policies.google.com/privacy" target={'_blank'} class="text-secondary">Privacy Policy</Link>
                                <span> and </span>
                                <Link to="https://policies.google.com/terms" target={'_blank'} class="text-secondary">Terms of Service</Link>
                                <span> apply.</span>
                            </div>
                            <div className='text-center mt-3'>
                                <span className='main-color small'>Already a member? </span>
                                <Link to="/login" className='text-decoration-none'>{"Login >"}</Link>
                            </div>
                        </div>



                    </div>


                </div>
            </div>
        </>
    );
}

export default Register;

