import {Button, Center, Flex, Title} from "@mantine/core";
import image from "../../assets/images/searching-image.png";
import React from "react";

export const EmptyVacanciesPage = () => {
    return (
        <Center w={"100%"}>
            <Flex direction={"column"} align={"center"}  w={327} p={0}>
                <img src={image}/>
                <Title my={32} order={3}>Упс, здесь еще ничего нет! Выберите другие фильтры</Title>
            </Flex>
        </Center>
    )
}