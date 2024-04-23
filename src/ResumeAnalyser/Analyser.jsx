import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [TagValue,setTagValue] = useState('');
    const {setDataGet} = useAuth();
    const [AnalyseOpac,setAnalyseOpac] = useState(false);
    const [Ranks,setRanks] = useState(); // holds the score to send porps for machine model.jsx
    const [Opac,setOpac] = useState(false);
    const [ArrayBuffer,setArrayBuffer] = useState([]);
    const [TagArr,setTagArr] = useState([]);
    const [Folder,setFolder] = useState([]);
    const [Anal,setAnal] = useState(false);
    const TitleRef = useRef('');
    const fileRef = useRef('');
    const expRef = useRef('');
    const degRef = useRef('');
    const {setCandidList} = useAuth();
    const navigate = useNavigate();
    const [pseudo,setpseudo] = useState(false);
    const [ObjectUrl,setObjectUrl] = useState([]);
    window.addEventListener('load',()=>{
        setTimeout(()=>{
            setAnal(true)
        },1500)
    })
    useEffect(()=>{
        UuidTokenUnique = v4();
        console.log(Folder);
    },[Folder]);
    
     const notify = (a) => toast(a)
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
            const url = URL.createObjectURL(FileBlob);
            ObjectUrl.push(url);
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
        setTimeout(()=>{
            setpseudo(true)
        },1000);
        const DataObject = {
            "folder_name": `Folder${UuidTokenUnique}/`,
            "skills": TagArr.join(),
            "experience": +expRef.current.value,
            "degree": degRef.current.value.split(",").join()

        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/ResumeRoleMatcher/',DataObject);
            console.log('Response status:', response.status);
            console.log(response.data.score);
            setRanks(response.data.score);
            if(!response.status===200){
                setpseudo(false)
                notify('Api error ! Try again After sometime')
            }
            else if(response.status === 200){
                sortingRanks(Ranks,Folder,ObjectUrl);
                setDataGet(true); //to enable the access for ModelOutput component in private routes
                navigate('/ModelOutput');
            }
            
            
        } catch (err) {
            setpseudo(false)
            notify('Network error ! Check your Network connection')
        }
        
    }
    function sortingRanks(a,b,c){
        let arr = []

        for(let i= 0 ; i<a.length ; i++){
            let key = parseFloat(a[i])
            arr.push({
                    Rank:key,
                    folder:b[i],
                    url:c[i]
                })
        }

        arr.sort((a, b) => b.Rank - a.Rank);
        setCandidList(arr)

    }
    
    
    
  return (
    <>
        {/* <a href={dummy.name} target='_blank'>hello</a> */}
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
    <ToastContainer/>
    <div className= {pseudo ? 'analyseOverlay flex' : 'false'  }>
        <span class="loader"></span>
        <p>Please Wait Our Model is Running in Progress ! This will Take a While</p>
    </div>
    </>
  )
}

export default Analyser