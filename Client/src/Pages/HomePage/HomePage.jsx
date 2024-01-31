import { useQuery } from '@tanstack/react-query';
import banner from '../../../src/assets/Banner.jpg';
import axiosInstance from '../../../axiosConfig';
import { Link } from 'react-router-dom';


const HomePage = () => {

    // get sample fruits
    const { isLoading, error, data } = useQuery({
        queryKey: ['sampleFruits'],
        queryFn: async () =>
            axiosInstance.get(`/fruitsSample`)
                .then(res => {
                    return res.data;
                })
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="container px-2 md:px-6 lg:px-0 lg:mx-auto">
            {/* ------Banner-------  */}
            < div className='rounded-lg'>
                <div className="hero bg-fit bg-no-repeat h-[200px] md:h-[360px] lg:h-[700px] rounded-lg" style={{ backgroundImage: `url(${banner})` }}>
                    <div className="hero-overlay rounded-lg bg-opacity-20"></div>
                    <div className="hero-content rounded-lg text-center text-neutral-content">
                        <div className="rounded-lg max-w-md">
                        </div>
                    </div>
                </div>
            </div>

            {/* ------fruits sample view------- */}
            <div className='my-12'>
                <h2 className='text-2xl font-semibold text-green-700 text-center my-8'>You May Like</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {
                    data.map(fruit => <div
                        key={fruit._id}>
                        <div className="card h-[300px] card-compact bg-base-100 shadow-xl">
                            <figure><img className='max-h-[200px] w-[300px] rounded-lg object-contain' src={fruit.image} alt={fruit.name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{fruit.name}</h2>
                                <p>Quantity: {fruit.quantity}</p>
                                <p>Price: {fruit.price} $</p>
                            </div>
                        </div>
                    </div>)
                }
              </div>
              <div className='w-full text-center'>
                <Link><button className='btn bg-green-600 text-white my-4'>View All Products</button></Link>
              </div>
            </div>



        </div>
    );
};

export default HomePage;