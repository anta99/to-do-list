import React from "react";
import List from "../List/List";
import "./style.css";

export default function ListGroup({lists}){
    return(
        <section className="listGroupSec row justify-content-around">
           {lists.map(list=>{
               return(
                <article className="listContainer">
                    <List listObj={list} />
                </article>
               )
           })}
        </section>
    )
}