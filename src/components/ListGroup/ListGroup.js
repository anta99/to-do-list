import React from "react";
import List from "../List/List";
import "./style.css";

export default function ListGroup({lists}){
    return(
        <section className="listGroupSec row justify-content-around">
            {lists.length==0 ? <h1 className="text-center emptyListMsg">You don't have any list so far.Go on and make one!</h1> : ""}
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