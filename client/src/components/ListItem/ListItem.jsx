import './ListItem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rootUrl from "../../api" ;

const ListItem = ({index, item}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    const getMovie = async()=>{
      try{
        const res = await fetch(`${rootUrl}/movies/find/`+ item,{
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        setMovie(data);
      }catch(err){
        console.log(err);
      }
    }
    getMovie();
  },[item])

 
  return (

    <Link to="/watch" state={{movie: movie}}>
    
      <div className='listItem' 
        style={{left: isHovered && index*225 - 50 + index * 2.5}}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
      >
        <img src={movie.imgSm} alt="Joker" />
        {isHovered && (
        <>
        <video src={movie.trailer} autoPlay={true} loop />
        <div className="itemInfo">
          <div className="icons">
            <PlayArrowIcon className="icon"/>
            <AddIcon className="icon"/>
            <ThumbUpOutlinedIcon className="icon"/>
            <ThumbDownOutlinedIcon className="icon"/>
          </div>
          <div className="itemInfoTop">
            <span>{movie.title}</span>
            <span>{movie.duration}</span>
            <span className='limit'>+{movie.limit}</span>
            <span>{movie.year}</span>
          </div>
          <div className="desc">{movie.desc}</div>
          <div className="genre">{movie.genre}</div>
        </div>
        </>
        )}
      </div>
    </Link>
  )
}

export default ListItem
