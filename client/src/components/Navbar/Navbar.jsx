import './Navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthAction';
import Quick from "../../assets/Quick.png"
import Flix from "../../assets/flix.png"

const Navbar = () => {

  const[isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext);

  window.onscroll = () =>{
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null); 
  }

  return (
    <div className = {isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
            <Link to="/" className='link'>
              <span className="logo">
                <img src={Quick} alt="Quickflix Icon" />
                <img src={Flix} alt="Quickflix Icon" />
              </span>
            </Link>
            <Link to="/" className='link'>
            <span>HomePage</span>
            </Link>
            <Link to="/series" className='link'>
            <span className='navbarMainLink'>Series</span>
            </Link>
            <Link to="/movies" className='link'>
            <span className='navbarMainLink'>Movies</span> 
            </Link>
            <span>New and Popular</span>
            <span>My list</span>
        </div>
        <div className="right">
            <SearchIcon className='icon'/>
            <span>KIDS</span>
            <NotificationsIcon className='icon' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQCOnDIWH3-W4JlvzeBfigxvkVz2MPn4ntxw&usqp=CAU" alt="Profile" />
            <div className="profile">
                <ArrowDropDownIcon className='icon' />
                <div className="options">
                    <span>Settings</span>
                    <span onClick={()=>dispatch(logout())}>Logout</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
