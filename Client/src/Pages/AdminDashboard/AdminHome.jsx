import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../axiosConfig';
import ProductsHandle from './ProductsHandle';
import { useContext } from 'react';
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AdminHome = () => {
    const {user,SignOut} = useContext(AuthContext)

    const handleLogOut = () =>{
        SignOut()
        .then(res=>{
            console.log(res);
            window.location.replace('/login');
        })
    }

    //mutation for adding a new fruit
    const addNewFruitMutation = useMutation({
        mutationFn:(newFruit)=>{
            return axiosInstance.post('/fruits', newFruit,{withCredentials:true})
        },
       onSuccess:()=>{
         refetch();
       }
    })

    const handleAddnewFruit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const image = form.image.value;

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
                <h1 className='text-2xl text-green-600 font-semibold text-center mb-1'>Admin Home</h1>
            </div>
            <div>
            <p>{user?.displayName}</p>
                <button onClick={handleLogOut} className='btn'>Log Out</button>
            </div>
            <div>
                <h2 className='text-green-600 text-xl font-medium'>Add a product</h2>
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
                <div className='grid grid-cols-4 gap-4 '>
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