import '../SearchPage/SearchProduct.css'
import { AiOutlineSearch } from "react-icons/ai";


const SearchProduct = () => {
    return (
        <div className="searchBody container mx-auto">
            {/* search input field */}
            <div className='my-10'>
            <form action="">
           <div className='flex justify-center items-center'>
           <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
            <button className='text-3xl -mx-8 text-green-600 ' type='submit'><AiOutlineSearch/></button>
           </div>
            </form>
            </div>

        </div>
    );
};

export default SearchProduct;