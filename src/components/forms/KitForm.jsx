import { useEffect, useState } from "react"
import "./forms.css"
import { createNewKit, createNewKitStitch, deleteKit, deleteKitStitch, editKit, getAllKitStitches, getAllStitches, getKitByKitId } from "../../services/kitService"
import { useNavigate, useParams } from "react-router-dom"
import { ImageInputsForForm } from "./ImageInputsForForm"
import { NotesInputForForm } from "./NotesInputForForm"
import { SkillLevelInputForForm } from "./SkillLevelInputForForm"
import { StrandCountInputsForForm } from "./StrandCountInputsForForm"
import { ColorInputsForForm } from "./ColorInputsForForm"
import { TitleInputForForm } from "./TitleInputForForm"
import { DescriptionInputForForm } from "./DecsriptionInputForForm"


export const KitForm = ({ currentUser }) => {
    const navigate = useNavigate()

    const { kitId } = useParams()
    const [allStitches, setAllStitches] = useState([])
    const [newKitStitchIds, setNewKitStitchIds] = useState([])
    const [currentKitStitchIds, setCurrentKitStitchIds] = useState([])
    const [hasImportedKitStitches, setHasImportedKitStitches] = useState(false)
    const [currentKit, setCurrentKit] = useState({})
    const [allKitStitches, setAllKitStitches] = useState([])
    const [previousKitStitches, setPreviousStitches] = useState([])
    const [kit, setKit] = useState({
        id: 0,
        title: "",
        description: "",
        pattern: "",
        color1: "",
        color2: "",
        color3: "",
        strandDominant: "",
        strandSecondary: "",
        strandTertiary: "",
        userId: 0,
        notes: "",
        skillLevelId: "",
        completedPhoto: ""
    })


    useEffect(() => {
        getKitByKitId(parseInt(kitId)).then(kitArray =>
            setCurrentKit(kitArray[0])
        )
    }, [kitId])


    useEffect(() => {
        getAllKitStitches().then(kitStitchesArray => {
            setAllKitStitches(kitStitchesArray)
        })
    }, [])


    useEffect(() => {
        getAllStitches().then(stitchArray => {
            setAllStitches(stitchArray)
        })
    }, [])


    useEffect(() => {
        if (!hasImportedKitStitches) {
            if (currentKit?.kitStitches) {
                const updatedKitStitchIds = currentKit?.kitStitches?.map(kitStitch => kitStitch.stitchId)
                setCurrentKitStitchIds(updatedKitStitchIds)
                setPreviousStitches(updatedKitStitchIds)
                setHasImportedKitStitches(true)

            } else {
                setCurrentKitStitchIds([])
                setPreviousStitches([])
            }
        }
    }, [currentKit])


    const handleSave = (event) => {
        event.preventDefault()
        if (currentKit) {
            const existingKit = {
                title: currentKit.title,
                description: currentKit.description,
                pattern: currentKit.pattern,
                color1: currentKit.color1,
                color2: currentKit.color2,
                color3: currentKit.color3,
                strandDominant: parseInt(currentKit.strandDominant),
                strandSecondary: parseInt(currentKit.strandSecondary),
                strandTertiary: parseInt(currentKit.strandTertiary),
                userId: currentKit.userId,
                notes: currentKit.notes,
                skillLevelId: parseInt(currentKit.skillLevelId),
                completedPhoto: currentKit.completedPhoto
            }
            editKit(existingKit, currentKit.id)

            allStitches.map(stitch => {
                if (previousKitStitches.find(kitStitch => kitStitch == stitch.id) &&
                    !currentKitStitchIds.find(kitStitch => kitStitch == stitch.id)) {
                    const kitStitchToDelete = allKitStitches.find(kitStitch =>
                        kitStitch.kitId == currentKit.id && kitStitch.stitchId == stitch.id)
                    deleteKitStitch(kitStitchToDelete.id)
                }
                if (!previousKitStitches.find(kitStitch => kitStitch == stitch.id) &&
                    currentKitStitchIds.find(kitStitch => kitStitch == stitch.id)) {
                    const editedKitStitch = {
                        stitchId: parseInt(stitch.id),
                        kitId: currentKit.id
                    }
                    createNewKitStitch(editedKitStitch)
                }
            }
            )
            navigate("/myKits")

        } else if (!currentKit) {
            const newKit = {
                title: kit.title,
                description: kit.description,
                pattern: kit.pattern,
                color1: kit.color1,
                color2: kit.color2,
                color3: kit.color3,
                strandDominant: parseInt(kit.strandDominant),
                strandSecondary: parseInt(kit.strandSecondary),
                strandTertiary: parseInt(kit.strandTertiary),
                userId: parseInt(currentUser.id),
                notes: kit.notes,
                skillLevelId: parseInt(kit.skillLevelId),
                completedPhoto: kit.completedPhoto
            }
            createNewKit(newKit).then((createdKit) => {
                const newKitId = createdKit.id;

                newKitStitchIds.forEach((stitchId) => {
                    const newKitStitch = {
                        stitchId: parseInt(stitchId),
                        kitId: newKitId
                    }
                    createNewKitStitch(newKitStitch).then(
                        navigate("/myKits")
                    )
                })
            })
        } else {
            window.alert(
                "New Kits must contain the following fields: title, description, one stitch, an image URL, one color, a dominant strand count, and skill level"
            )
        }
    }


    const handleCheckBoxChange = (event) => {
        const value = parseInt(event.target.value)
        const isChecked = event.target.checked
        if (!currentKit) {

            if (isChecked) {
                setNewKitStitchIds([...newKitStitchIds, value])
            } else {
                setNewKitStitchIds(newKitStitchIds.filter(id => id != value))
            }
        } else {
            if (isChecked) {
                setCurrentKitStitchIds([...currentKitStitchIds, value])
            } else {
                setCurrentKitStitchIds(currentKitStitchIds.filter(id => id != value))
            }
        }
    }

    const handleKitDelete = () => {
        const kitStitchesToDelete = allKitStitches.filter(kitStitch =>
            kitStitch.kitId == currentKit.id)
        kitStitchesToDelete.forEach(stitch => {

            deleteKitStitch(stitch.id)
        })
        deleteKit(currentKit.id)
        navigate("/myKits")
    }

    return (
        <div>
            {currentKit ? "" : <img src="src/images/unnamed.png" alt="create logo"
            className="logo"/>}
            <form >
                <TitleInputForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit} />

                <DescriptionInputForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit}
                />
                <ColorInputsForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit}
                />
                <fieldset>
                    <div className="form-group">
                        <legend>Stitches:</legend>
                        <div className="form-radio">
                            {allStitches.map(stitchObject => (
                                <label key={stitchObject.id} >
                                    <input className="radio"
                                        type="checkbox"
                                        value={stitchObject.id}
                                        checked={
                                            currentKit ? currentKitStitchIds?.includes(stitchObject.id) :
                                                newKitStitchIds.includes(stitchObject.id)
                                        }
                                        onChange={handleCheckBoxChange}
                                    >
                                    </input>
                                    {stitchObject.type}
                                </label>
                            ))}
                        </div>

                    </div>
                </fieldset>
                <StrandCountInputsForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit} />
                <SkillLevelInputForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit} />
                <NotesInputForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit} />
                <ImageInputsForForm currentKit={currentKit}
                    setCurrentKit={setCurrentKit}
                    kit={kit}
                    setKit={setKit} />
            </form>
            <div className="form-group">
                <button className="form-btn btn-primary"
                    onClick={handleSave}
                >Save</button>
            </div>
            {currentKit ? (
                <div className="form-group">
                    <button className="form-btn-main btn-primary"
                        onClick={handleKitDelete}
                    >Delete Kit</button>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}