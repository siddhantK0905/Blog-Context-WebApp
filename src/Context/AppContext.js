import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

//step1
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    //data filling pending

    async function fetchBlogPosts(page = 1, tag= null , category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url += `&tag=${tag}`
        }
        if(category){
            url += `&category=${category}`
        }
        console.log("printing the final URL");
        console.log(url);
        try{
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages)
        }
        catch(error) {
            console.log("Error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page) {
        navigate({ search: `?page=${page}`});
        setPage(page);
    }



    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    //step2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}






// import { baseUrl } from "../baseUrl";

// const { createContext, useState } = require("react");

// //Creating a Context
// export const AppContext = createContext();

// // Creating a provider 
// export default function AppContextProvider({children}){

//     const[loading, setLoading] = useState(false)
//     const [page, setPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(null);
//     const [posts, setPosts] = useState([]);


//     //setting up state variables

//     async function fetchBlogsPost(page = 1){
//         setLoading(true);
//         let url = `${baseUrl}?page=${page}`
//         try{
//             const result = await fetch(url);
//             const data = await result.json();
//             console.log(data);
//             setPage(data.page);
//             setTotalPages(data.totalPages);
//             setPosts(data.posts);
 
//         }
//         catch(error){
//             console.log("Unable to fetch data from API")
//             setPage(1)
//             setPosts([])
//             setTotalPages(null)
//         }

//         setLoading(false)
//     }
    
//     function handlePage(page){
//         setPage(page);
//         fetchBlogsPost(page);
//     }



//     //Initializing return value variable
//     const value ={
//         loading,
//         setLoading,
//         page,
//         setPage,
//         posts,
//         setPosts,
//         totalPages,
//         setTotalPages
//     }


//     //Returning a context provider
//     return <AppContext.Provider value={value}>
//             {children}
//     </AppContext.Provider>
// }   

