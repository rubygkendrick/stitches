import "./forms.css"

export const NotesInputForForm = ({currentKit, setCurrentKit, setKit, kit}) => {
    return (
        <fieldset>
        <div className="form-group">
            <textarea
                type="text"
                className="form-control-larger"
                defaultValue={currentKit?.notes ? currentKit.notes : ""}
                placeholder={currentKit?.notes ? currentKit.notes : "notes"}
                onChange={(event) => {
                    if (currentKit) {
                        const currentKitCopy = { ...currentKit }
                        currentKitCopy.notes = event.target.value
                        setCurrentKit(currentKitCopy)
                    } else {
                        const kitCopy = { ...kit }
                        kitCopy.notes = event.target.value
                        setKit(kitCopy)
                    }
                }}
            />
        </div>
    </fieldset>
    )
}