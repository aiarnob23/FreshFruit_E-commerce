import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { errorAlert, successAlert } from '../../../sweetAlerts';
import axiosInstance from '../../../axiosConfig';

const SingleProduct = ({fruit}) => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const {name, price, quantity, image} = fruit;

    //function for add to cart
    const addToCart = () =>{
        if(!user){
            errorAlert('Please Log In');
            return;
        }
        const email = user?.email;
        axiosInstance.post('/cart',{
            email:email,
            name:name,
            image:image,
            quantity:quantity,
            price:price,
            
        })
        .then(function(res){
            console.log(res);
            successAlert('Successfully added to cart');
        })
        .catch(function(error){
            console.log(error);
        })
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
                        <button onClick={addToCart} className="btn text-white bg-green-600">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;

SingleProduct.propTypes={
    fruit:PropTypes.object,
}
