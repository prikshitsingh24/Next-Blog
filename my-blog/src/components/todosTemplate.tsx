export default function TodosTemplate(props: any){
    return(
        <div className="bg-black text-white rounded-md px-10 py-5">
            <div className="text-xl my-5">{props.title}</div>
            <div className="border-t border-gray-300 flex py-5">
            <label className="items-center space-x-2 px-5">
                 <input type="checkbox" className="form-checkbox text-blue-500"/>
            </label>
            <div className="mx=5">{props.text}</div>
            </div>
            
        </div>
    );
}