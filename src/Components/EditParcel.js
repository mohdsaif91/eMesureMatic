import React, { useEffect, useState } from "react";

const initialData = {
  id: 0,
  name: "",
  sequence: 0,
  group: "",
};

export default function EditParcel(props) {
  const [edit, setEdit] = useState({ ...initialData });
  const [disabled, setDisabled] = useState(true);
  const [editDisable, setEditDisable] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setEdit(props.editData);
    setDisabled(props.editData.id !== 0 ? false : true);
  }, [props.editData]);

  useEffect(() => {
    setEditDisable(
      edit.name === "" && edit.group === "" && props.editData.id !== 0
    );
  }, [edit]);

  const actionOfButton = (type) => {
    if (
      (type === "addAfter" || type === "addBefore" || type === "replace") &&
      edit.name === ""
    ) {
      setError(true);
    } else {
      setError(false);
      props.btnAction(type, edit);
    }
  };

  return (
    <>
      <div className="editParcel d-flex-col">
        <div className="edit-parcel-label">
          <div className="color-white">Selected Parcel</div>
          <div></div>
        </div>
        <div className="d-flex-row space-between">
          <div className="edit-container">
            <div className="edit-parcel-name d-flex-row">
              <label className="color-white parcel-name">Enter Name:</label>
              <input
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </div>
            <div className="edit-parcel-group d-flex-row">
              <label className="color-white select-group">
                Select Location Group:
              </label>
              <div class="select">
                <select
                  id="standard-select"
                  value={edit.group}
                  onChange={(e) => setEdit({ ...edit, group: e.target.value })}
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>
            </div>
          </div>
          <div className="indicator-group">
            <div className="group-color d-flex-row space-between">
              <div className="color-white">Mumbai</div>
              <div className="badge back-danger"></div>
            </div>
            <div className="group-color d-flex-row space-between">
              <div className="color-white">Delhi</div>
              <div className="badge back-warning"></div>
            </div>
            <div className="group-color d-flex-row space-between">
              <div className="color-white">Kolkata</div>
              <div className="badge back-secondary"></div>
            </div>
          </div>
        </div>
        {error && (
          <p style={{ color: "red" }}>
            The user would need to select an existing parcel
          </p>
        )}
      </div>
      <div className="action-buttons d-flex-row space-between">
        <button
          className="action-btn cursor-hand"
          onClick={() => actionOfButton("addAfter")}
        >
          Add After
        </button>
        <button
          className="action-btn cursor-hand"
          onClick={() => actionOfButton("addBefore")}
        >
          Add Before
        </button>
        <button
          className="action-btn cursor-hand"
          onClick={() => actionOfButton("replace")}
        >
          Replace
        </button>
        <button
          disabled={disabled}
          className={`action-btn ${disabled ? "disabled-btn" : "cursor-hand"}`}
          onClick={() => actionOfButton("delete")}
        >
          Delete
        </button>
        <button
          className="action-btn cursor-hand"
          onClick={() => actionOfButton("refresh")}
        >
          Refresh
        </button>
        <button
          className="action-btn cursor-hand"
          onClick={() => actionOfButton("showFinal")}
        >
          Show Final
        </button>
      </div>
    </>
  );
}
