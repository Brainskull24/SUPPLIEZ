import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Home/Layout'
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth';

const Profile = () => {
  const history = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Contact, setContact] = useState('');
  const [age, setAge] = useState('');
  useEffect(() => {
    if (auth?.user) {
    const { email, name, Contact, password,age} = auth.user;
    setName(name);
    setEmail(email);
    setContact(Contact);
    setPassword(password);
    setAge(age);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:9002/api/v1/auth/profile', {
        name,
        email,
        password,
        Contact,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Profile Updated Successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history('/login');
    }
  }, [auth.isAuthenticated, history]);

  return (
    <Layout title={'Your Profile'}>
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
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
