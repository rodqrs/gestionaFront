import React, { useState } from "react";
import DeleteSales from "../DeleteSales/Index";
import UpdateSales from "../UpdateSales/Index";
import InsertSales from "../InsertpSales/Index";
function PopupSales(props) {
    return (
        <>
         
       
         {  props.popup === 'btn_update'  ? <UpdateSales props={props} /> : 
          ( props.popup === 'btn_delete'  ? <DeleteSales props={props} /> :
          ( props.popup === 'btn_insert'  ? <InsertSales props={props} /> : "" ))}

                                      
        {/* {props.popup === 'btn_insert' ? <InsertSales props={props}  /> : <InsertSales props={props}/>}*/}

         {/*
          {props.popup === 'btn_update' ? <UpdateSales /> : <UpdateSales />}
         {props.popup === 'btn_insert' ? <InsertSales /> : <InsertSales />}
         
         */}
        
        </>
    );
}
  
  export default PopupSales;