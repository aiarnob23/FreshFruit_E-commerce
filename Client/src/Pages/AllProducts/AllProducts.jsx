import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";

const AllProducts = () => {

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
        <div className="container mx-auto">
            {data.length}
        </div>
    );
};

export default AllProducts;