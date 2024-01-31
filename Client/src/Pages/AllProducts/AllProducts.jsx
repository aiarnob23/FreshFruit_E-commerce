import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";
import SingleProduct from "../../SharedComponents/SingleProductView/SingleProduct";

const AllProducts = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const { isLoading, error, data } = useQuery({
        queryKey: ['allFruits'],
        queryFn: () =>
         axiosInstance.get('/fruits')
         .then(res=> {
            return res.data;
         })
      })

    
      if (isLoading) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message


    return (
        <div className="container grid grid-cols-4 gap-4 mx-auto">
            {
                data.map(fruit=><SingleProduct
                key={fruit._id}
                fruit={fruit}>

                </SingleProduct>)
            }
        </div>
    );
};

export default AllProducts;