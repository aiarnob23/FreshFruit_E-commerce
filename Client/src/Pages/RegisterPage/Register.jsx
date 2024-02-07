import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import {successAlert } from "../../../sweetAlerts";
import side from "../../assets/Side1.jpg"

const Register = () => {

    const { GsignIn, EmailReg } = useContext(AuthContext);
    const [error, setRegError] = useState('');
    //-------email-pass register
    const handleManualRegister = (e) => {
        setRegError('');
        e.preventDefault();
        const form = e.target;
        //const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            setRegError('Password should be at least 6 characters');
            return;
        }
        else if (!(/[A-Z]/.test(password))) {
            setRegError('Password should have at least one upper case character');
            return;
        }
        else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
            setRegError('Password should contain at least one special character');
            return;
        }

        EmailReg(email, password)
            .then(() => {
                successAlert('Registration is Successfull');
                LoadHomePage();
            })
            .catch(error => console.error(error))
    }

    //------google register
    const handleGoogleRegister = () => {
        setRegError('');
        GsignIn()
            .then((result) => {
                console.log(result);
                successAlert('Registration successful');
                LoadHomePage();
            })
            .catch(error => setRegError(`${error.message}`))
    }

    const LoadHomePage = () => {
        setTimeout(() => {
            window.location.replace('/');
        }, 1500);
    }

    //---------return body-------
    return (
        <div className=" flex items-center container mx-auto justify-center">
            <div className="hidden -mr-36 lg:flex ">
                <img className="h-[800px]" src={side} alt="" />
            </div>
            <div className="hero lg:-ml-48">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl text-green-600 font-bold">Register Here!</h1>
                    </div>
                    <div className="card shrink-0  shadow-2xl bg-base-100">
                        <form onSubmit={handleManualRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success text-white">Register</button>
                                <div className="text-red-500 my-2">
                                    {
                                        error && error
                                    }
                                </div>
                            </div>
                        </form>
                        <div>
                            <p className="text-center">Or</p>
                            <div>
                                <p className="text-center mb-6"><span className="">Register with</span><br /> <button onClick={handleGoogleRegister} className="btn mt-2 btn-success text-white">Google</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;