import { useContext, useEffect, useState} from "react";
import axiosInstance from "../../../axiosConfig";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import AdminHome from '../AdminDashboard/AdminHome';

const AdminDashboard = () => {
  const {user} = useContext(AuthContext);
  console.log(user?.email);
  const [data,setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/adminAccess?email=${user?.email}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [user]);

   if(data) return(
    <div>
      <AdminHome></AdminHome>
    </div>
   )

  return(
    <div>
      Loading........
    </div>
  )
 

};

export default AdminDashboard;