import { useState } from "react";
import explorer from "./folderData";
import Folder from "./Folder";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder explorerData={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}
