import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { setInitProject } from "../Js/project.js";
import { createDefaultIcon, registerInApplication, signInWithGoogle } from "../Js/user";
import Spline from '@splinetool/react-spline';
import { FcGoogle } from "react-icons/fc";


const Login = () => {

    //-------------------------------------
    //------------ VARIABLES --------------
    //-------------------------------------
    const authLogin = getAuth();
    const navigate = useNavigate();

    //---------------------------------
    //------------ HOOKS --------------
    //---------------------------------

    //-------------------------------------
    //------------ FUNCTIONS --------------
    //-------------------------------------
    /**
     * Sign in con la cuenta de la aplicaión.
     */
    function signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(authLogin, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    /**
     * Sign in con google.
     */
    const handleSignInWithGoogle = () => {
        signInWithGoogle(navigate); 
    }

    //------------------------------------------
    //-------------- COMPONENT -----------------
    //------------------------------------------
    return (
        // <>
        //     <div className=" w-screen h-screen flex bg-fondos overflow-hidden">
        //         <Spline className="mt-10" scene="https://prod.spline.design/UGqjL7ZSlLACfNhg/scene.splinecode" />
        //         <div className="text-white fixed top-36 right-52 font-bold text-8xl">Colaborate with people</div>
        //         <div className=" flex flex-col bg-transparent border-2 p-3 border-blue-900 rounded-md w-96 h-auto justify-center items-center fixed right-64 top-64 mt-16">
        //             <h1 className="text-white text-4xl font-semibold mt-2">Login</h1>
        //             <div className="flex flex-col mt-6 w-full ">
        //                 <label className="text-gray-200 text-xl">Gmail</label>
        //                 <input id="email" type="email" className="border rounded-md bg-transparent h-10 pl-3 text-white"></input>
        //             </div>
        //             <div className="flex flex-col mt-3 w-full">
        //                 <label className="text-gray-200 text-xl">Password</label>
        //                 <input id="password" type="password" className="border rounded-md bg-transparent h-10 w-full pl-3 text-white"></input>
        //             </div>
        //             <button className="hover:scale-105 hover:shadow-lg transition-all w-full h-10 bg-green-500 rounded-md border text-white mt-3" onClick={signIn}>Submit</button>
        //             <button className="hover:scale-105 hover:shadow-lg transition-all cursor-pointer bg-white text-black rounded-md w-full h-10 mt-3 items-center justify-start flex"  onClick={signInWithGoogle}><FcGoogle className="ml-3" size={28}/><div className="ml-28">Google</div> </button>
        //             <Link to="/register" className="hover:scale-105 hover:shadow-lg transition-all cursor-pointer w-full"><button className="bg-gray-400 text-white rounded-md w-full h-10 mt-3 border">Register</button></Link>
        //         </div>

        //     </div>
            <>
            <div className="container mx-auto px-12">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={signIn}>Sign in</button>
                            </div>
                        </form>

                        {/* <!-- Divider --> */}
                        <div
                            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p
                                className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                OR
                            </p>
                        </div>

                        {/* <!-- Social login buttons --> */}
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSignInWithGoogle}>Sign in with  Google</button>

                        {/* Link to register */}
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?<Link to={`/register/`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
                        </p>


                    </div>


                </div>
            </div>
        </>
        // </>
    )
}

export default Login;