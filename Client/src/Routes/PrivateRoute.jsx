import { useContext } from "react";
import PropTypes from 'prop-types';

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span><span className="loading loading-bars loading-lg"></span></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
}