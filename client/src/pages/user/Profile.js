import React, { useState, useEffect } from "react";
import "../../styles/register.css"
import axios from "axios"
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/user/Layout";
import { toast } from "react-hot-toast";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [address,setAddress] = useState("");

  useEffect(() => {
    const { email, name, Contact,address } = auth?.user;
    setName(name);
    setContact(Contact);
    setEmail(email);
    setAddress(address)
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:9002/api/v1/auth/profile", {
        name,
        email,
        password,
        Contact,
        address
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
    return (
      <Layout title={"Your Profile"}>
      <div className="container-fluid m-auto mt-3">
        <div className="row">
          <div className="col-md-9 m-auto">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="NAME"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="EMAIL"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="PASSWORD"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="PHONE"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="ADDRESS"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default Profile