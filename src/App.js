import { Header } from "./Components/Header";
import { Blogs } from "./Components/Blogs";
import { Pagination } from "./Components/Pagination";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import './App.css'
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { Home } from "./Pages/Home";
import { TagPage } from "./Pages/TagPage";
import { CategoryPage } from "./Pages/CategoryPage";
import { BlogPage } from "./Pages/BlogPage";

export default function App() {

  const {fetchBlogPosts} = useContext(AppContext);

  const[searchParam, setSearchParam] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
  const page = searchParam.get("page") ?? 1;

  if(location.pathname.includes("tag")){
    const tag = location.pathname.split("/").at(-1).replaceAll('-', ' ');
    fetchBlogPosts(Number(page),tag);
  }
  else if(location.pathname.includes("categories")){
    const category = location.pathname.split("/").at(-1).replaceAll("-" , " ");
    fetchBlogPosts(Number(page),null,category);
  }
  else{
    fetchBlogPosts(Number(page));
  }

  },[location.pathname, location.search]);
  
  return (
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/blogs/:blogId' element = {<BlogPage/>}/>
        <Route path = '/tags/:tag' element = {<TagPage/>}/>
        <Route path = '/categories/:category' element = {<CategoryPage/>}/>
      </Routes>
  );
}
