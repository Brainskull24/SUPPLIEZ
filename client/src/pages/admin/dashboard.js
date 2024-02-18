import React from "react";
import Layout from "./../../components/Layout/Admin/Layout";
import { useAuth } from "../../context/auth";
const Adashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="card w-75 p-3 bg-black">
          <h3> Admin Name : {auth?.user?.name}</h3>
          <h3> Admin Email : {auth?.user?.email}</h3>
          <h3> Admin Contact : {auth?.user?.Contact}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Adashboard;
