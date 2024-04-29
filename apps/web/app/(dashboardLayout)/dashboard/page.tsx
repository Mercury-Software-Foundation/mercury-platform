"use client"
import React, { useState } from "react";
import DynamicLayout from "../../dynamicLayout";
import { DialogBox } from "@repo/ui/dialogBox";
import {DeletePopupComp} from "@repo/ui/deletePopupComp"
import { Button } from "@repo/ui/button";
const page = () => {
  const [state,setState]=useState(false)
  return (
    <div >
      hello
      {/* <DynamicLayout /> */}
      <Button size="sm" variant="primary"  buttonText="click" onClick={()=>setState(true)}/>
      <DialogBox setState={setState} state={state} title="Confirm Delete?">
        <DeletePopupComp InputText="delete" setState={setState}/>
        </DialogBox>
    </div>
  );
};

export default page;
