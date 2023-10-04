import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { auth, db } from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { checkIfEmail, checkIfNotEmpty } from "../Js/common";
import { createDefaultIcon, registerInApplication, signInWithGoogle } from "../Js/user";
import { setInitProject } from "../Js/project";

const Register = () => {

    const authForRegister = auth;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate = useNavigate();



    /**
     * Registrar a la aplicación
     */
    function registerInApplication() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('userName').value;

        createUserWithEmailAndPassword(authForRegister, email, password)
            .then(async (user) => {
                const displayName = name;
                const uid = user.user.reloadUserInfo.localId;;
                const eMail = user.user.email;
                const data = {
                    name: displayName,
                    uid: uid,
                    e_mail: eMail,
                    avatar: createDefaultIcon(name),
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                };

                const res = await db.collection('users').doc(uid).set(data);
                setInitProject(uid, displayName);
                navigate("../dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    // const handleRegisterWithEmail = () => {
    //     const emailInput = document.getElementById('email').value;
    //     const passwordInput = document.getElementById('password').value;
    //     const nameInput = document.getElementById('userName').value;
    //     registerInApplication(auth, emailInput, passwordInput, nameInput, navigate); // navigateを引数として渡す
    // }

    const handleSignInWithGoogle = () => {
        signInWithGoogle(navigate); // navigateを引数として渡す
    }

    function handleSubmit(e) {
        e.preventDefault();
    };

    // signInWithGoogle(navigate);

    /**
     * Handler para verificar si el password es valido. 
     * 
     * @param {*} event 
     */
    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        // Validar la contraseña
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        setPasswordValid(passwordValue === "" || passwordRegex.test(passwordValue));
    }

    function verifyData() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password2 = document.getElementById('email').value;

        checkIfNotEmpty(username);
        checkIfNotEmpty(email);
        checkIfEmail(email);
    }

    return (
        <>
            {/* <h1>Register</h1>
            <label>nombre usuario</label>
            <input id="userName" type="text" style={{ background: 'gray' }}></input>
            <label>correo</label>
            <input id="email" type="email" style={{ background: 'gray' }} ></input>
            <label>contraseña</label>
            <input id="password" type="password" style={{ background: 'gray' }} onChange={handlePasswordChange}></input>
            {!passwordValid && password !== "" && <div style={{color: 'red'}}>La contraseña es demasiado débil</div>}
            <label>Repetir contraseña</label>
            <input id="password2" type="password" style={{ background: 'gray' }}></input>
            <button style={{ background: 'green', marginLeft: '20px' }} onClick={registerInApplication}>Submit</button>
            <br></br>
            <div style={{ marginTop: '30px', padding: '20px' }}>
                <button style={{ background: 'gray' }}>Google</button>
                <button style={{ background: 'blue' }}>Facebook</button>
                <button style={{ background: 'black', color: 'white' }}>Github</button>


                <Link to="/"><button style={{ marginLeft: '50px', background: 'purple' }}>LoginPage</button></Link>
            </div> */}
            <div className="container mx-auto px-12">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-4" onSubmit={e => handleSubmit(e)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">User name</label>
                                </div>
                                <div className="mt-2">
                                    <input id="userName" name="userName" type="text" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={registerInApplication}>Register</button>
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
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSignInWithGoogle}>Register with  Google</button>


                        <p className="mt-10 text-center text-sm text-gray-500">
                            Have an acount?<Link to={`/`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
                        </p>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Have an acount?<Link to={`/dashboard`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">home for dev</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register;
