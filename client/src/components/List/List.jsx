import './List.scss';
import ListItem from '../ListItem/ListItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';
import { useState } from 'react';

const List = ({list}) => {
    const[slideNumber, setSlideNumber]= useState(0);
    const[clickLimit, setClickLimit]= useState(window.innerWidth / 230);
    const[isMoved, setIsMoved]= useState(false);
    const listRef = useRef();
    
    function handleClick(direction) {
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber-1);
            listRef.current.style.transform = `translate(${230 + distance}px)`;
        }
        if (direction === 'right' && slideNumber < 10 - clickLimit){
            setIsMoved(true);
            setSlideNumber(slideNumber+1);
            listRef.current.style.transform = `translate(${-230 + distance}px)`;
        }
    }
  return (
    <div className='list'>
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosIcon className="sliderArrow left" style={{display: !isMoved && 'none'}} onClick={()=>handleClick("left")} />
        <div className="container" ref={listRef}>
            {list.content.map((item,i)=>(
              <ListItem index={i} item={item} />
            ))}
        </div>
        <ArrowForwardIosIcon className="sliderArrow right" onClick={()=>handleClick("right")} />
      </div>
    </div>
  )
}

export default List
