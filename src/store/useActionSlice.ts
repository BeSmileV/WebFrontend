import {useAppDispatch} from "./hooks";

function useActionSlice(actionCreator: (value?: any) => any) {
    const dispatch = useAppDispatch();

    return (value?: any) => {
        dispatch(actionCreator(value));
    }
}

export default useActionSlice;
