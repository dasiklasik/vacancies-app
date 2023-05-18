import {Header} from "@mantine/core";
import React from "react";
import {NavLink, Route, Router} from "react-router-dom";
import styles from './HeaderContainer.module.css';


export const HeaderContainer = () => {
    return (
        <Header height={'84px'}>
            <div className={styles.wrapper}>
                <div>
                    Logo
                </div>
                <div className={styles.navigation}>
                    <nav>
                        <ul>
                            <li><NavLink className={({isActive}) => isActive ? 'active' : ''} to='/vacancies'>Поиск вакансий</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active' : ''} to='/favorites'>Избранное</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Header>
    )
}