import {Button, Input, Paper} from '@mantine/core';
import styles from './SearchField.module.css';
import {ChangeEvent} from 'react';
import { SearchIcon } from '../../../../assets/icons/SearchIcon';

type SearchFieldPropsType = {
    callback: () => void
    value: string
    onChange: (value: string) => void
}

export const SearchField = (props: SearchFieldPropsType) => {

    const {
        callback,
        value,
        onChange,
    } = props

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <Paper className={styles.search}>
            <Input
                placeholder="Введите название вакансии"
                radius={8} onChange={changeInputValue}
                value={value}
                icon={<SearchIcon/>}
                size="lg"
                className={styles.search__field}
                data-elem="search-input"
            />
            <Button data-elem="search-button" onClick={callback} className={styles.search__button}>Поиск</Button>
        </Paper>
    )
}