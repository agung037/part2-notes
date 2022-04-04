import { useState } from "react";

const Togglable = (props) => {

    // state yang digunakan hanyalah variable visible dengan nilai boolean untuk di toggle
    const [visible, setVisible] = useState(false)

    // style css yang digunakan untuk menampilkan / tidak menampilkan sebuah elemen
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    // tiap kali di klik maka state akan berubah menjadi kebalikan dari state yang sedang berjalan
    const toggleVisibility = () => {
        setVisible(!visible)
    }

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
}


export default Togglable