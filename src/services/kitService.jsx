

export const getAllStitches = () => {
    return fetch("http://localhost:8088/stitches").then((res) => res.json())
}


export const createNewKit = (newKit) => {
    return fetch(`http://localhost:8088/kits`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newKit),
    })
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

export const getKitByKitId = (kitId) => {
    return fetch(`http://localhost:8088/kits?kitId=${kitId}&&_expand=skillLevel&&_embed=kitStitches`).then(res => res.json())
}

