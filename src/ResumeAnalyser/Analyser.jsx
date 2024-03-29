import React,{useRef,useState} from 'react';
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
            setFolder(Array.from(e.target.files))
            
                
        //         reader.onload = function(e) {
        //             console.log(`Contents of ${files.name}:`);
        //             console.log(e.target.result); // This will log the contents of the file
                
                
        //         reader.readAsText(files); // Read the file as text. You can use other methods like readAsDataURL for images.
            
        // }
        
        // 
        // setFolder(db)
        // console.log(Folder)
    }
    function HandleFire(e){
        e.preventDefault();
        if(Folder) {alert('em')};
        const images = ref(storage,`/images/${Folder[0].name
        }`)
        uploadBytes(images).then(()=>{alert('file uplad successfull')})
        .catch(()=>{alert('error')})
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
        <div className="uploadfold"><button onClick={HandleUpload}>Upload Folder</button><button onClick={HandleFire}>upload</button></div>
    </div>
  )
}

export default Analyser