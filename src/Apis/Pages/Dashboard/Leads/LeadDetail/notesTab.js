import React, { useState } from "react";
import { addEditLeadDetail, deleteLeadDetail } from "../../../../Apis";
import cloneDeep from "lodash/cloneDeep";
import { LEAD_DETAIL_TYPE } from "../../../../Constants/enums";
import { toast } from "react-toastify";
import FormInput from "../../../../Components/Forms/FormInput";
import moment from "moment";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";

const NotesTab = ({
  active = false,
  leadId = "",
  notes = [],
  setNotes,
  setSuccess,
}) => {
  const [selectedNote, setSelectedNote] = useState();

  const addNewNote = () => {
    if (!notes[0]?.isNew) {
      const newNote = { text: "", title: "", isNew: true };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNote(newNote);
    }
  };

  const updateNote = (e, title) => {
    setSelectedNote((prevNote) => {
      const tempNote = cloneDeep(prevNote);
      if (title) {
        tempNote.title = e.target.value;
      } else {
        tempNote.text = e.target.value;
      }
      return tempNote;
    });
  };

  const selectNote = (note, i) => {
    setSelectedNote(note);
  };

  const saveNote = () => {
    const payload = new FormData();
    payload.append("leadId", leadId);
    if (selectedNote?._id) payload.append("id", selectedNote?._id);
    payload.append("type", LEAD_DETAIL_TYPE.NOTES);
    payload.append("title", selectedNote?.title);
    payload.append("text", selectedNote?.text);

    addEditLeadDetail(payload)
      .then(() => {
        toast.success("Note Saved Successfully");
        setSelectedNote(null);
      })
      .finally(() => setSuccess((s) => !s));
  };

  const deleteNote = (e, noteId) => {
    e?.stopPropagation();
    if (noteId) {
      confirmAlert({
        message: `Are you sure you want to delete note?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              deleteLeadDetail({ id: noteId, type: LEAD_DETAIL_TYPE.NOTES })
                .then((res) => toast.success("Note Deleted Successfully"))
                .finally(() => setSuccess((s) => !s));
            },
          },
          {
            label: "No",
          },
        ],
      });
    } else {
      setSuccess((s) => !s);
    }
  };

  return (
    <div className={`tab-pane fade ${active ? "show active" : ""}`}>
      <div className="my-notes">
        <div className="my-notes-header">
          <div className="my-notes-left justify-content-between border-end border-secondary">
            <h3>{`My Notes ${notes?.length}`}</h3>
            <h4 role="button" onClick={addNewNote}>
              +
            </h4>
          </div>

          {selectedNote && (
            <div className="my-notes-right">
              <h3>{selectedNote?.title}</h3>

              <button className="know-more" onClick={saveNote}>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="my-notes-body d-flex">
          <div className="left-mange-full">
            {notes.map((note, i) => (
              <div
                key={i}
                onClick={() => selectNote(cloneDeep(note), i)}
                className={`my-notes-left ${
                  selectedNote?._id === note._id ? "active" : ""
                }`}
              >
                <i className="fas fa-file"></i>
                <div className="notes-body-left">
                  <div className="d-flex align-items-center justify-content-between">
                    {selectedNote?._id === note._id ? (
                      <FormControl
                        type="text"
                        className="notes-title-input"
                        placeholder="New note"
                        value={selectedNote?.title}
                        onChange={(e) => updateNote(e, true)}
                      />
                    ) : (
                      <h5>{note?.title}</h5>
                    )}

                    <FontAwesomeIcon
                      icon="trash"
                      size="sm"
                      className="delete-note-icon"
                      onClick={(e) => deleteNote(e, note._id)}
                    />
                  </div>

                  <p>{note?.text}</p>
                  <h6>{moment(note?.updatedAt).format("DD MMM, YYYY")}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="my-notes-right">
            {notes.length ? (
              <>
                {!!selectedNote && (
                  <FormInput
                    as="textarea"
                    rows={3}
                    placeholder="Enter note here"
                    className="mb-0 w-100 interFont"
                    value={selectedNote?.text}
                    onChange={updateNote}
                    style={{ height: "280px" }}
                  />
                )}
              </>
            ) : (
              <span className="interFont">No notes found.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesTab;
