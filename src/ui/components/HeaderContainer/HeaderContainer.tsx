import {Flex, Header, Title} from '@mantine/core';
import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './HeaderContainer.module.css';
import {useElementSize} from '@mantine/hooks';
import {BurgerMenu} from '../BurgerMenu/BurgerMenu';
import {LogoIcon} from '../../../assets/icons/LogoIcon';


export const HeaderContainer = () => {

    const {ref, width} = useElementSize();

    return (
        <Header ref={ref} height="84px">
            <Flex align="center" gap={280} className={styles.wrapper}>
                <NavLink to="/vacancies">
                    <Flex align="center" gap={12} className={styles.logo}>

                        <LogoIcon/>
                        <Title className={styles.logo__title} order={1}>Jobored</Title>

                    </Flex>
                </NavLink>
                {width < 600 ? <BurgerMenu/> :
                    <div className={styles.navigation}>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? styles.active : ''}
                                        to="/vacancies"
                                    >Поиск вакансий</NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? styles.active : ''}
                                        to="/favorites"
                                    >Избранное</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
            </Flex>
        </Header>
    )
}