

export const getAllStitches = () => {
    return fetch("http://localhost:8088/stitches").then((res) => res.json())
}


