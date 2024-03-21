
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"
import { useState } from "react"


export const Login = () => {
    const [email, set] = useState("example@example.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem(
                    "honey_user",
                    JSON.stringify({
                        id: user.id,
                    })
                )

                navigate("/")
            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <main className="container-login">
            <img src="src/images/stitcheslogo.png" alt="stitches logo"
            className="stitchesImage logo"/>
            <section>
                <form className="form-login" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(evt) => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <section>
                            or
                        </section>
                    </div>
                    <fieldset>
                        <div className="form-group" >
                            <section>
                                <Link to="/register">Register</Link>
                            </section>
                        </div>
                    </fieldset>

                </form>
            </section>
            <fieldset>
                <div className="form-group" >
                    <button className="login-btn btn-primary" 
                    type="submit"
                    onClick={handleLogin}>
                        Let's Stitch!
                    </button>
                </div>
            </fieldset>
        </main>
    )
}
