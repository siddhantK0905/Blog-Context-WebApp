import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { baseUrl } from '../baseUrl';
import { Header } from '../Components/Header';
import { BlogDetails } from '../Components/BlogDetails';

export const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const navigation = useNavigate();

    const {loading , setLoading} = useContext(AppContext)
    const [blogs,setBlogs] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const blogId = location.pathname.split("/").at(-1);


    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log("URL is");
        console.log(url)
        try{
            const res = await fetch(url);
            const data = await res.json();


            setBlogs(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Unable to fetch Blog URL")
            setBlogs(null)
            setRelatedBlogs([]);
        }

        setLoading(false)
    }

    useEffect(()=>{
        fetchRelatedBlogs();
    },[location.pathname])

  return (
    <div>
        <Header/>
        
        <div>
            <button onClick={()=>{
                navigation(-1)
            }}
            >
                back
            </button>
            {
             loading ? (<div>
                loading
             </div>): 
             (blogs ? 
             (<div>
                <BlogDetails post = {blogs}/>
                <h2>Related Blogs </h2>
                {
                    relatedBlogs.map((post) => (
                        <div key= {post.id}>
                            <BlogDetails post = {post}/>
                        </div>
                    ))
                }

             </div>) :
             (
                <div>
                    <p>No Related Blogs Found</p>
                </div>
             ))  
            }
        </div>
    </div>
  )
}
