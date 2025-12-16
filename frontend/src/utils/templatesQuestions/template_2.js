import { experience, initialState } from "../../constant"

const templateTwoInitialState = {
    ...initialState,
    experience : {
        experience_1:[...experience],
        experience_2:[...experience],
        experience_3:[...experience]

    }
}

export default templateTwoInitialState