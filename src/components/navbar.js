import { Link, Outlet } from 'react-router-dom'
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <div className="headerLinkBar">
                
                <Link className="headerLink" to="/">Home</Link>
                
                <Link className="headerLink" to="/calculator">Calculator</Link>
                
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Navbar;