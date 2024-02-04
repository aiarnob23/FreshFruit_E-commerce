import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosConfig';
import Swal from 'sweetalert2'


const ProductsHandle = ({ product, refetch }) => {

    const { name, price, quantity, image, _id } = product;

    const deleteProduct = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/fruits/${_id}`, {
                    withCredentials: true,
                })
                    .then((res) => {
                        console.log(res.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Deleted Successfully",
                            icon: "success",
                            timer:1000
                        });
                        refetch();
                    })

            }
        });
    }

    return (
        <div>
            <div className="card card-compact  bg-base-100 shadow-xl">
                <figure><img className="h-[200px] m-4 w-[200px] rounded-lg" src={image} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price} $</p>
                    <div className="card-actions justify-end">
                        <Link to={`/UpdateProduct/${_id}`}><button className="btn btn-outline btn-info">Edit</button></Link>
                        <button onClick={deleteProduct} className="btn btn-outline btn-warning">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsHandle;

ProductsHandle.propTypes = {
    product: PropTypes.object,
    refetch: PropTypes.func,
}
