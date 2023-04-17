import { Link } from "react-router-dom";

function Heroes() {
    return (
        <div className="hero">
            <h1 className="hero-title">Hello, world!</h1>
            <p className="hero-subtitle">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <div className="hero-buttons">
                <Link to="/about" className="button">Learn More</Link>
            </div>
        </div>
    );
}

export default Heroes;