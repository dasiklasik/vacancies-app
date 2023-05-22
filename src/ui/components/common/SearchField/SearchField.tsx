import {Button, Input, Paper} from "@mantine/core";
import styles from './SearchField.module.css'
import {ChangeEvent, useState} from "react";
import { SearchIcon } from "../../../../assets/icons/SearchIcon";

type SearchFieldPropsType = {
    callback: (value: string) => void
}

export const SearchField = (props: SearchFieldPropsType) => {
    const [inputValue, setInputValue] = useState('')

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const searchKeyword = () => {
        props.callback(inputValue)
    }

    return (
        <Paper className={styles.search}>
            <Input
                placeholder={"Введите название вакансии"}
                radius={8} onChange={changeInputValue}
                value={inputValue}
                icon={<SearchIcon/>}
                size={"lg"}
                className={styles.search__field}
                data-elem="search-input"
            />
            <Button data-elem="search-button" onClick={searchKeyword} className={styles.search__button}>Поиск</Button>
        </Paper>
    )
}