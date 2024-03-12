
import { useState, useEffect } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { Nav } from "../components/nav/Nav"
import { CreateKitForm } from "../components/forms/Create/CreateKitForm"


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
                <Nav />
                <Outlet />
            </>
        }>
            <Route index element={<Welcome />} />
            <Route path="kits" element={<>Kits</>}></Route>
            <Route path="myKits" element={<>My Kits</>}></Route>
            <Route path="create" element={<CreateKitForm currentUser={currentUser} />}></Route>
            <Route path="favorites" element={<>Favorites</>}></Route>
            <Route path="profile" element={<>Profile</>}></Route>
        </Route>
        
    </Routes>
}
