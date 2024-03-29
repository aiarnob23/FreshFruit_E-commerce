import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axiosInstance from "../../axiosConfig";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    //handle states 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    //handle Email-pass Register 
    const EmailReg = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //handle Email-pass Login
    const EmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //handle login and register with Google
    const provider = new GoogleAuthProvider();
    const GsignIn = () => {
        return signInWithPopup(auth, provider);
    }
    //handle logOut
    const SignOut = async() => {
        return await signOut(auth);
    }

    //onAuth state change handler
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if(currentUser){
                axiosInstance.post('/jwt',{
                    user:currentUser?.email,
                },{
                    withCredentials:true,
                })
                .then(res=>{
                    console.log(res);
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        })
        return () => unsubscribe();
    })

    const authInfo = {
        GsignIn,
        SignOut,
        EmailReg,
        EmailSignIn,
        loading,
        user,
        setUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
}