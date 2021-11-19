import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import ActionButtons from "./Components/ActionButtons";
import EditParcel from "./Components/EditParcel";
import GroupHeader from "./Components/GroupHeader";
import Parcel from "./Components/Parcel";

import { data } from "./constant/data";
import { guidGenerator } from "./util";

const initialData = {
  group: "",
  id: 0,
  index: 0,
  name: "",
  sequence: 0,
};

function App() {
  const [parcel, setParcel] = useState([...data]);
  const [edit, setEdit] = useState({ ...initialData });

  useEffect(() => {
    setParcel(parcel);
  }, [parcel]);

  const replaceParcel = (replacedata) => {
    const selectedIndex = replacedata.index;
    delete replacedata.index;
    setParcel(
      parcel.map((m, index) => {
        if (index === selectedIndex) {
          return replacedata;
        } else {
          return m;
        }
      })
    );
    setEdit({ ...initialData });
  };

  const updateParcel = (type, selectedData) => {
    const selectedIndex = selectedData.index;
    delete selectedData.index;
    selectedData["id"] = guidGenerator();
    selectedData["sequence"] =
      type === "add" ? selectedData.sequence + 1 : selectedData.sequence - 1;
    parcel.splice(
      type === "add" ? selectedIndex + 1 : selectedIndex,
      0,
      selectedData
    );
    let updatedArray =
      type === "add"
        ? parcel.map((m, index) => {
            if (selectedIndex + 2 <= index) {
              const sequenceUpdated = m.sequence + 1;
              const { sequence, ...rest } = m;
              return { sequence: sequenceUpdated, ...rest };
            } else {
              return m;
            }
          })
        : parcel.map((m, index) => {
            if (selectedIndex - 1 >= index) {
              const sequenceUpdated = m.sequence - 1;
              const { sequence, ...rest } = m;
              return { sequence: sequenceUpdated, ...rest };
            } else {
              return m;
            }
          });
    console.log(updatedArray);

    setParcel([...updatedArray]);
    setEdit({ ...initialData });
  };

  const listenAction = (type, selectedData) => {
    switch (true) {
      case type === "refresh":
        setEdit({ ...initialData });
        setParcel([...data]);
        break;
      case type === "showFinal":
        console.log(parcel);
        break;
      case type === "replace":
        replaceParcel(selectedData);
        break;
      case type === "addAfter":
        updateParcel("add", selectedData);
        break;
      case type === "addBefore":
        updateParcel("minus", selectedData);
        break;
      case type === "delete":
        setParcel(parcel.filter((f) => f.sequence !== selectedData.sequence));
        break;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <GroupHeader data={parcel} />
      <Parcel
        sendSelectEdit={(c, index) => setEdit(c)}
        editData={edit}
        data={parcel}
      />
      <EditParcel
        btnAction={(type, data) => listenAction(type, data)}
        editData={edit}
      />
    </div>
  );
}

export default App;
