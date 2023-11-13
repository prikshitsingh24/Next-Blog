import Category from "./categoriesComponent";

interface Category{
    title:string;
    imageUrl:string;
}

export default function CategoriesPanel(){
    const categoryObject:Category[]=[
            {title:'Food',imageUrl:'https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg?cs=srgb&dl=cooked-food-1860208.jpg&fm=jpg'},
            {title:'Travel',imageUrl:'https://holidayturn.com/wp-content/uploads/2017/09/International-travel.jpg'},
            {title:'Movie',imageUrl:'https://th.bing.com/th/id/OIP.1LtKOuUrKBgaaKDFREF4mwHaLH?pid=ImgDet&rs=1'},
            {title:'News',imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&usqp=CAU'},
            {title:'Fashion',imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqEZqC5GbhmhFLCXu9_Ev4WAyEuUYjjUIY_bTpYMqc85-AQqZPAfbhF1Km8U674zpai4&usqp=CAU'},
            {title:'Sports',imageUrl:'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=sph'},
            {title:'Political',imageUrl:'https://th.bing.com/th/id/OIP.4NSSNB2ugUi5QWpFDT5lUQHaF9?pid=ImgDet&rs=1'},
            {title:'Religion',imageUrl:'https://www.learnreligions.com/thmb/2kKkO-gIIzcuFoxQXg7p4h3e7bQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/WorldReligions-164107922-c72cce704d4d4521962046df4fa8ce3f.jpg'},
            {title:'Health & Fitness',imageUrl:'https://media.istockphoto.com/id/1363588189/photo/healthy-lifestyle-on-ketogenic-diet-eating-clean-keto-food-good-health-dietary-in-heart-dish.jpg?s=612x612&w=0&k=20&c=RVW_a2Bq3eYeUWqkUbTUHkiQbGJaAMa9Q2fyljGymgY='},
            {title:'Video Games',imageUrl:'https://media.istockphoto.com/id/1324673294/photo/video-gaming-console-man-playing-rpg-strategy-game.jpg?s=612x612&w=0&k=20&c=hTsYdDLbNKnE5gxeY8Yc4-5drqzsK2DiYzu1vdkMAOI='},
            {title:'Anime',imageUrl:'https://resize.indiatvnews.com/en/resize/newbucket/1080_-/2023/06/anime-series-for-summers-1686311761.jpg'},
            ]
    return(
        <div className="h-100">
            <div className="flex justify-center text-xl">
                Categories
            </div>
            <div className="border px-2 py-2 border-black rounded-xl px-5 ">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pr-6 2xl:grid-cols-3 gap-4 pr-6">
                    {
                        categoryObject.map((category: Category)=>{
                            return <Category title={category.title} imageUrl={category.imageUrl}></Category>
                        })
                    }
                </div>
            </div>
        </div>
    );
}