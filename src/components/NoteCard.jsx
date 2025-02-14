// import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner";
import { useRef, useEffect, useState, useContext } from "react";
import { autoSize, bodyParser, setZIndex } from "../utils";
import db from "../appwrite/databases.js";
import DeleteButton from "./DeleteButton.jsx";
import { NoteContext } from "../context/NoteContext.jsx";

const NoteCard = ({ note }) => {
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const cardRef = useRef(null);
  const positionRef = useRef(position); //******* */
  const textareaRef = useRef(null);
  const timerRef = useRef(null);
  const { setSelectedNote } = useContext(NoteContext);

  useEffect(() => {
    autoSize(textareaRef);
    setZIndex(cardRef.current);
  }, []); // useEffect is called after the first render of the component

  let startX, startY;

  const mouseDown = (e) => {
    if (e.target.className == "card-header") {
      setZIndex(cardRef.current);
      startX = e.clientX - position.x;
      startY = e.clientY - position.y;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setSelectedNote(note);
    }
  };

  function mouseMove(e) {
    const newX = e.clientX - startX;
    const newY = e.clientY - startY;
    const boundedPosition = {
      x: newX < 0 ? 0 : newX,
      y: newY < 0 ? 0 : newY,
    };

    positionRef.current = boundedPosition; //******* */
    setPosition(boundedPosition); // using ref to directly manipulate the dom element will not work properly so u have to use update the state to rerender the component
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    saveData("position", positionRef.current);
  }

  function saveData(key, value) {
    const payload = { [key]: JSON.stringify(value) };
    try {
      db.notes.update(note.$id, payload);
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  }

  async function handleSaving() {
    setSaving(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveData("body", textareaRef.current.value);
    }, 2000);
  }

  //--------------------------------------------------------------------------------------------------------------
  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textareaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onChange={() => {
            autoSize(textareaRef);
            handleSaving();
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
