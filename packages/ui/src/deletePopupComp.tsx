import { useEffect, useState } from "react";
import { Button } from "./button";
import { InputField } from "./inputFields";

export function DeletePopupComp({InputText,setState,...rest}:{InputText:string,state?:boolean,setState: (state: boolean) => void;
}) {
    const[confirmDeleteText,setConfirmDeleteText]=useState("")
    const [confirmDelete,setConfirmDelete]=useState(true)
    console.log(confirmDeleteText,"text")
    useEffect(()=>{
        if(confirmDeleteText ===InputText){
            setConfirmDelete(false)
        }else{
            setConfirmDelete(true)

        }
    },[confirmDeleteText])
    console.log(confirmDelete)
  return (
    <div className="flex flex-col gap-6">
        <h4 className="text-sm text-gray-600 dark:text-gray-500 font-medium">Please confirm the deletion of Your Model Name.</h4>
        <InputField type="text"  placeholder="Enter Model Name for delete" onChange={(e)=>setConfirmDeleteText(e.target.value)} classNames="border-[1.5px]  dark:border-[#18181b]/80  dark:text-[red]"/>
        <div className=" flex flex-row gap-5 justify-end">
            <div className="w-[150px] flex flex-row gap-2 justify-end">

            <Button buttonText="Cancel" variant="secondary" size="md" classnames=" font-medium text-black dark:hover:bg-[#18181b]/80 dark:hover:opacity-800 " onClick={()=>setState(false)}/>
            <Button buttonText="Delete" variant="primary" size="md" classnames="font-medium" disabled={confirmDelete} onClick={()=>console.log("enter")}/>
                </div>

        </div>
    </div>
  )
}

