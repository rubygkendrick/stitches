
import { useState, useEffect } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)
        setCurrentUser(honeyUserObject)
    }, [])

    return <Routes>
        <Route path="/" element={
            <>
                
                <Outlet />
            </>
        }>
            <Route index element={<Welcome />} />
        </Route>
    </Routes>
}
