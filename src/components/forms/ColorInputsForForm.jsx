import "./forms.css"

export const ColorInputsForForm = ({ currentKit, kit, setKit, setCurrentKit }) => {
    return (
        <fieldset>
            <div className="form-group">
                <legend>Colors:</legend>
                <div className="form-group-color">
                    <input
                        type="text"
                        className="form-color"
                        required
                        defaultValue={currentKit?.color1 ? currentKit.color1 : undefined}
                        placeholder={currentKit?.color1 ? currentKit.color1 : "color"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.color1 = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.color1 = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                    <input
                        type="text"
                        className="form-color"
                        defaultValue={currentKit?.color2 ? currentKit.color2 : undefined}
                        placeholder={currentKit?.color2 ? currentKit.color2 : "color"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.color2 = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.color2 = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                    <input
                        type="text"
                        className="form-color"
                        defaultValue={currentKit?.color3 ? currentKit.color3 : undefined}
                        placeholder={currentKit?.color3 ? currentKit.color3 : "color"}
                        onChange={(event) => {
                            if (currentKit) {
                                const currentKitCopy = { ...currentKit }
                                currentKitCopy.color3 = event.target.value
                                setCurrentKit(currentKitCopy)
                            } else {
                                const kitCopy = { ...kit }
                                kitCopy.color3 = event.target.value
                                setKit(kitCopy)
                            }
                        }}
                    />
                </div>
            </div>
        </fieldset>
    )
}