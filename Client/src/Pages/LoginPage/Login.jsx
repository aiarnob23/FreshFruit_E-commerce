import { useContext } from "react";
import side from "../../assets/Side2.jpg"

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { errorAlert, successAlert } from "../../../sweetAlerts";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { EmailSignIn, GsignIn } = useContext(AuthContext);

    //-------email-pass login
    const handleManualLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        EmailSignIn(email, password)
            .then((result) => {
                console.log(result);
                const notificationMessage = 'Login Successful'
                successAlert(notificationMessage);
                setTimeout(() => {
                    navigateToRoutes();
                }, 600);

            })
            .catch(error => {
                console.log(error);
                const notificationMessage = `Login Failed : ${error.message}`;
                errorAlert(notificationMessage);
            });
    }
    //-----google login
    const GLogIn = async () => {
        GsignIn()
            .then(result => {
                console.log(result);
                const notificationMessage = 'Login Successful'
                successAlert(notificationMessage);
                setTimeout(() => {
                    navigateToRoutes();
                }, 600);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //----------navigate to desired route-----
    const navigateToRoutes = () => {
        navigate(location?.state ? location.state : '/')
    }


    //-------return body-------
    return (
        <div className="flex container mx-auto relative flex-row-reverse">
            <div>
                <img className="h-[800px] hidden md:flex rounded-lg" src={side} alt="" />
            </div>
            <div className="hero md:-left-[20%] md:top-20 md:absolute">
                <div className="hero-content  flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login First!</h1>
                    </div>
                    <div className="card shrink-0  shadow-2xl bg-base-100">
                        <form onSubmit={handleManualLogin} className="card-body">
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success text-white">Login</button>
                            </div>
                        </form>
                        <div>
                            <p className="text-center">Or</p>
                            <div>
                                <p className="text-center">Login with <br/><button onClick={GLogIn} className="btn my-4 btn-success text-white">Google</button></p>
                            </div>
                        </div>

                        <div>
                            {/* set error message */}
                        </div>

                    </div>
                    <div>
                Are you admin?
                <Link to='/adminLogin'><button className="btn">Admin Login</button></Link>
            </div>
                </div>
              
            </div>
         
        </div>
    );
};

export default Login;