import {authReducer, getAccessToken} from "./auth-reducer";

let initialState = {
    isAuth: false,
    accessToken: null,
}

beforeEach(() => {
    initialState = {
        isAuth: false,
        accessToken: null,
    }
})

test('auth reducer should add auth token', () => {
    const access_token = 'some access_token'
    const action = getAccessToken.fulfilled({access_token}, '')
    const endState = authReducer(initialState, action)

    expect(endState.isAuth).toBe(true)
    expect(endState.accessToken).toBe(access_token)
})