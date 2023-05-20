import {Button, Center, Flex, Title} from "@mantine/core";
import React from "react";
import image from '../../assets/searching-image.png'
import {NavLink} from "react-router-dom";

export const Page404 = () => {
    return (
        <Center w={"100%"} mih={'90vh'}>
            <Flex direction={"column"} align={"center"}  w={327} p={0}>
                <img src={image}/>
                <Title my={32} order={3}>Упс, такой страницы нет!</Title>
                <Button component={NavLink} to={'/vacancies'} variant={"light"}>Поиск Вакансий</Button>
            </Flex>
        </Center>
    )
}