import { Link, useLocation } from 'react-router-dom';
import './Watch.scss';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const Watch = () => {

  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video src={movie.video} className='video' autoPlay loop controls />
    </div>
  )
}

export default Watch
