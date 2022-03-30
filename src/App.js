import { useState, useEffect } from 'react'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  // mengambil data dari localstorage untuk memeriksa apakah user masih valid waktu loginnya
  useEffect(() => {
    // ambil data dari localstorage
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    
    // jika data ada maka simpan ke state
    if(loggedUserJSON) {
      
      // ubah ke format JSON
      const user = JSON.parse(loggedUserJSON)

      // masukan user kedalam state
      setUser(user)

      // masukan token kedalam note service
      console.log("mengambil data localstorage dan menyimpan token ke services")
      noteService.setToken(user.token)
    }

    // empty array artinya effect akan dieksekusi hanya saat komponen di render untuk pertama kali
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const removeNote = (event) => {
    console.log(`remove ${event.target.value}`)
    const idToRemove = event.target.value
    noteService
      .remove(idToRemove)
      .then(
        setNotes(notes.filter(n => n.id !== idToRemove)),
      )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {

      // melemparkan username dan password menjadi parameter credential
      // di dalam module dalam folder services/login
      // response yang didapatkan adalah token, usermame dan name
      const user = await loginService.login({username, password})
      
      
      // menambahkan user ke dalam localstorage
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))


      // setelah login maka token yang didapat di lempar ke services notes
      // agar dapat dimsukan ke parameter Authorization: bearer token_anda
      noteService.setToken(user.token)
      console.log("mencoba setting token", user.token)
      
      // menambahkan token, username dan name ke state
      setUser(user)
      console.log("mencoba setting user", user)


      // mengkosongkan kembali form username dan password
      setUsername('')
      setPassword('')

    }catch(exception){
      // jika sesuatu yang salah terjadi akan menampilkan pesan error
      setErrorMessage('Wrong Credential')

      setTimeout(() => {
        // setelah 5 detik error akan hilang
        setErrorMessage(null)
      }, 5000)
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : 
        <div>
          <p>{user.name} - logged-in</p>
          {noteForm()}
        </div>
      }


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            removeNote={removeNote}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App