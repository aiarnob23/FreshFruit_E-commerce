import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Cart = () => {
    const {user} = useContext(AuthContext);
    //Handle cart products

    const { isPending, error, data } = useQuery({
        queryKey: ['userCart'],
        queryFn: async() =>
          axiosInstance.get(`/cart?email=${user?.email}`,{
            withCredentials:true,
          })
          .then(res=>{
            return res.data;
          })
          .catch(error=>{
            console.log(error);
          })
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
    return (
        <div>
            caartt
            {
                data.length
            }
        </div>
    );
};

export default Cart;