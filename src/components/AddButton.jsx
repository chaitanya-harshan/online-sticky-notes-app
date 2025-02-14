import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import db from "../appwrite/databases";
import { useContext, useRef } from "react";
import { NoteContext } from "../context/NoteContext";
 
const AddButton = () => {
    const { setNotes } = useContext(NoteContext);
    const startingPos = useRef(50);

    async function addNote() {
        const payload = {
            position: JSON.stringify({ x: startingPos.current, y: startingPos.current }),
            colors: JSON.stringify(colors[0]),
        }

        startingPos.current += 20;
        const res = await db.notes.create(payload); // res will have additional parameters but thats fine
        setNotes((prev) => [res, ...prev]);
    }

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;