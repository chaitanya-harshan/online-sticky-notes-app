import { createContext, useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import db from "../appwrite/databases";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {init()}, []);
  
  // const init = async () => {
  //   const response = await db.notes.list();
  //   setNotes(response.documents);
  //   setLoading(false);
  // };
  const init = async () => {
    console.log("VITE_ENDPOINT:", import.meta.env.VITE_ENDPOINT);
    console.log("VITE_PROJECT_ID:", import.meta.env.VITE_PROJECT_ID);
    console.log("VITE_DATABASE_ID:", import.meta.env.VITE_DATABASE_ID);
    console.log("VITE_COLLECTION_NOTES_ID:", import.meta.env.VITE_COLLECTION_NOTES_ID);
    try {
      const response = await db.notes.list();
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    setLoading(false);
  };

  const loadingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const contextData = {notes, setNotes, selectedNote, setSelectedNote};

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div style={loadingStyle}>
          <Spinner size="100"/>
        </div>
      ) : (children)}
    </NoteContext.Provider>
  );
};
