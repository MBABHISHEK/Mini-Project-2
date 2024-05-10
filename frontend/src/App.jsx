import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState([])
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/")
    setData(response.data)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      {data && data.message ? (
        data.message.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))
      ): (
        <p>loading...</p>
      )}
    </div>
  )
}

export default App
