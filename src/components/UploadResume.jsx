import React, { useState, useRef } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

function UploadResume() {
  const [FileName,setFileName]=useState(null)
  const [choose, setChoose] = useState(false);
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(e) {
    // Update the state to indicate that a file has been chosen
    setChoose(true);
    // Handle the file change logic here
    setFileName(e.target.files[0].name);
  }

  function dragAndDrop(e) {
    e.preventDefault();
    console.log('drag area');
  }

  function dragLeave(e) {
    e.preventDefault();
    console.log('leaved');
  }
  function HandleDrop(e){
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    const documents=[...files];
    console.log(files);
    console.log(documents);
  }

  return (
    <div className='upload'>
      <h1>Upload Resume</h1>
      <p>Use our uploader to save your resume and reach thousands of active employees</p>
      <h3>Upload Options</h3>
      <div className="uploadfile" onDragOver={dragAndDrop} onDragLeave={dragLeave} onDrop={HandleDrop} draggable='false'>
        <IoCloudUploadOutline id='fileup'/>
        <h3>Drag & Drop Your Files here</h3>
      </div>
      <div className="uploadsystem">
        <MdOutlineDriveFolderUpload id='filesystem'/>
        <input 
          type="file"
          className="fileload"
          ref={inputRef}
          onChange={handleChange}
          hidden
        />
        <button onClick={handleClick} className='customUpload'>Choose File</button>
        <div className="overflow"><p>{choose ? FileName : 'No files chosen'}</p></div>
      </div>
      <div id="pseudo"></div>
      <div className="cancel">
        <p>Cancel</p>
        <button className='hirebut' disabled={false}>Save & Continue</button>
      </div>
    </div>
  )
}

export default UploadResume;
