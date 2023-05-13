import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login({ getUserData, crrUser }) {


    let user = {
        email: "",
        password: ""
    }

    useEffect(function () {
        if (crrUser) {
            navigate('/home')
        }
    }, [])

    const navigate = useNavigate();

    async function loginUser(obj) {

        try {

            let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin', obj)

            if (data.message == "success") {
                console.log("Hello", data.token);

                localStorage.setItem('tkn', data.token);

                getUserData();

                $(".successMsg").fadeIn(500, function () {
                    navigate('/home')
                })
            }
        }
        catch (err) {
            console.log('WE have an error');

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

            loginUser(values);

        },

        validate: function (values) {

            let errors = {}

            if (!values.email.includes('@') || !values.email.includes('.com')) {
                errors.email = "Email must be valid"
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "password must be 6 to 12 characters"
            }


            return errors;
        }
    })


    return (
        <>
            <div className="container py-5 mt-5">


                <div style={{ 'display': 'none' }} className="errMsg alert alert-danger text-center">Email or Password incorrect</div>
                <div style={{ 'display': 'none' }} className="successMsg alert alert-success text-center">Congratulations</div>

                <div className="container">
                    <div className="row">


                        <div className="col-md-6 gx-0">
                            <img src={require('../../images/gaming.ebaf2ffc84f4451d.jpg')} className='w-100 h-100' alt="Gaming Logo" />
                        </div>



                        <div className="col-md-6 bg-gray  py-5 px-2" >
                            <div className="container px-5">
                                <div className="text-center">
                                    <img src={require('../../images/logo (1).png')} style={{ height: '72px' }} alt="Logo" />
                                    <h4 className='main-color mb-3'>Login to GameOver</h4>
                                </div>
                                <form onSubmit={myFromik.handleSubmit} className='border-bottom border-secondary pb-3'>



                                    <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.email} id='email' type="email" className='form-control mb-3' placeholder='email' />
                                    {myFromik.errors.email && myFromik.touched.email ? <div className='alert alert-warning text-center'>{myFromik.errors.email}</div> : ''}


                                    <input onBlur={myFromik.handleBlur} onChange={myFromik.handleChange} value={myFromik.values.password} id='password' type="password" className='form-control mb-3' placeholder='password' />
                                    {myFromik.errors.password && myFromik.touched.password ? <div className='alert alert-warning text-center'>{myFromik.errors.password}</div> : ''}



                                    <button type='submit' className='btn btn-secondary submit-btn text-white mt-3 w-100'> Login</button>

                                </form>
                                <div class="text-center">
                                    <Link onClick={function(){alert("Create a new Account")}} class="small">Forgot Password?</Link>
                                </div>
                                <div class="text-center mt-3 main-color">
                                    <span class="small">Not a member yet? </span>
                                    <Link  to="/register" class="small"> {'Create Account>'} </Link>
                                    
                                    </div>
                            </div>
                        </div>



                    </div>


                </div>
            </div>
        </>
    );
}

export default Login;

