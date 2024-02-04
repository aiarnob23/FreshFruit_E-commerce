import { Link, NavLink } from "react-router-dom";
import '../Navbar/Navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider"

const Navbar = () => {
    const { user, SignOut} = useContext(AuthContext);

    //function for sign out user
    const logOut = () => {
        SignOut()
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error))
    }
    const NavLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/products'>All Products</NavLink></li>
        <li><NavLink to='/search'>Search</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to='/login'>login</NavLink></li>
        <li><NavLink to='/cart'>Cart</NavLink></li>
    </>
    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul id="navs" tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {NavLinks}
                        </ul>
                    </div>
                    <a className="btn text-[#008000] btn-ghost text-xl">Fresh Fruits</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul id="navs" className="menu menu-horizontal px-1">
                        {NavLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <><div>
                                <p>{user.displayName}</p>
                                <button onClick={logOut} className="btn btn-ghost text-[#008000]">Sign Out</button>
                            </div></>
                            :
                            <><div>
                                <Link to='/login'><button className="btn btn-ghost text-[#008000]">Login</button></Link>
                            </div></>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;