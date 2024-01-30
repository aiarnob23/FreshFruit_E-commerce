import { useQuery } from '@tanstack/react-query';
import banner from '../../../src/assets/Banner.jpg'

const HomePage = () => {

    // get sample fruits
    const { isLoading, error, data } = useQuery({
        queryKey: ['sampleFruits'],
        queryFn: () =>
            fetch('https://api.github.com/repos/TanStack/query').then((res) =>
                res.json(),
            ),
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
                <h2>Available Fruits</h2>
                {data.length}
            </div>



        </div>
    );
};

export default HomePage;