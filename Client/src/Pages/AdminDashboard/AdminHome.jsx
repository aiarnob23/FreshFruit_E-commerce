import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosConfig';
import ProductsHandle from './ProductsHandle';
import { successAlert } from '../../../sweetAlerts';

// import Navbar from '../../SharedComponents/Navbar';

const AdminHome = () => {
    //mutation for adding a new fruit
    const addNewFruitMutation = useMutation({
        mutationFn:(newFruit)=>{
            return axiosInstance.post('/fruits', newFruit,{withCredentials:true})
        },
       onSuccess:()=>{
         refetch();
         successAlert('Successfully added product');
       }
    })

    const handleAddnewFruit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const image = form.image.value;
        form.name.value="";
        form.quantity.value="";
        form.price.value="";
        form.image.value="";
        addNewFruitMutation.mutate({name,quantity,price, image});
    }

        //getting all fruits from DB
        const { isLoading, error, data, refetch } = useQuery({
            queryKey: ['allFruits'],
            queryFn: () =>
                axiosInstance.get('/fruits')
                    .then(res => {
                        return res.data;
                    })
        })
    
        if (isLoading) return 'Loading...'
    
        if (error) return error
    return (
        <div className='container mx-auto my-8'>
            <div>
                <h2 className='text-xl text-green-600 font-semibold text-center my-5'>Add a product</h2>
                <div>
                    <form onSubmit={handleAddnewFruit}>
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='Name' name='name' required />   <br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="number" placeholder='quantity' name='quantity' required /><br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='price' name='price' required /><br />
                        <input className='border-2 my-1 rounded-lg border-green-500 p-2' type="text" placeholder='image' name='image' required /><br />
                        <button type='submit' className='btn btn-outline btn-success'>Add</button>
                    </form>
                </div>
            </div>
            <div>
                <h2 className='text-xl text-green-600 font-semibold text-center my-5'>Available Products</h2>
                <div className='grid p-2 md:p-4 lg:p-0 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                    {
                        data.map(fruit => <ProductsHandle
                            key={fruit._id}
                            product={fruit}
                            refetch={refetch}
                        ></ProductsHandle>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminHome;