


export default function Category(props:any){
    return(
        <div className="my-5 mx-5 border border-black rounded-md w-40 h-10 relative overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer">
    <div className="w-40 h-20">
        <img src={props.imageUrl} alt={props.title} className="w-full h-full object-cover object-center"  style={{ filter: 'brightness(70%)' }} />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white opacity-70 hover:opacity-0 transition-opacity duration-300"></div>
        <div className="text-white text-xl font-semibold text-center z-10 relative">{props.title}</div>
    </div>
</div>



        
    );
}