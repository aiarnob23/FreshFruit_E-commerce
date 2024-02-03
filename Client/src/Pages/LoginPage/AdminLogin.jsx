import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axiosInstance from "../../../axiosConfig";
import { errorAlert } from "../../../sweetAlerts";

const AdminLogin = () => {
    const {GsignIn} = useContext(AuthContext);

    const handleAdminLogin=()=>{
        GsignIn()
        .then(async(res)=>{
            const email = res.user.email;
           await axiosInstance.get(`/adminAccess?email=${email}`)
            .then(async(res)=>{
                if(res.data){
                    setTimeout(()=>{
                        window.location.replace('/adminDashBoard');
                    },500)
                }
                else{
                    errorAlert('You are not an Admin!');
                    setTimeout(()=>{
                        window.location.replace('/login');
                    },600)
                    
                }
            })
        })
    }
   
    return (
        <div className="container mx-auto">
           <button className="btn" onClick={()=>handleAdminLogin()}>Login</button>
        </div>
    );
};

export default AdminLogin;