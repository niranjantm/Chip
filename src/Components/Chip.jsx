import React, { useState, useEffect, useRef } from "react";
import namesArray from "../assets/Data"  // initial list of names
import { FaRegUser } from "react-icons/fa";

function Chip() {
 

  const [tags, setTags] = useState([]); // State for managing selected tags
  const [data, setData] = useState(namesArray); // State for the initial list of names
  const [search, setSearch] = useState(""); // State for the current input value
  const [click,setClicked] = useState(false)
  const focusRef = useRef();

  // Removes a tag from the selected tags and adds it back to the suggestions
  const removeItem = (i) => {
    let tag = tags[i];
    let filteredNames = tags.filter((_, index) => {
      return index !== i;
    });
    setTags(filteredNames);
    setData([...data, tag]);
  };

  // Handles key events for adding and removing tags
  const handleSetNameOnEnter = (e) => {
    // Adds a new tag when Enter is pressed
    if (search && e.key === "Enter" && data.includes(search)) {
      setTags([...tags, search]);
      setSearch(""); // Clears the input
      
    }
    // Removes the last tag when Backspace is pressed and the input is empty
    if (e.key === "Backspace" && search === "") {
      let tag = tags.pop();
      if(tags.length===0){
        setClicked(false)
      }else{
        setData([...data, tag]);
      setTags([...tags]);
      }
      
    }
  };

  // Adds a suggested tag to the selected tags
  const handleSuggestion = (item) => {
    setTags([...tags, item]);
    setSearch("");
  };

  // Updates the suggestions based on the selected tags
  useEffect(() => {
    setData(
      data.filter((item) => {
        return !tags.includes(item);
      })
    );
  }, [tags]);

  return (
    <div className="flex flex-col justify-center items-center p-10">
      {/* -------------------------------------Input and tags------------------------------------------------ */}
      <div onClick={(e)=>{focusRef.current.focus();setClicked(true)}}className="border border-gray-400 w-[600px] h-fit mt-5 flex gap-3 p-5 flex-wrap rounded-lg shadow-lg max-md:w-[300px]">
        <ul className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {tags.map((item, index) => {
            return (
              <li className="bg-gray-400 rounded-3xl w-fit px-5 h-[50px] flex items-center gap-2" key={index}>
                <span><FaRegUser></FaRegUser></span>
                <span>{item}</span>
                <span
                  onClick={() => removeItem(index)}
                  className="bg-stone-200 rounded-full w-[25px] text-center pb-1 hover:cursor-pointer"
                >
                  x
                </span>
              </li>
            );
          })}
        </ul>

        <input
          placeholder="Enter a tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSetNameOnEnter}
          className="outline-none"
          ref={focusRef}
        />
      </div>

      {/* -------------------------------DropDown---------------------------------------------------------------------- */}

      <div className={`flex flex-wrap p-3 rounded-lg ${click?"border border-gray-300":""} overflow-y-scroll scrollbar-hide gap-2 max-h-[200px] max-w-[300px] mt-5`}>
        {search &&
          data.map((item,index) => {
            if (
              item && item.toLocaleLowerCase().includes(!search ? "":search.toLocaleLowerCase())
            ) {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleSuggestion(item)}
                  className="bg-blue-300 px-5 py-2 rounded-lg"
                >
                  {item}
                </button>
              );
            }
          })}
          {
            !search && click && data.map((item,index)=>{
              return(
                <button
                  type="button"
                  key={index}
                  
                  onClick={() => handleSuggestion(item)}
                  className="bg-blue-300 px-5 py-2 rounded-lg"
                >
                  {item}
                </button>
              )
            })
          }
      </div>
    </div>
  );
}

export default Chip;
