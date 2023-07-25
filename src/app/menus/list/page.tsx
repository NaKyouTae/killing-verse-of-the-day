import React from "react"
import Enter from "@/app/components/Enter/Enter"
import {verses} from "../../../../public/sample"
import Cards from "@/app/components/template/Cards/Cards"

function List() {
    const data = verses

    return (
        <div className={"contents"}>
            <Enter/>
            <Cards data={data}/>
        </div>
    )
}

export default List
