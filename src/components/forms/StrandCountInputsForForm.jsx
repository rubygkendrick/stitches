import "./forms.css"

export const StrandCountInputsForForm = ({ currentKit, kit, setKit, setCurrentKit }) => {
    return (
        <fieldset>
            <div className="form-group">
                <legend>Strand Counts:</legend>
                <div className="form-group-color">
                    <input
                        type="text"
                        className="form-color"
                        defaultValue={currentKit?.strandDominant ? currentKit.strandDominant : ""}
                        placeholder={currentKit?.strandDominant ? currentKit.strandDominant : "dominant"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.strandDominant = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.strandDominant = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                    <input
                        type="text"
                        className="form-color"
                        defaultValue={currentKit?.strandSecondary ? currentKit.strandSecondary : ""}
                        placeholder={currentKit?.strandSecondary ? currentKit.strandSecondary : "secondary"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.strandSecondary = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.strandSecondary = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                    <input
                        type="text"
                        className="form-color"
                        defaultValue={currentKit?.strandTertiary ? currentKit.strandTertiary : ""}
                        placeholder={currentKit?.strandTertiary ? currentKit.strandTertiary : "tertiary"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.strandTertiary = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.strandTertiary = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                </div>
            </div>
        </fieldset>
    )
}