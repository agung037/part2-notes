import axios from "axios"

const baseUrl = '/api/login'

// fungsi ini akan meng handle login
// frontend dalam app.js mengirim credentials yang berisi
// {username: xxx, password: xxx}
const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)

    // jika berhasil CONTOH data yang didapat adalah, seba
    // {
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFndW5nayIsImlkIjoiNjIzYzBmMzBlMGU0MGY5ODkwZDAwM2QzIiwiaWF0IjoxNjQ4NjYzNzU1LCJleHAiOjE2NDg2NjczNTV9.h4-HwiJ9YkOzMimICRD6CPKGOCz9x0-U8u6vyV4MSkc",
    //     "username": "agungk",
    //     "name": "Agung Kurniawan"
    // }
    return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
