import './Homepage.scss'
import Navbar from "../../components/Navbar/Navbar";
import Featured from '../../components/Featured/Featured';
import List from '../../components/List/List';
import { useEffect, useState } from 'react';
import rootUrl from '../../api';

const Homepage = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(()=>{
    const getRandomLists = async()=>{
      try{
        const res = await fetch(`${rootUrl}/lists${type ? "?type=" + type : ""}${genre ? "&genre="+genre : ""}`,{
          method:"GET",
          credentials: 'include'
        });
        const data = await res.json();
        setLists(data);
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  },[type, genre]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists.map(list=>(
        <List list={list}/>
      ))}
    </div>
  )
}

export default Homepage
