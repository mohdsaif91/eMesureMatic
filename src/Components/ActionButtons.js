import React from "react";

export default function ActionButtons() {
  return (
    <div className="action-buttons d-flex-row space-between">
      <button className="action-btn">Add After</button>
      <button className="action-btn">Add Before</button>
      <button className="action-btn">Replace</button>
      <button className="action-btn">Delete</button>
      <button className="action-btn">Refresh</button>
      <button className="action-btn">Show Final</button>
    </div>
  );
}
