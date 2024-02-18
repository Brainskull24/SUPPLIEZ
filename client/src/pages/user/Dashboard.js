import React from 'react'
import Layout from "../../components/Layout/user/Layout"
import { useAuth } from '../../context/auth';
export default function SupDashboard() {
  const [auth] = useAuth();
  return (
    <main>
      <Layout>
      <div>
      <div className="col-md-9 mt-3" style={{margin: "auto"}}>
      <h1>USER DASHBOARD</h1>
          <div className="card w-75 p-3 mt-3">
            <h4> NAME : {auth?.user?.name}</h4>
            <h4> EMAIL : {auth?.user?.email}</h4>
            <h4> CONTACT : {auth?.user?.Contact}</h4>
            <h4> ADDRESS: {auth?.user?.address}</h4>
          </div>
      </div>
    </div>
      </Layout>
    </main>
  )
}
