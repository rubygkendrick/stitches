import { useEffect, useState } from "react"
import "../forms.css"
import { getAllStitches } from "../../../services/kitService"

export const CreateKitForm = ({currentUser}) => {
    const [allStitches, setAllStitches] = useState([])

    const [kit, setKit] = useState({
        id: 1,
        title: "",
        description: "",
        pattern: "",
        color1: "",
        color2: "",
        color3: "",
        strandDominant: 0,
        strandSecondary: 0,
        strandTertiary: 0,
        userId: 0,
        notes: "",
        skillLevelId: 0,
    })

    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])

    //const handleNewKit= (event) => {
    //    event.preventDefault()
    //     if (ticket.description) {
    //         const newTicket = {
    //             userId: currentUser.userId,
    //             description: ticket.description,
    //             emergency: ticket.emergency,
    //             dateCompleted: ""
    //         }
 //
    //         createServiceTicket(newTicket).then(() => {
    //             navigate("/tickets")
    //         })
    //     } else {
    //         window.alert("description field required")
    //     }
    //     



    return (
        <div>
            <h1 className="logo">Create a Kit</h1>
            <form>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="title"
                            onChange={(event) => {
                                const kitCopy = { ...kit }
                                kitCopy.title = event.target.value
                                setKit(kitCopy)
                            }} 
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control-larger"
                            placeholder="brief description"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Colors:</legend>
                        <div className="form-group-color">
                            <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                            />
                            <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                            />  <input
                                type="text"
                                className="form-color"
                                placeholder="color"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Stitches:</legend>
                        <div className="form-radio">
                            {allStitches.map(stitchObject => (
                                <label key={stitchObject.id}>
                                    <input className="radio"
                                        type="radio"
                                        value={stitchObject.type}>
                                    </input>
                                    {stitchObject.type}
                                </label>
                            ))}
                        </div>

                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <legend>Strand Counts:</legend>
                        <div className="form-group-color">
                            <input
                                type="text"
                                className="form-color"
                                placeholder="domainant"
                            />
                            <input
                                type="text"
                                className="form-color"
                                placeholder="secondary"
                            />  <input
                                type="text"
                                className="form-color"
                                placeholder="tertiary"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select className="form-control dropdown" defaultValue="0"  >
                            <option value="0" disabled >Skill Level</option>
                            <option value="1">Beginner</option>
                            <option value="1">Intermediate</option>
                            <option value="3">Advanced</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control-larger"
                            placeholder="notes"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            className="photoInput"
                            placeholder="image URL"
                        />
                    </div>
                </fieldset>
            </form>
            <div className="form-group">
                <button className="form-btn btn-primary"
                >Save</button>
            </div>
        </div>
    )
}