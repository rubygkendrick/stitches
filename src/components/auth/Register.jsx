import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    fullName: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "honey_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
        <h1>Stitches</h1>
      <form className="form-login" onSubmit={handleRegister}>
        
        <h2>Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
      
      </form>
      <fieldset>
          <div className="form-group">
            <button className="login-btn btn-primary" type="submit">
              Let's Stitch
            </button>
          </div>
        </fieldset>
    </main>
  )
}