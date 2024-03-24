import React from 'react'

function SavedResume() {
  return (
    <div className='upload'>
      <h1>Saved Resume</h1>
      <p>Use our uploader to save your resume and reach thousands of active employees</p>
      <h3>Resume Name</h3>
      
      
      <div id="pseudo"></div>
      <div className="cancel">
        <p>Cancel</p>
        <button className='hirebut' disabled={false}>Save & Continue</button>
      </div>
    </div>
  )
}

export default SavedResume