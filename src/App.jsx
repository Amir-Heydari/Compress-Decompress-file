import { useState } from 'react'
import './App.css'
import Compression from './components/Compression';
import Decompression from './components/Decompression';

function App() {
  const [compressionType, setCompressionType] = useState("decompress")


  return (
    <>
      <h1> LZW File Compression</h1>
      <button
        onClick={() => { setCompressionType(compressionType === "compress" ? "decompress" : "compress") }}
        style={{ textTransform: "uppercase" }}
      >
        {compressionType}
      </button>
      {compressionType === "decompress" ? (
        <Compression />
      ) : (
        <Decompression
        />
      )}
    </>
  )
}

export default App
