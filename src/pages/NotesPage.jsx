// import { fakeData as notes } from "../assets/fakeData.js"; // ----
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext.jsx";
import NoteCard from "../components/NoteCard.jsx";
import Controls from "../components/Controls.jsx";

const NotesPage = () => {
  const {notes} = useContext(NoteContext);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;
