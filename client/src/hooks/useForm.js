import { useState, useEffect } from "react";

export default function useForm(onSubmitHandler, initialValues) {
    const [values, setValues] = useState(initialValues);

    // useEffect(() => {
    //     setValues(initialValues);
    // }, [])

    const onChange = (e) => {
        setValues(state => ({
            ...state, 
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
  
        onSubmitHandler(values);

        //setValues(initialValues);
    };

    return {
        values,
        onChange,
        onSubmit,
    }
};
