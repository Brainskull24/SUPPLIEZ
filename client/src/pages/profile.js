import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Home/Layout";
import { useNavigate } from "react-router-dom";

export default function profile() {
  return (
    <div>
     <label>
       What do we eat?
       <select>
         <option value="fruit">Fruit</option>
         <option value="vegetable">Vegetable</option>
         <option value="meat">Meat</option>
       </select>
     </label>
   </div>
  )
}
