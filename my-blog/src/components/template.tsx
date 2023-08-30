import BlogTemplate from "./blogsTemplate";
import TodosTemplate from "./todosTemplate";

export default function Template(){
    return(
        <div className="grid grid-cols-12 my-5">
        <div className="col-span-12 sm:col-span-8">
        <div className="px-10 text-xl">Blogs</div>
        <BlogTemplate title="Taj Mahal" text="Construction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around ₹32 million, which in 2023 would be approximately ₹35 billion.[7] The construction project employed some 20,000 artisans under the guidance of a board of architects led by Ustad Ahmad Lahori, the emperor's court architect. Various types of symbolism have been employed in the Taj to reflect natural beauty and divinity.

The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being"></BlogTemplate>
        </div>
        <div className="col-span-12 sm:col-span-4 mx-8">
        <div className="px-10 text-xl">Todos</div>
        <TodosTemplate title="30 august 2023" text="studies for a long day"></TodosTemplate>
        </div>
        </div>

    );
}