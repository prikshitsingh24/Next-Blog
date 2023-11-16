
import BlogTemplate from "../../components/blogTemplate";



export default function BlogDetailPage({data}:any){
    return(
      <div className="bg-Beige h-screen overflow-auto">
        <BlogTemplate data={data}/>
      </div>
        
    );
}

export async function getServerSideProps(context: { query: { id: any; }; }) {
    const {id}=context.query;

    try {
    // Fetch blog data based on the slug
    // Replace this with your actual data fetching code
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getBlogById?id=${id}`);
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