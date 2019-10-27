import React from "react";
import File from "./File";

/*
 Parent component to group all files before upload
*/
const DropFileInput = () => {
  const [stateComponent, setStateComponent] = React.useState({
    files: [],
    uploading: false
  });

  const handlerOnDragOver = event => {
    event.preventDefault();
  };

  /*
   * Add Files to State
   * Prevent add repeat files to state
   */
  const handlerOnDrop = event => {
    event.preventDefault();
    const array_files = [];
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      let file = event.dataTransfer.files[i];
      if (!stateComponent.files.map(n => n.name).includes(file.name)) {
        array_files.push(file);
      }
    }
    setStateComponent({
      files: [...stateComponent.files, ...array_files],
      uploading: false
    });
  };

  const toggleUpload = () => {
    setStateComponent({
      files: [...stateComponent.files],
      uploading: !stateComponent.uploading
    });
  };

  const removeFile = index => {
    setStateComponent({
      files: stateComponent.files.filter((_, i) => i !== index),
      uploading: stateComponent.uploading
    });
  };

  const renderFiles = () => {
    return stateComponent.files.map((file, index) => {
      return (
        <File
          file={file}
          key={file.name}
          uploading={stateComponent.uploading}
          clickRemove={() => removeFile(index)}
        />
      );
    });
  };

  return (
    <div>
      <div
        className="Drop-input"
        onDragOver={handlerOnDragOver}
        onDrop={handlerOnDrop}
      >
        Drop files here!
      </div>
      <div className="Div-files">{renderFiles()}</div>
      <div className="Div-Button">
        <button onClick={toggleUpload} disabled={!stateComponent.files.length}>
          {!stateComponent.uploading ? "Upload File" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default DropFileInput;
