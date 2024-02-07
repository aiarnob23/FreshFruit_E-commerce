import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axiosInstance from "../../../axiosConfig";
import { errorAlert } from "../../../sweetAlerts";
import side from "../../assets/Side2.jpg"

const AdminLogin = () => {
    const { GsignIn, EmailSignIn } = useContext(AuthContext);
    //-------email-pass login
    const handleManualLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        EmailSignIn(email, password)
            .then((res) => {
                checkRole(res);
            })
            .catch(error => {
                console.log(error);
                const notificationMessage = `Login Failed : ${error.message}`;
                errorAlert(notificationMessage);
            });
    }

    //google login
    const handleAdminLogin = () => {
        GsignIn()
            .then(async (res) => {
                checkRole(res);
            })
    }

    //check the role if admin or not
    const checkRole = async (res) => {
        const email = res.user.email;
        await axiosInstance.get(`/adminAccess?email=${email}`)
            .then(async (res) => {
                if (res.data) {
                    setTimeout(() => {
                        window.location.replace('/adminDashBoard');
                    }, 500)
                }
                else {
                    errorAlert('You are not an Admin!');
                    setTimeout(() => {
                        window.location.replace('/login');
                    }, 600)

                }
            })
    }

    return (
        <div className="container mx-auto">
            <div className="flex container mx-auto relative flex-row-reverse">
                <div>
                    <img className="h-[800px] hidden md:flex rounded-lg" src={side} alt="" />
                </div>
                <div className="hero md:-left-[20%] md:top-20 md:absolute">
                    <div className="hero-content  flex-col">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Admin Login!</h1>
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
                            <div className="p-2 text-gray-500">
                                sample email:  admin@gmail.com<br/>
                                sample password :  Admin@
                            </div>
                            <div>
                                <div className="text-center text-green-500">
                                    or<br />
                                    Login with Goole
                                </div>
                                <div className="text-center my-3">
                                    <button className="btn btn-success text-white" onClick={() => handleAdminLogin()}>Login</button>
                                </div>
                            </div>

                            <div>
                                {/* set error message */}
                            </div>

                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;