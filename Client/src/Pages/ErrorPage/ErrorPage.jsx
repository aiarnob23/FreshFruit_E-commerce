import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Not Found</h1>
            <p className="text-xl my-2">The requested URL was not found on the server</p>
            <Link to='/' className="text-xl"><button className="btn btn-outline">Back to home</button></Link>
        </div>
    );
};

export default ErrorPage;