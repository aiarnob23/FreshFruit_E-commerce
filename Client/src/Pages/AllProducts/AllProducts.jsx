
import axiosInstance from "../../../axiosConfig";
import SingleProduct from "../../SharedComponents/SingleProduct/SingleProduct";
import { useEffect, useState } from "react";

const AllProducts = () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [size, setSize] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    axiosInstance.get('/fruitsLength')
    .then(res=>{
        console.log(res.data);
        setSize((res.data).length);
        //setSize((res.data).length);
    })

    useEffect(()=>{
        setPages(Math.ceil(size/12));
        handleDisplayProduct(1);
      },[size])

    



    const handleDisplayProduct = async(pageNo) =>{
        setCurrentPage(pageNo);
      await axiosInstance.get(`/fruits?page=${pageNo}&size=12`)
         .then(res=> {
            setData(res.data);
         })

    }

  

    


    return (
      <div className="container p-2 md:p-4 lg:p-0 mx-auto">
          <div className=" grid md:grid-cols-2  lg:grid-cols-4 gap-4">
            {
                data && data.map(fruit=><SingleProduct
                key={fruit._id}
                fruit={fruit}>

                </SingleProduct>)
            }
        </div>
        <div className="mt-4">
            {/* pagination */}
            
            <div className="w-full items-center justify-center flex gap-4">
            <p className="text-xl">Page:</p>
            {Array.from({ length: pages }).map((_, index) => (
                    <button onClick={()=>handleDisplayProduct(index+1)} className={`btn ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`} key={index + 1}>{index + 1}</button>
                ))}
            </div>
        </div>
      </div>
    );
};

export default AllProducts;