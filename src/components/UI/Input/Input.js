import React, { useImperativeHandle, useRef } from 'react';
import classes from '../../Login/Login.module.css'
const Input = React.forwardRef((props, ref) => {
    let inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })
    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.for}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.type}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div >
    )
})
export default Input;