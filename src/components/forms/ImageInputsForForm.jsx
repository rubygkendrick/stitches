import "./forms.css"

export const ImageInputsForForm = ({currentKit , setCurrentKit , setKit , kit }) => {

    return (
        <fieldset>
            <div className="form-group">
                <textarea
                    type="text"
                    className="photoInput"
                    defaultValue={currentKit?.pattern ? currentKit.pattern : ""}
                    placeholder={currentKit?.pattern ? currentKit.pattern : "pattern image URL"}
                    onChange={(event) => {
                        if (currentKit) {
                            const currentKitCopy = { ...currentKit }
                            currentKitCopy.pattern = event.target.value
                            setCurrentKit(currentKitCopy)
                        } else {
                            const kitCopy = { ...kit }
                            kitCopy.pattern = event.target.value
                            setKit(kitCopy)
                        }
                    }}
                />
            </div>
            <fieldset>
                <div className="form-group">
                    <textarea
                        type="text"
                        className="photoInput"
                        defaultValue={currentKit?.completedPhoto ? currentKit.completedPhoto : ""}
                        placeholder={currentKit?.completedPhoto ? currentKit.completedPhoto : "completed image URL"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.completedPhoto = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.completedPhoto = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                </div>
            </fieldset>
        </fieldset>
    )
}

