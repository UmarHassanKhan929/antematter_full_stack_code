import React, { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"

const socket: Socket = io("http://localhost:3001")

function App() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    socket.on("word", (word: string) => {
      console.log(word)
      setResponse((prevResponse) => prevResponse + " " + word)
    })

    return () => {
      socket.off("word")
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponse("")
    socket.emit("question", question)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ marginBottom: "1rem" }}>
          Question: <br />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            size={50}
          />
        </label>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
      <div style={{ marginTop: "2rem" }}>
        <p>Response:</p>
      </div>
      <div style={{ margin: "1rem", width: "50vw" }}>
        <p>{response}</p>
      </div>
    </div>
  )
}

export default App
