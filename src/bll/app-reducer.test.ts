import {appReducer, setIsAppInitialized} from "./app-reducer";

const initialState = {
    isAppInitialized: false,
    error: null
}

test('app reducer should set property isAppInitialized', () => {
    const action1 = setIsAppInitialized(true)
    const endState1 = appReducer(initialState, action1)

    expect(endState1.isAppInitialized).toBe(true)

    const action2 = setIsAppInitialized(false)
    const endState2 = appReducer(initialState, action2)

    expect(endState2.isAppInitialized).toBe(false)
})