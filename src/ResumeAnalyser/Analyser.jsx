import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate , Outlet} from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import {storage} from '../firebaseConfig';
import {ref , uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import { FaFilePdf } from "react-icons/fa";
import { SiWelcometothejungle } from "react-icons/si";
import { IoIosAddCircleOutline } from "react-icons/io";
import useAuth from '../context.js/AuthContext';
function Analyser() {
   var FileBlobData = [];
   var UuidTokenUnique = v4();
//    var fs = require('fs');
    const [TagValue,setTagValue] = useState('');
    const [AnalyseOpac,setAnalyseOpac] = useState(false);
    const [dataProps,setdataProps] = useState(); // holds the score to send porps for machine model.jsx
    const [Opac,setOpac] = useState(false);
    const [ArrayBuffer,setArrayBuffer] = useState([]);
    const [TagArr,setTagArr] = useState([]);
    const [Folder,setFolder] = useState([]);
    const [Anal,setAnal] = useState(false);
    const TitleRef = useRef('');
    const fileRef = useRef('');
    const expRef = useRef('');
    const degRef = useRef('');
    const {Ranks} = useAuth();
    const {setRanks} = useAuth();
    const navigate = useNavigate();
    window.addEventListener('load',()=>{
        setTimeout(()=>{
            setAnal(true)
        },1500)
    })
    useEffect(()=>{
        UuidTokenUnique = v4();
    },[Folder]);

    useEffect(() => {
        if (Folder && degRef.current && expRef.current && TitleRef.current) {
            if (degRef.current.value !== "" && expRef.current.value !== "" && TitleRef.current.value !== "") {
                setAnalyseOpac(true)
            } else {
                console.log('.')
            }
        }
    }, [Folder, degRef.current.value, expRef.current.value, TitleRef.current.value]);
    
    

    // Fetch Request sends dataPackets to server
    


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
            console.log(FileBlob)
            // setStorageFile([...StorageFile,FileBlob])
            const fileObject = {
                'filedata':fileData
            }
            FileBlobData.push(fileObject);
            const storageRef = ref(storage, `Folder${UuidTokenUnique}/` + file.name );
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
    async function PostRequest(){
        
        console.log(TagArr)
        const DataObject = {
            "folder_name": `Folder${UuidTokenUnique}/`,
            "skills": TagArr.join(),
            "experience": +expRef.current.value,
            "degree": degRef.current.value.split(",").join()

        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/ResumeRoleMatcher/',DataObject)
            console.log('Response status:', response.status);
            setRanks(response.data)
            if(!response.ok){
                console.log('Unexpected error occured ! please Try again later')
            }
            else{
                console.log('Response is',response);
            }
            // This Line of Code intended for future use if the Response is not in the object format then enable it to display in the array format
            // try {
            //     const contentType = response.headers.get('content-type');
            //     if (contentType && contentType.includes('application/json')) {
            //     const data = await response.json();
            //     if (Array.isArray(data)) {
            //         console.log(data);
            //     } else {
            //         console.log('Response is Not in array format: ', data);
            //     }
            // } else {
            //     const data = await response.text();
            //     console.log('Response is Not in JSON format: ', data);
            // }
            // } catch (error) {
            //     console.log(error)
            // }
        } catch (err) {
            console.log('Error:', err);
        }
        console.log('dataProps State is',':',Ranks)
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