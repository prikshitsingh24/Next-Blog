
import { useEffect, useState } from "react";
import { useRecoilSnapshot, useRecoilState } from "recoil";

export default function TodosTemplate(props: any) {
  const [todo, setTodo] = useState(0);
  const [allTrue, setAllTrue] = useState(false);
  // Use an array to track the checked state of each checkbox
  const [isCheckedArray, setIsCheckedArray] = useState(new Array(todo+1).fill(false));
  const [headingContent,setHeadingContent]=useState("");
  const handleHeadingContent=(e:any)=>{
    setHeadingContent(e.target.value)
  }
  const handleCheckedChange = (index:any) => {
    // Create a copy of the isCheckedArray
    const newIsCheckedArray = [...isCheckedArray];
    // Toggle the checked state of the specific checkbox at the given index
    newIsCheckedArray[index] = !newIsCheckedArray[index];
    // Update the state with the new array
    setIsCheckedArray(newIsCheckedArray);
    

  };
  useEffect(() => {
    // Check if all values in isCheckedArray are true
    const areAllTrue = isCheckedArray.every((value) => value === true);
    if(areAllTrue){
        setAllTrue(areAllTrue); 
    }
    
    
  }, [isCheckedArray]);

  const handleTodos=()=>{
    setTodo(todo+1);
    console.log(todo);
  }
  const todoNumbers = Array.from({ length: todo }, (_, index) => index + 1);

  return (
    <div>
        {allTrue ?(
            <div></div>
        ):(
            <div className="rounded-md border border-black p-4 mb-4">
        <div className="flex justify-between">
        <div className="text-xl my-2">
          <input type="text" className="rounded w-40 outline-none px-2" onChange={handleHeadingContent}/>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer my-3 mx-2" onClick={handleTodos}>
                <path stroke-linecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
      <div className="border-t border-black flex py-2">
        <div className="flex border-solid">
          <div className="mx-2">
            {todoNumbers.map((todoNumber, index) => (
                isCheckedArray[index]?(
                   <div></div>
                ):(
                    <div key={todoNumber} className="rounded-md bg-amber-400 p-2">
                    <label className="items-center flex">
                      <input
                        type="checkbox"
                        className="form-checkbox text-black"
                        checked={isCheckedArray[index]}
                        onChange={() => handleCheckedChange(index)} // Pass the index to the handler
                      />
                      <div className="mx-2">
                        <input type="text" className="rounded w-full text-sm px-2" />
                      </div>
                    </label>
                  </div>
                )
            ))}
          </div>
        </div>
      </div>
    </div>
        )}
        </div>
  );
}

