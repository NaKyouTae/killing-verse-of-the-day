'use client';

import OutStanding from "@/app/components/OutStanding/OutStanding";
import List from "@/app/menus/list/page";
import React from "react";

function Contents({ children }: any) {
    return (
        <div className={"contents"}>
            <OutStanding />
            <List />
        </div>
    )
}

export default Contents
