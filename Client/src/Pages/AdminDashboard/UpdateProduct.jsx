
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useEffect, useState } from "react";


const UpdateProduct = () => {
    const [data, setData] = useState(null);
    //get the product function
    const { id } = useParams();
    useEffect(() => {
        const getProductDetail = async () => {
            await axiosInstance.get(`/fruitSearch?id=${id}`)
                .then(res => setData(res.data));
        }
        getProductDetail();
    })
    //update a product function
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const image = form.image.value;

        axiosInstance.put(`/fruits/${id}`,{
            name:name,
            image:image,
            quantity:quantity,
            price:price,
        },{
            withCredentials:true,
        })
        .then(res=>{
            console.log(res.data);
        })

    }


    if (data) {
        return (
            <div>
                <div>
                    <div className="hero min-h-screen bg-slate-400">
                        <div className="hero-content">
                            <div className="card flex-shrink-0 w-full max-w-6xl shadow-2xl bg-base-100">
                                <form onSubmit={handleUpdateProduct} className="card-body ">
                                    <div className="form-control w-96">
                                        <label className="label">
                                            <span className="label-text">Image</span>
                                        </label>
                                        <input type="text"
                                            defaultValue={data.image}
                                            placeholder="Image URL"
                                            className="input input-bordered"
                                            name="image"
                                            required />
                                    </div>
                                    <div className="form-control w-96">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Name"
                                            defaultValue={data.name}
                                            className="input input-bordered"
                                            name="name"
                                            required />
                                    </div>
                                    <div className="form-control w-96">
                                        <label className="label">
                                            <span className="label-text">Quantity</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Quantilty"
                                            defaultValue={data.quantity}
                                            className="input input-bordered"
                                            name="quantity"
                                            required />
                                    </div>
                                    <div className="form-control w-96">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Price"
                                            className="input input-bordered"
                                            name="price"
                                            defaultValue={data.price}
                                            required />
                                    </div>
                                    <button className="btn" type="submit">Confirm</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            Loading....
        </div>
    );
};

export default UpdateProduct;