import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../axios';
import './ChangePassword.css'

export default function ChangePassword() {
  const [formValues, setFormvalues] = useState({});

  const onChangeHandler = (e)=>{
  setFormvalues({...formValues,[e.target.name]:e.target.value})
  console.log(formValues)
  }

  const callAPI = ()=>{
    var user_id = sessionStorage.getItem("user_id")
    setFormvalues({...formValues,['user_id']:user_id})
    axios.post(apiUrl+"/user/changepassword", formValues).then((response)=>{
      if(response.status === 200){
        alert(response.data)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    
  },[])
 
 
  return (
    <div>
       <div
        className="container123"
        // style={{maxWidth: "90%",height:'3cm', }}
        
      >

      
         <div class="row mb-2 box2" >
              <label for="Current Password" class="form-label">
              Current Password
              </label>
              <input
                type="current password"
                name="current_password"
                class="form-control box"
                id="Current Password"
                placeholder='Current Password'
               onChange={onChangeHandler}
                aria-describedby="emailHelp"
              />
            </div>
            <div class="row mb-2 box2">
              <label for="Change Password" class="form-label ">
              Change Password
              </label>
              <input
                type="Change Password"
                class="form-control box"
                name="Change Password" 
                placeholder='Change Password'
                onChange={onChangeHandler}
                id="Change Password"
              />
              </div>
            
            <div class="row mb-2 box2">
              <label for="Confirm Password" class="form-label ">
              Confirm Password
              </label>
              <input
                type="Confirm Password"
                class="form-control box"
                name="Confirm Password"
                placeholder='Confirm Password'
                onChange={onChangeHandler}
                id="Confirm Password"
              />
              </div>
            <button type="submit" onClick={callAPI}class="#">
              Submit
            </button>
            </div>
      </div>      
       )
    }


