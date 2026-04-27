import { Link } from "react-router-dom"


const Header = () => {
  return (
    <header className="mb-18.5 pl-40.5 pr-41.75 py-9.5 border-b border-b-[#DBDBDB]">
       <Link to="/"><img src="/Logo.svg" alt="logo" /></Link> 
    </header>
  )
}

export default Header
