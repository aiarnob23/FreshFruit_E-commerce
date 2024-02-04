import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Cart = () => {
    const {user} = useContext(AuthContext);
    //Handle cart products

     
    const handlePayment =async () => {
      const data = { price: 150 };
      
      await axiosInstance.post('/init',data,{withCredentials:true})
      .then(res=>{
        window.location.replace(res.data.url);
      })
  }


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
            <div>
                <div onClick={handlePayment} className="btn btn-warning">Pay with SSLCommerz</div>
            </div>
        </div>
    );
};

export default Cart;