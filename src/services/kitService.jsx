export const getAllKits = () => {
    return fetch("http://localhost:8088/kits?&_expand=skillLevel&_embed=kitFavorite").then((res) => res.json())
}

export const getAllStitches = () => {
    return fetch("http://localhost:8088/stitches").then((res) => res.json())
}

export const getKitByKitId = (kitId) => {
    return fetch(`http://localhost:8088/kits?id=${kitId}&_expand=skillLevel&_embed=kitStitches`).then(res => res.json())
}

export const getAllKitStitches = () => {
    return fetch("http://localhost:8088/kitStitches").then((res) => res.json())
}



export const createNewKit = (newKit) => {
    return fetch(`http://localhost:8088/kits`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newKit),
    }).then((res) => res.json())
}


export const createNewKitStitch = (stitch) => {
    return fetch(`http://localhost:8088/kitStitches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stitch),
    })
}

export const deleteKitStitch = (id) => {
    return fetch(`http://localhost:8088/kitStitches/${id}`, {
        method: "DELETE"
        
    })
}

export const editKit = (kit, kitId) => {
    return fetch(`http://localhost:8088/kits/${kitId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(kit),
    }).then((res) => res.json())
}


export const createNewKitFavorite = (favoriteObject) => {
    return fetch(`http://localhost:8088/kitFavorite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteObject),
    })
}







