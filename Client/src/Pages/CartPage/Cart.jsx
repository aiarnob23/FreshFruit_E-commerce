import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'

const Cart = () => {
  const { user } = useContext(AuthContext);
  //Handle cart products


  const handlePayment = async () => {
    const data = { price: 150 };

    await axiosInstance.post('/init', data, { withCredentials: true })
      .then(res => {
        window.location.replace(res.data.url);
      })
  }
  

  const handleDeleteProductFromCart = (id)=>{

      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              axiosInstance.delete(`/cart/${id}`, {
                  withCredentials: true,
              })
                  .then((res) => {
                      console.log(res.data);
                      Swal.fire({
                          title: "Deleted!",
                          text: "Deleted Successfully",
                          icon: "success",
                          timer:1000
                      });
                      refetch();
                  })
          }
      });
  }

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['userCart'],
    queryFn: async () =>
      axiosInstance.get(`/cart?email=${user?.email}`, {
        withCredentials: true,
      })
        .then(res => {
          return res.data;
        })
        .catch(error => {
          console.log(error);
        })
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="container p-2 md:p-4 lg:p-0 min-h-screen md:flex mx-auto">
    <div className="md:w-[80%] grid lg:grid-cols-2 gap-2 md:mr-7">
    {
        data.map(product => <div className="my-2"
          key={product._id}>
          <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className="h-[200px] w-[200px]" src={product.image} /></figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price} $</p>
              <div className="card-actions justify-end">
                <button onClick={()=>handleDeleteProductFromCart(product._id)} className="btn bg-red-500 text-white">Delete</button>
              </div>
            </div>
          </div>
        </div>)
      }
    </div>
      <div className="md:flex md:w-[20%] md:my-16 md:justify-center">
        <div onClick={handlePayment} className="btn btn-warning">Pay with SSLCommerz</div>
      </div>
    </div>
  );
};

export default Cart;