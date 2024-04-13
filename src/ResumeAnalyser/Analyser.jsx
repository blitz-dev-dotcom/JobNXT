import React,{useRef,useState,useEffect} from 'react';
import { useNavigate , Outlet} from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import {storage} from '../firebaseConfig';
import {ref , uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import { FaFilePdf } from "react-icons/fa";
import { SiWelcometothejungle } from "react-icons/si";
import { IoIosAddCircleOutline } from "react-icons/io";
function Analyser() {
   var FileBlobData = [];
//    var fs = require('fs');
    const [TagValue,setTagValue] = useState('');
    const [AnalyseOpac,setAnalyseOpac] = useState(false);
    const [Opac,setOpac] = useState(false);
    const [ArrayBuffer,setArrayBuffer] = useState([]);
    const [TagArr,setTagArr] = useState([]);
    const [Folder,setFolder] = useState(null);
    const [Anal,setAnal] = useState(false);
    const TitleRef = useRef();
    const fileRef = useRef();
    const expRef = useRef();
    const degRef = useRef();
    const navigate = useNavigate();
    window.addEventListener('load',()=>{
        setTimeout(()=>{
            setAnal(true)
        },1500)
    })
    useEffect(()=>{
        console.log(Folder)
    },[Folder]);

    useEffect(() => {
        if (Folder && degRef.current && expRef.current && TitleRef.current) {
            if (degRef.current.value !== "" && expRef.current.value !== "" && TitleRef.current.value !== "") {
                setAnalyseOpac(true)
            } else {
                console.log('.')
            }
        }
    }, [Folder, degRef.current, expRef.current, TitleRef.current]);
    
    

    // Fetch Request sends dataPackets to server
    async function PostRequest(){
        const DataObject = {
            folder_path: ArrayBuffer,
            skills: TagArr,
            experience: +expRef.current.value,
            degree: [degRef.current.value.split(",")]

        }
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: DataObject
        }
        const response = await fetch('http://127.0.0.1:8000/process_pdfs/',options);
        const output = await response.json();
        console.log(output)
    }


    function KeyDown(e){
        if(e.keyCode===13){
            if(TagValue!==''){
                setTagArr([...TagArr,TagValue])
                setTagValue('')
            }
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
        setOpac(true);
    }
    function RespEnter(){
        if(TagValue!==''){
            setTagArr([...TagArr,TagValue])
            setTagValue('')
        }
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
            setArrayBuffer([...ArrayBuffer,fileData]);
            const FileBlob = new Blob([fileData], { type: file.type });
            console.log(FileBlob);
            const fileObject = {
                'filedata':fileData
            }
            FileBlobData.push(fileObject);
            const storageRef = ref(storage, '/Folder/' + file.name + v4());
            uploadBytes(storageRef, FileBlob)
                .then(() => {
                    console.log('success');
                })
                .catch((error) => {
                    alert('Error uploading file: ' + error.message);
                });
        };

    reader.readAsArrayBuffer(file);
    // console.log(FileBlobData)
        }
        navigate('ModelOutput');
        PostRequest();
        
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
    <>
        <div className='analyse'>
        <div className="analysepad">
            <div className="headeran">
                <h1>Job Description</h1>
            </div>
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
                    <IoIosAddCircleOutline id='add' onClick={RespEnter}/>
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
        <div className="uploadfold"><button onClick={HandleUpload}>Upload Folder</button><button id='cancel' onClick={()=>{setFolder(null);
            fileRef.current.value='';
        }}>Cancel</button>{AnalyseOpac?<button id='analyse' onClick={HandleFire}>Analyse</button>:<button id='analysefalse' title='Upload Folder to Analyse'>Analyse</button>}</div>
        
        <div className="translater">
            <div className={Opac?'folderupopac':'folderup'}>
                    {Folder?(Folder.map((item,index)=>{
                        return(
                            <div className="contpdf" key={index}>
                            <div className="icon"><FaFilePdf id='pdfic'/></div> 
                            <div className="name"><h3>{item.name}</h3></div>
                        </div>
                        )
                    })):<div className='nothing'><p>Nothing To Show Here Upload to Analyse!</p></div>}
                    <div className="close"><button id='cancel' onClick={()=>{setOpac(false)}}>Close</button></div>
            </div>
        </div>
        {Anal?
            <div className="welcome">
            <div className="welcomepad">
                    <SiWelcometothejungle id='welic'/>
                    <div className="type"><div className="welhead"><h1>Use Our Resume Analyser To Rank Your Collection of Resumes!!</h1></div></div>
                    <div className="abort"><button id='analyse' onClick={()=>{setAnal(false)}}>Continue</button></div>
            </div>
        </div>:
            ""
        }
        
    </div>
    <Outlet/>
    </>
  )
}

export default Analyser