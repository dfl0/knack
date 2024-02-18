'use client';
import {useState} from 'react';
import { render } from 'react-dom';
import './loginSignup.css'
import bUnion from '../welcome/zPics/bUnion.jpg'
import { userInfo } from 'os';


let userNum = 0;

let onLogInPage = true;

let emailField = false;
let nameField = false;
let passwordField = false;

let userInformation = {};

let tempInfo = {
    entry1: {e1: 'email', n1:'name', p1:'pass'},
};

function addUser(email, username, password){
    userNum++;
    userInformation[userNum] = {email, username, password};
}
addUser("jhannag1@binghamton.edu", "jack198", "password");

const searchName = (someName)=>{
    for (let a = 1; a<=userNum; a++){
        if (userInformation[a].username ==someName){
            return true;
        }
    }
    return false;
}
const searchEmail = (someEmail)=>{
    for (let a = 1; a<=userNum; a++){
        if (userInformation[a].email ==someEmail){
            return true;
        }
    }
    return false;
}
const searchPassword = (somePass)=>{
    for (let a = 1; a<=userNum; a++){
        if (userInformation[a].password ==somePass){
            return true;
        }
    }
    return false;
}

const grabName = ()=> {
    try {
        let inn = document.getElementById("inName").value;
        console.log(inn);

        nameField = searchName(inn);
        console.log(userInformation[userNum].username + nameField);
        tempInfo.entry1.n1 = inn;

        document.getElementById("inName").value = '';
        return "correct name\n";        
        
    } catch (error) {
        console.log(error);
        document.getElementById("inName").value = '';
        return "wrong name\n";

    }
    
}

const grabEmail = ()=> {
    try {
        let inn = document.getElementById("inEmail").value;
        console.log(inn);
        
        emailField = searchEmail(inn);
        console.log(userInformation[userNum].email + emailField);
        tempInfo.entry1.e1 = inn;

        document.getElementById("inEmail").value = '';
        return "correct email\n";

    } catch (error) {
        console.log(error);
        document.getElementById("inEmail").value = '';
        return "wrong email\n";
    }
}

const grabPass = ()=> {
    try {
        let inn = document.getElementById("inPassword").value;
        console.log(inn);
        
        passwordField = searchPassword(inn);
        console.log(userInformation[userNum].password + passwordField);
        tempInfo.entry1.p1 = inn;

        document.getElementById("inPassword").value = '';
        return "correct password\n";

    } catch (error) {
        console.log(error);
        document.getElementById("inPassword").value = '';
        return "wrong password\n";

    }
}

const isBingEmail = (email)=>{
    const atIndex = email.indexOf('@');

    // Check if the '@' symbol is found
    if (atIndex !== -1) {

        // Extract the domain (substring to the right of '@')
        const domain = email.substring(atIndex + 1);
        if (domain == "binghamton.edu"){
            return true;
        }
  } else {
    // Return an error message or handle the case when '@' is not found
    return false;
  }
}

export default function Page() {

    const[action, setAction] = useState("Log In");

    const[message, setMessage] = useState("Thank you for using KNACK!!!");

    const clickLogIn = () =>{
        setAction("Log In");
        if (onLogInPage){
            console.log("Already on Log In!");
            grabEmail();
            grabPass();
            if(emailField&&passwordField){
                console.log("Fields Correctly Entered!")
                window.location.href="/main"
            }
            else{
                console.log("PLEASE TRY AGAIN");
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
            grabName();
            grabEmail();
            grabPass();
            if(nameField)
            {
                console.log("Name Exists!")
            }
            else if(emailField){
                console.log("Email Exists!")
            }
            else if(isBingEmail(tempInfo.entry1.e1)){
                addUser(tempInfo.entry1.e1, tempInfo.entry1.n1, tempInfo.entry1.p1);
                console.log("New account created!\n" + userInformation[userNum].username+'\n'+userInformation[userNum].email+'\n'+userInformation[userNum].password);
            }
            else{
                console.log("Oopsy, you need to go to SUNY BINGHAMTON to be KNACKed");
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
            <h1 className='py-3 text-center' >KNACK</h1>
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

        <div className = 'h-16 bg-gray-500 font-bold text-gray-800 text-3xl space-y-20' >
            <h1 className='py-2 text-center' >{message}</h1>
        </div>



    </>
    )
  }