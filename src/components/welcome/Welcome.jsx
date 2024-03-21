import { Link } from "react-router-dom"
import "./Welcome.css"

export const Welcome = () => {

    return (
        <>
            
            <img src="src/images/stitcheslogo.png" alt="stitches logo"
            className="stitchesImage logo"/>
            <div className="welcome-container">
                <h1><span>Embroidery Made Easy</span></h1>
                <h2><span>Design, Save, Share with Stitches!</span></h2>
            </div>
            < div>
                <Link to="createKit">
                    <button className="btn-primary">Create A Kit</button>
                </Link>
            </div>
            
        </>
    )
}