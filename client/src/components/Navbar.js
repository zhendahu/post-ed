<<<<<<< Updated upstream
=======
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1> Post-ed </h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/account">Account</Link>
                //include other headers for the navbar
            </div>
        </nav>
    );
}

export default Navbar;
>>>>>>> Stashed changes
