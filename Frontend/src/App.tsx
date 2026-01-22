import './App.css'
import {useEffect} from "react";
import DashboardForm from './components/DashboardForm';


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
      <DashboardForm />
    </>
  )
}

export default App
