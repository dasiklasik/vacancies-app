import {Flex, Loader} from "@mantine/core";
import React from "react";

export const CircleLoader = () => {
    return (
        <Flex justify={"center"} align={"center"} mih={'90vh'}>
            <Loader size={100}/>
        </Flex>
    )
}