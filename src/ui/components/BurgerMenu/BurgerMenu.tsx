import {Burger, Menu} from '@mantine/core';
import {useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './BurgerMenu.module.css';

export const BurgerMenu = () => {

    const [open, setOpen] = useState(false)

    const toggleMenu = useCallback(() => {
        setOpen(!open)
    }, [setOpen, open])

    return (
        <div className={styles.wrapper}>
            <Menu opened={open} closeOnClickOutside>
                <Menu.Target>
                    <Burger opened={open} onClick={toggleMenu}/>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item closeMenuOnClick><NavLink className={({isActive}) => isActive ? styles.active : ''}
                                                         to="/vacancies">Поиск вакансий</NavLink></Menu.Item>
                    <Menu.Item closeMenuOnClick><NavLink className={({isActive}) => isActive ? styles.active : ''}
                                                         to="/favorites">Избранное</NavLink></Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}