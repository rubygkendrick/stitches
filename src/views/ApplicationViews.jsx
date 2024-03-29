
import { useState, useEffect } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { Nav } from "../components/nav/Nav"
import { KitForm } from "../components/forms/KitForm"
import { KitDetails } from "../components/Kits/KitDetails"
import { KitFavorites } from "../components/Kits/KitFavorites"
import { MyKits } from "../components/Kits/MyKits"
import { AllKits } from "../components/Kits/AllKits"
import { ProfileCurrentUser } from "../components/profile/ProfileCurrentUser"
import { EditProfile } from "../components/profile/EditProfile"


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
            <Route path="kits" element={<AllKits />}></Route>
            <Route path="myKits" element={<MyKits currentUser={currentUser}/>}></Route>
            <Route path="createKit" element={<KitForm currentUser={currentUser} />}></Route>
            <Route path="editKit/:kitId" element={<KitForm currentUser={currentUser}/>}></Route>
            <Route path="favorites" element={<KitFavorites currentUser={currentUser}/>}></Route>
            <Route path="profile" element={<ProfileCurrentUser currentUser={currentUser}/>}></Route>
            <Route path="editProfile/:userId" element={<EditProfile currentUser={currentUser}/>}></Route>
            <Route path="kitDetails/:kitId" element={<KitDetails currentUser={currentUser}/>}></Route>
        </Route>
        
    </Routes>
}
