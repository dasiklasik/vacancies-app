import {Button, Center, Flex, Title} from "@mantine/core";
import React from "react";
import image from '../../assets/images/searching-image.png'
import {NavLink} from "react-router-dom";

export const EmptyFavoritePage = () => {
    return (
        <Center w={"100%"} mih={'90vh'}>
            <Flex direction={"column"} align={"center"}  w={327} p={0}>
                <img src={image} alt={""}/>
                <Title my={32} order={3}>Упс, здесь еще ничего нет!</Title>
                <Button component={NavLink} to={'/vacancies'} variant={"light"}>Поиск Вакансий</Button>
            </Flex>
        </Center>
    )
}