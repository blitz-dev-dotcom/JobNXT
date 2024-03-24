import React , {useRef , useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FillDetails(props) {
    const TitleRef = useRef('');
    const RoleRef = useRef('');
    const ExpRef = useRef('');
    const navigate = useNavigate();
    const {CtoP} = props;
    
    function cancel(){
        TitleRef.current.value = '';
        RoleRef.current.value = '';
        ExpRef.current.value = '';
    }
    // function handler
    function nextHandler(){
        if(TitleRef.current.value!==''&&RoleRef.current.value !== ''&&ExpRef.current.value !==''){
            //function to be executed
        }
        else{
            alert('fill all details')
        }
    }
    // useEffect(()=>{
    //     if(TitleRef.current.value !=="" && RoleRef.current.value!=="" && ExpRef.current.value!==''){
    //         setdisabled(!disabled);
    //         console.log('hi')
    //     } 
    // },[TitleRef,RoleRef,ExpRef])
  return (
    <div className='filldetails'>
        <h1>Fill Details</h1>
        <p>Use our uploader to save your resume and reach thousands of active employees</p>
        <div id='pseudo'></div>
        <label>Describe Job Title</label>
        <input
            type='text'
            ref={TitleRef}
            placeholder='Job Title'
            required
        />
        <label>Current Role</label>
        <input
            type='text'
            ref={RoleRef}
            placeholder='Current Role'
            required
        />
        <label>Experience</label>
        <input
            type='text'
            ref={ExpRef}
            placeholder='Experience'
            required
        />
        <div id='pseudo'></div>
        <div className="cancel">
            <p onClick={()=>{cancel()}}>Cancel</p>
            <button className='hirebut' disabled={false} >Save & Continue</button>
        </div>
        
    </div>
  )
}

export default FillDetails