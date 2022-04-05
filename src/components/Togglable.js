import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef( (props, ref) => {

    // state yang digunakan hanyalah variable visible dengan nilai boolean untuk di toggle
    const [visible, setVisible] = useState(false)

    // style css yang digunakan untuk menampilkan / tidak menampilkan sebuah elemen
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>

                {/* button label berasal dari parameter dari parent */}
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})


export default Togglable