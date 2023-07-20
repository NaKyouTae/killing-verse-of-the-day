import React from "react";
import Enter from "@/app/components/Enter/Enter";
import {verses} from "../../../../public/sample";
import { DateTime } from "luxon";
import {formatDate} from "@/app/utils/DateUtils";

function List() {
    const data = verses

    return (
        <div className={"contents"}>
            <Enter />
            <div>
                <h1>List of items</h1>
                <ul>
                    {data.map((item) => (
                        <li key={item.id} className={"list-item"}>
                            <div className={"created-at"}>{formatDate(item.createdAt)}</div>
                            <div className={"verse"}>{item.verse}</div>
                            <div className={"writer"}>{item.writer}</div>
                            <div className={"like"}>{item.like}</div>
                            <div>
                                <a>응원</a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List
