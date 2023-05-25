import {React,useState} from "react";
import "../styles/contact.css"
import Navbar from "./Layout/Home/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Contact() {
    const history = useNavigate();
    const [ userInfo, setUserInfo] = useState({
        name: "",
        email:"",
        contact:"",
        subject:"",
        query:""
    })

    const handleContact = e => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const registerContact = () => {
        const { name, email, contact,subject,query } = userInfo
        if( name && email  && subject && contact && query){
            axios.post("http://localhost:9002/api/v1/query/queries", userInfo)
            .then( res => {
                alert(res.data.message)
                history("/")
            })
        } else {
            alert("invalid input")
        }   
    }
  return (
    <main style={{ minHeight: "110vh" }} >
    <Navbar></Navbar>
      <div className="wrapperc">
        <h2 className="m-auto">Contact Us</h2>
        <form className="row g-2 m-auto" >
          <div className="col-md-12">
            <label htmlFor="inputName4" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="inputName4" name = "name" value={userInfo.name} onChange = {handleContact} />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail4" name = "email" value={userInfo.email} onChange = {handleContact}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputSubject4" className="form-label">
              Subject
            </label>
            <input type="text" className="form-control" id="inputSubject4" name = "subject" value={userInfo.subject} onChange = {handleContact}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputContact" className="form-label">
              Contact Number
            </label>
            <input type="text" className="form-control" id="inputContact" name = "contact" value={userInfo.contact} onChange = {handleContact}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputQuery" className="form-label">
              Query
            </label>
            <textarea className="form-control" id="inputQuery" name = "query" value={userInfo.query} onChange = {handleContact} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" onClick={registerContact}>
              Submit
            </button>
          </div>
        </form>
      </div>
      </main >
  );
}
