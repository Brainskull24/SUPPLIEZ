import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Home/Layout";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";
import "../styles/pages.css";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { email, name, Contact, age, reEnterPassword } = auth.user;
      setName(name);
      setEmail(email);
      setContact(Contact);
      setPassword(reEnterPassword);
      setAge(age);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:9002/api/v1/auth/profile",
        {
          name,
          email,
          password,
          Contact,
          age,
        }
      );

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
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="profile-form">
        <h4 className="form-title">USER PROFILE</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="NAME"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              placeholder="AGE"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
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
              placeholder="PASSWORD"
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
              className="form-control"
              placeholder="PHONE"
            />
          </div>
          <button type="submit" className="categories-btn">
            UPDATE
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
