import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axiosInstance from "../../../axiosConfig";
import { errorAlert } from "../../../sweetAlerts";

const AdminLogin = () => {
    const {GsignIn,setAdminStatus} = useContext(AuthContext);

    const handleAdminLogin=()=>{
        GsignIn()
        .then((res)=>{
            const email = res.user.email;
            axiosInstance.get(`/adminAccess?email=${email}`)
            .then(async(res)=>{
                const userCheck =await res.data;
                const roleCheck = userCheck[0]?.role|| 'null';
                console.log(roleCheck);
                if(roleCheck=='admin'){
                    setAdminStatus(true);
                    window.location.replace('/adminDashBoard');
                }
                else{
                    setAdminStatus(false);
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