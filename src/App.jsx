import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import AddListing from "./pages/AddListing"
import Details from "./pages/Details"

const App = () => {
  return (
    <>
    
    <Header />
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={ <AddListing />} />
        <Route path="/detail/:id" element={<Details />} />
    </Routes>
    </>
  )
}

export default App
