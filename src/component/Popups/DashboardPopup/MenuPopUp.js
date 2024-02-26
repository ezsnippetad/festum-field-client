import React from "react";

export default function MenuPopUp() {
  return (
    <div
      id="chat-drop"
      className="p-4 shadow-one bg-white absolute top-16 right-5 z-20 space-y-3 rounded-md min-w-[120px] origin-top visited:hidden anim"
    >
      <h4>
        <a>New Brodcast</a>
      </h4>
      <h4>
        <a>New Group</a>
      </h4>
      <h4>
        <a>Marketing</a>
      </h4>
      <h4>
        <a>Requests</a>
      </h4>
      <h4>
        <a>Settings</a>
      </h4>
    </div>
  );
}
