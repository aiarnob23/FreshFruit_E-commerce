import '../SearchPage/SearchProduct.css'
import { AiOutlineSearch } from "react-icons/ai";
import axiosInstance from '../../../axiosConfig';
import { useState } from 'react';
import SingleProduct from '../../SharedComponents/SingleProductView/SingleProduct';


const SearchProduct = () => {
    const [fruitViaResult, setFruits] = useState([]);

    // get fruits by search key
    const handleSearchFruit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const searchKey = (form.inputField.value).toLowerCase();
        form.inputField.value = '';
        axiosInstance.get(`/fruitSearch?tags=${searchKey}`)
        .then(res=>{
            console.log(res.data)
            setFruits(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    return (
        <div className="searchBody container mx-auto">
            {/* search input field */}
            <div className='my-10'>
                <form onSubmit={handleSearchFruit}>
                    <div className='flex justify-center items-center'>
                        <input type="text"
                            placeholder="Type here"
                            name='inputField'
                            className="input input-bordered input-success w-full max-w-xs" />
                        <button className='text-3xl -mx-8 text-green-600 ' type='submit'><AiOutlineSearch /></button>
                    </div>
                </form>
            </div>

            {/* display search results */}
            <div className='grid grid-cols-4 gap-4'>
                {
                    fruitViaResult?.map(fruit=><SingleProduct 
                    key={fruit._id}
                    fruit={fruit}>

                    </SingleProduct>)
                }
            </div>

        </div>
    );
};

export default SearchProduct;