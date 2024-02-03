import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosConfig';
import ProductsHandle from './ProductsHandle';


const AdminHome = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['allFruits'],
        queryFn: () =>
            axiosInstance.get('/fruits')
                .then(res => {
                    return res.data;
                })
    })


    if (isLoading) return 'Loading...'

    if (error) return window.location.replace('/login')
    return (
        <div className='container mx-auto my-8'>
            <div>
                <h2 className='text-green-700 text-xl font-medium'>Add a product</h2>
                <div>
                    <form>
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='Name' name='name' required />   <br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="number" placeholder='quantity' name='quantity' required /><br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='price' name='price' required /><br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='image' name='image' required /><br />
                        <button className='btn btn-outline btn-primary'>Add</button>
                    </form>
                </div>
            </div>
          <div>
            <h2 className='text-xl text-green-700 font-semibold text-center my-5'>Available Products</h2>
          <div className='grid grid-cols-4 gap-4 '>
                {
                    data.map(fruit => <ProductsHandle
                        key={fruit._id}
                        product={fruit}
                    ></ProductsHandle>)
                }
            </div>
          </div>
        </div>
    );
};

export default AdminHome;