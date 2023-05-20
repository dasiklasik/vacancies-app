import {Flex, Loader} from "@mantine/core";
import React from "react";

export const DotsLoader = () => {
    return (
        <Flex justify={"center"} align={"center"}>
            <Loader variant={"dots"} size={"lg"}/>
        </Flex>
    )
}