import {useState} from 'react'

const NoteForm = ({createNote}) => {

    // console.log(`isi function add note ${createNote}`)

    // memindahkan state aplikasi dan fungsi yang dibutuhkan kedalam komponen
    const [newNote, setNewNote] = useState('')


    // memantau perubahan yang ada pada form input
    const handleChange = (event) => {
        console.log(event.target.value)
        // setiap ketikan akan disimpan pada newNote variable
        setNewNote(event.target.value)
        
    } 


    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: Math.random() > 5,
        })
        setNewNote('')

      }

    return (
        <div>
            <h2>Create a new note : {newNote}</h2>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={handleChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}


export default NoteForm