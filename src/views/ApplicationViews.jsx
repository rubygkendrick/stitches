
import { useState, useEffect } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { Nav } from "../components/nav/Nav"
import { KitForm } from "../components/forms/Create/KitForm"
import { KitDetails } from "../components/Kits/KitDetails"
import { KitFavorites } from "../components/Kits/KitFavorites"


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
            <Route path="createKit" element={<KitForm currentUser={currentUser} />}></Route>
            <Route path="editKit/:kitId" element={<KitForm/>}></Route>
            <Route path="favorites" element={<KitFavorites currentUser={currentUser}/>}></Route>
            <Route path="profile" element={<>Profile</>}></Route>
            <Route path="kitDetails/:kitId" element={<KitDetails currentUser={currentUser}/>}></Route>
        </Route>
        
    </Routes>
}
