import React from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import Blogs from '../Components/Blogs';
import { Pagination } from '../Components/Pagination';
import { Header } from '../Components/Header';

export const TagPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
  return (
    <div>
      <div>
        <Header></Header>
        <button onClick={() =>{
            navigate(-1);
        }}
        >
          back
        </button>
        <h2>
          Blogs Tagged <span>#{tag}</span>
        </h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}
