import {Button, Input, Paper} from "@mantine/core";
import {SearchIcon} from "../Icons/SearchIcon";
import styles from './SearchField.module.css'
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getVacancies, setKeyword} from "../../bll/vacancies-reducer";

export const SearchField = () => {
    const [inputValue, setInputValue] = useState('')

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const searchKeyword = () => {
        dispatch(setKeyword(inputValue))
        dispatch(getVacancies())
    }

    return (
        <Paper className={styles.search}>
            <Input onChange={changeInputValue} value={inputValue} icon={<SearchIcon/>} size={"lg"}/>
            <Button onClick={searchKeyword} className={styles.search__button}>Поиск</Button>
        </Paper>
    )
}