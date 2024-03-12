import { Link } from "react-router-dom"
import "./Nav.css"
import { useNavigate } from "react-router-dom"

export const Nav = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">Stitches</Link>
            </li>
            <li className="navbar-item">
                <Link to="/kits">Kits</Link>
            </li>
            <li className="navbar-item">
                <Link to="/myKits">My Kits</Link>
            </li>
            <li className="navbar-item">
                <Link to="/create">Create</Link>
            </li>
            <li className="navbar-item">
                <Link to="/favorites">Favorites</Link>
            </li>
            <div className="logout-profile-container">
            <li className="navbar-item-nested navbar-item">
                <Link to="/profile">Profile</Link>
            </li>
                {localStorage.getItem("honey_user") ? (
                    <li className=" navbar-item-nested navbar-item navbar-logout">
                        <Link

                            to=""
                            onClick={() => {
                                localStorage.removeItem("honey_user")
                                navigate("/", { replace: true })
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                ) : (
                    ""
                )}
            </div>
        </ul>
    )
}