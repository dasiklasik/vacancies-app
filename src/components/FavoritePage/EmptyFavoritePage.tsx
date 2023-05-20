import {Button, Center, Flex, Title} from "@mantine/core";
import React from "react";
import image from '../../assets/searching-image.png'

export const EmptyFavoritePage = () => {
    return (
        <Center w={"100%"} mih={'90vh'}>
            <Flex direction={"column"} align={"center"}  w={327} p={0}>
                <img src={image}/>
                <Title my={32} order={3}>Упс, здесь еще ничего нет!</Title>
                <Button variant={"light"}>Поиск Вакансий</Button>
            </Flex>
        </Center>
    )
}