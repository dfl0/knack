'use client';
import {useState} from 'react';
import { render } from 'react-dom';
import './loginSignup.css'
import bUnion from '../welcome/zPics/bUnion.jpg'



let onLogInPage = true;

let nameField = false;
let emailField = false;
let passwordField = false;

let names = "hello";



const grabName = ()=> {
    try {
        let inn = document.getElementById("inName").value;
        console.log(inn);
        //hold[0]=inn;
        nameField=true;
        document.getElementById("inName").value = '';
        return "correct name\n";
        

        
    } catch (error) {
        console.log(error);
        document.getElementById("inName").value = '';
        nameField = false;
        return "wrong name\n";

    }
    
}

const grabEmail = ()=> {
    try {
        let inn = document.getElementById("inEmail").value;
        console.log(inn);
        //hold[1]=inn;
        emailField=true;
        document.getElementById("inEmail").value = '';
        return "correct email\n";


        
    } catch (error) {
        console.log(error);
        document.getElementById("inEmail").value = '';
        emailField = false;
        return "wrong email\n";
    }
}

const grabPass = ()=> {
    try {
        let inn = document.getElementById("inPassword").value;
        console.log(inn);
        //hold[2]=inn;
        passwordField=true;
        document.getElementById("inPassword").value = '';
        return "correct password\n";


        
    } catch (error) {
        console.log(error);
        document.getElementById("inPassword").value = '';
        passwordField = false;
        return "wrong password\n";

    }
}

export default function Page() {

    const[action, setAction] = useState("Log In");
    
    

    const clickLogIn = () =>{
        setAction("Log In");
        if (onLogInPage){
            console.log("Already on Log In!");
            if(0){
                console.log("Fields Correctly Entered!")
            }
            else{
                console.log(grabEmail()+grabPass())
                //setAction("PLEASE TRY AGAIN");
            }

        }
        else{
            //document.getElementById("inName").value = '';
            document.getElementById("inEmail").value = '';
            document.getElementById("inPassword").value = '';
        }
        onLogInPage = true;

    }

    const clickSignUp = () =>{
        setAction("Sign Up");
        if (!onLogInPage){
            console.log("Already on Sign Up!");
            if(0){
                console.log("Fields Correctly Entered!")
            }
            else{
                console.log(grabName()+grabEmail()+grabPass())
                //setAction("PLEASE TRY AGAIN");
            }
        }
        else{
            //document.getElementById("inName").value = '';
            document.getElementById("inEmail").value = '';
            document.getElementById("inPassword").value = '';
        }

        onLogInPage = false;
        
    }
    
    return (
    <>
        <header className = 'h-16 bg-gray-500 font-bold text-gray-800 text-3xl'>
            <h1 className='' >KNACK - Log In Page</h1>
        </header>

        <div className='body'>
            {/* {isSigningUp: } */}
            <div className='container'>
                    <div className='header'>
                        <div className='text'>{action}</div>
                        <div className='underline'></div>
                        <div className='inputs'>
                            {/* {this part removes the username!} */}
                            {action==="Log In"?<div></div> : <div className='input'>
                                <input type='text' id = "inName" placeholder="Username"/>
                                {/* {console.log('hi')} */}
                            </div>}             
                            <div className='input'>
                                <input type='email' id = "inEmail" placeholder="Email address (University)"/>
                            </div>
                            <div className='input'>
                                <input type='password' id = "inPassword" placeholder="Password"/>
                            </div> 
                        </div>
                        {/* This part removes the forgot password */}
                        {action==="Sign Up"? <div>Welcome :)</div> : <div className='forgot-password'>Forgot Password ? <span>Click Here!</span></div>}
                        <div className='submit-container'>
                            <div className={action==="Log In"? "submit":"submit gray"} onClick={clickLogIn}>Log In</div>
                            <div className={action==="Sign Up"? "submit":"submit gray"} onClick={clickSignUp}>Sign Up</div>
                        </div>
                </div>
            </div>
        </div>

        <div className = 'h-16 bg-gray-500 font-bold text-gray-800 text-3xl space-y-20 flex-auto justify-evenly' >
            <h1 className='space-x-120' >Thank you! Contact us at bbaxter1@bing...</h1>
        </div>



    </>
    )
  }
  