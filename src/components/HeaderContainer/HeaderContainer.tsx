import {Flex, Header, Title} from "@mantine/core";
import React from "react";
import {NavLink} from "react-router-dom";
import styles from './HeaderContainer.module.css';
import {LogoIcon} from "../Icons/LogoIcon";


export const HeaderContainer = () => {
    return (
        <Header height={'84px'}>
            <Flex align="center" gap={280} className={styles.wrapper}>
                <Flex align="center" gap={12} className={styles.logo}>
                    <LogoIcon/>
                    <Title className={styles.logo__title} order={1}>Jobored</Title>
                </Flex>
                <div className={styles.navigation}>
                    <nav>
                        <ul>
                            <li><NavLink className={({isActive}) => isActive ? styles.active : ''} to='/vacancies'>Поиск вакансий</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? styles.active : ''} to='/favorites'>Избранное</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </Flex>
        </Header>
    )
}