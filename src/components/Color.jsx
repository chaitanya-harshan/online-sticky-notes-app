import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import db from "../appwrite/databases";

const Color = ({ color }) => {
  const { notes, setNotes ,selectedNote } = useContext(NoteContext);

  function colorChange() {
    try {
      const index = notes.findIndex((note) => note.$id === selectedNote.$id);
      const updatedNote = {...selectedNote, colors: JSON.stringify(color)};
      const newNotes = [...notes];
      newNotes[index] = updatedNote;
  
      setNotes(newNotes);

      const payload = { colors: JSON.stringify(color) };
      db.notes.update(selectedNote.$id, payload)
      
    } catch (error) {
      alert("You must select a note before changing the color.");
    }
  }

  return (
    <div
      className="color"
      style={{ backgroundColor: color.colorHeader }}
      onClick={colorChange}
    ></div>
  );
};

export default Color;
