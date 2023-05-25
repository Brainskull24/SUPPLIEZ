import React from 'react'
import Layout from "../../components/Layout/user/Layout"
import { useAuth } from '../../context/auth';
export default function SupDashboard() {
  const [auth] = useAuth();
  return (
    <main>
      <Layout>
      <div>
      <h1>SUPPLIER DASHBOARD</h1>
      <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3> Supplier Name : {auth?.user?.name}</h3>
            <h3> Supplier Email : {auth?.user?.email}</h3>
            <h3> Supplier Contact : {auth?.user?.Contact}</h3>
            <h3> Supplier Address: {auth?.user?.address}</h3>
          </div>
      </div>
    </div>
      </Layout>
    </main>
  )
}
