import './App.css'
import {useEffect} from "react";



function App() {
  useEffect(() => {
    fetch("http://localhost:3001/api/health")
      .then(res => res.json())
      .then(data => {
        console.log("Backend says:", data);
      })
      .catch(err => {
        console.error("Frontend → Backend failed:", err);
      });
  }, []);
  return (
    <>
      
    </>
  )
}

export default App
