import React,{useRef,useState,useEffect} from 'react';
import { IoMdClose } from "react-icons/io";
import {storage} from '../firebaseConfig';
import {ref , uploadBytes} from 'firebase/storage';
function Analyser() {
    const [TagValue,setTagValue] = useState('');
    const [TagArr,setTagArr] = useState([]);
    const [Folder,setFolder] = useState(null);
    const TitleRef = useRef();
    const fileRef = useRef();
    const expRef = useRef();
    const degRef = useRef();
    useEffect(()=>{
        console.log(Folder)
    },[Folder])
    function KeyDown(e){
        if(e.keyCode===13){
            setTagArr([...TagArr,TagValue])
            setTagValue('')
        }
    }
    function DeleteTag(val) {
        let deletedtag = TagArr.filter((_, index) => index !== val);
        setTagArr(deletedtag);
    }
    function HandleUpload(e){
        fileRef.current.click();
        
    }
    function HandleChange(e){
        const selectedFiles = e.target.files;
        // If you want to store the selected file names in the state
        const fileNames = Array.from(selectedFiles);
        setFolder(fileNames);
    }
    function HandleFire(e){
        e.preventDefault();
        if (!Folder || !Folder[0]) {
            alert('Please select a file');
            return;
        }
        for(let i=0 ;i<Folder.length;i++){
            const file = Folder[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileData = event.target.result;
            const FileBlob = new Blob([fileData], { type: file.type });

            const storageRef = ref(storage, '/Folder/' + file.name);
            uploadBytes(storageRef, FileBlob)
                .then(() => {
                    console.log('success');
                })
                .catch((error) => {
                    alert('Error uploading file: ' + error.message);
                });
        };

    reader.readAsArrayBuffer(file);
        }
        
        // let FileBlob = new Blob([Folder[0]],{type:'application/pdf'});
        // let url = URL.createObjectURL(FileBlob);
        // console.log(FileBlob)
        // console.log(url)
        // if(Folder) {alert('em')};
        // const images = ref(storage,`/images/${FileBlob}`)
        // uploadBytes(images).then(()=>{alert('file uplad successfull')})
        // .catch(()=>{alert('error')})
    }
    
    
  return (
    <div className='analyse'>
        <div className="analysepad">
            <h1>Job Description</h1>
            <form>
                <label htmlFor='title'>Job Title</label>
                <input 
                    type="text" 
                    id='title'
                    ref={TitleRef}
                />
                <label htmlFor="skill">Job Skills</label>
                <div id="skill">
                    {TagArr.map((item,index)=>{
                        return(
                            <li id={index}>{item} <IoMdClose style={{cursor:'pointer'}} onClick={()=>{DeleteTag(index)}}/></li>
                        )
                    })}
                    <input 
                        type="text" 
                        value={TagValue}
                        onChange={(e)=>{setTagValue(e.target.value)}}
                        onKeyDown={KeyDown}
                        placeholder='Type Skills here'
                    
                    />
                </div>
                <label htmlFor="deg">Degree</label>
                <input 
                    id='deg'
                    type="text"
                    ref={degRef}
                />
                <label htmlFor="exp">Experience</label>
                <input 
                    id='exp'
                    type="number"
                    ref={expRef}
                />

            </form>
            
        </div>
        <div className="analyseload">
                <input 
                    type="file" 
                    id="resup" 
                    ref={fileRef}
                    onChange={HandleChange}
                    webkitdirectory = 'true'
                    multiple
                    hidden
                />
                
            </div>
        <div className="uploadfold"><button onClick={HandleUpload}>Upload Folder</button></div>
        <div className="uploadfold"><button id='cancel' onClick={()=>{setFolder(null)}}>Cancel</button><button id='analyse' onClick={HandleFire}>Analyse</button></div>
    </div>
  )
}

export default Analyser