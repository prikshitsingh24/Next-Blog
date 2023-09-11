import MarkdownRenderer from "@/components/AddBlogsComponent/markdownComponent";
import BlogTemplate from "@/components/blogTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";


export default function BlogDetailPage({data}){

    return(
      <div className="bg-Beige h-screen">
        <BlogTemplate data={data}/>
      </div>
        
    );
}

export async function getServerSideProps(context) {
    const {id}=context.query;

    try {
    // Fetch blog data based on the slug
    // Replace this with your actual data fetching code
    const response = await fetch(`http://localhost:3000/api/getBlogById?id=${id}`);
    if (!response.ok) {
      // Handle the case where the blog post is not found
      return { props: { data: null } };
    }
    
    const data = await response.json();
    
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
      },
    };
  }
}