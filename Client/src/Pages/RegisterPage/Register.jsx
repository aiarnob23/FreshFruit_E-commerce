import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { successAlert } from "../../../sweetAlerts";

const Register = () => {

    const { GsignIn, EmailReg } = useContext(AuthContext);

    //-------email-pass register
    const handleManualRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        //const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        EmailReg(email, password)
            .then((result) => {
                console.log(result);
            })
            .catch(error => console.error(error))
    }

    //------google register
    const handleGoogleRegister = () => {
        GsignIn()
            .then((result) => {
                console.log(result);
                successAlert('Registration successful');
            })
            .catch(error => console.error(error))
    }

    //-----add new user to the DB


    //---------return body-------
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content  flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register Here!</h1>
                    </div>
                    <div className="card shrink-0  shadow-2xl bg-base-100">
                        <form onSubmit={handleManualRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="user name"
                                    name="name"
                                    className="input input-bordered"
                                    required />
                            </div>
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
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <p>Or</p>
                            <div>
                                <p>Register with <button onClick={handleGoogleRegister} className="btn  btn-success text-white">Google</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;