import PropTypes from 'prop-types';


const SingleProduct = ({fruit}) => {
    const {name, price, quantity, image} = fruit;
    return (
        <div>
            <div className="card card-compact  bg-base-100 shadow-xl">
                <figure><img className="h-[200px] m-4 w-[200px] rounded-lg" src={image} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price} $</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
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
