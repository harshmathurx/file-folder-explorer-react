import { useState } from "react";

const Folder = ({ explorerData, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewEntity = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorerData.isFolder) {
    return (
      <div
        style={{
          marginTop: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "rgb(233,233,233)",
            width: "fit-content",
          }}
          onClick={() => setExpand(!expand)}
        >
          <span
            style={{
              cursor: "pointer",
            }}
          >
            📁 {explorerData.name}
          </span>
          <div
            style={{
              marginLeft: "1rem",
            }}
          >
            <button onClick={(e) => handleNewEntity(e, true)}>+ Folder</button>
            <button onClick={(e) => handleNewEntity(e, false)}>+ File</button>
          </div>
        </div>
        <div
          style={{
            display: expand ? "flex" : "none",
            paddingLeft: "1.5rem",
            flexDirection: "column",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                className="inputContainerInput"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
              />
            </div>
          )}
          {explorerData.items.map((node, index) => {
            return (
              <Folder explorerData={node} handleInsertNode={handleInsertNode} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorerData.name}</span>;
  }
};

export default Folder;
