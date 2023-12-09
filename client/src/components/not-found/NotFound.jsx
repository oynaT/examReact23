import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="notFound">
            <h2><b>404</b> Page not found</h2>
                <Link className="details-links" to="/">Back to Home</Link>
        </div>
    );
}