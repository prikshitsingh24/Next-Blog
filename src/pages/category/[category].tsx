import Template from "../../components/template";


export default function CategoryPage({data}:any){
    const reverseData=[...data].reverse();
    return(
      <div className="bg-Beige h-screen overflow-auto overflow-x-hidden">
        {
          reverseData.length!==0?(
            <div>
              <div className="flex justify-center text-2xl">{reverseData[0].category} Blogs</div>
              <div className="border-t border-2 border-black my-2 mx-10"></div>
              <div>
                {reverseData.map(x=>{
                return <Template key={x._id} id={x._id} data={x}></Template>
                })}
              </div>
            </div>
          ):(
            <div>
              <div className="flex justify-center text-2xl">No blog has been published yet</div>
              <div className="border-t border-2 border-black my-2 mx-10"></div>
            </div>
            
            
          )
        }
      </div>
      
    );
}

export async function getServerSideProps(context: { query: { category: any; }; }) {
    const {category}=context.query;
    try {
    // Fetch blog data based on the slug
    // Replace this with your actul data fetching code
    const response = await fetch(`http://localhost:3000/api/getBlogByCategory?category=${category}`);
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