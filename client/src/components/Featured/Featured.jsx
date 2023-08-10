import './Featured.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import rootUrl from "../../api" ;


const Featured = ({type, setGenre}) => {

  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try{
        const res = await fetch(`${rootUrl}/movies/random?type=${type}`,{
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        setContent(data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent();
  },[type])

  return (
    <div className='featured'>
        {type && (
            <div className="category">
                <span>{type === "movies"? "Movies":"Series"}</span>
                <select name="genre" id="genre" onChange={(e)=>setGenre(e.target.value)}>
                    <option> Genre </option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="romance">Romance</option>
                </select>
            </div>
        )}
      <img src={content.img} alt="Oppenheimer" />

      <div className="info">
        <div className='movieTitle'>{content.imgTitle}</div>    
        
        <span className='desc'> 
            {content.desc}
        </span>
        <div className="buttons">
            <button className="play">
                <PlayArrowIcon />
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlinedIcon />
                <span>Info</span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Featured
