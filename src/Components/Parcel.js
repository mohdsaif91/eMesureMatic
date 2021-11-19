import React, { useEffect, useState } from "react";

export default function Parcel(props) {
  const [parcel, setParcel] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setParcel(props.data);
    if (props.editData.id === 0) {
      setSelected(0);
    }
  }, [props.data, props.editData]);

  const getData = (data, index) => {
    setSelected(data.sequence);
    data["index"] = index;
    props.sendSelectEdit(data);
  };

  return (
    <div className="parcel">
      {parcel.map((m, index) => (
        <div
          onClick={() => getData(m, index)}
          className={`parcel-container
           ${selected === m.sequence && "selected-parcel"}`}
        >
          <div className="parcel-text">{m.name}</div>
          <div
            className={`parcel-sequence ${
              m.group === "Mumbai"
                ? "back-danger"
                : m.group === "Delhi"
                ? "back-warning"
                : "back-secondary"
            }`}
          >
            {m.sequence}
          </div>
        </div>
      ))}
    </div>
  );
}
