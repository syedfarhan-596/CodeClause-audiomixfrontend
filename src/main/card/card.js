import { useNavigate } from 'react-router-dom';

import classes from './card.module.css'


const Card =(props)=>{
    const {item} = props
    const navigate = useNavigate();
   const handleClick = (id) => {
    navigate(`song/${id}`)
   }
            return(
                    <div className=''>                    
                        <div className={classes.containerImgBtn} onClick={()=>handleClick(item.id)}>
                            <img  src={item.cover_img} alt={item.title} width='100' height='100' className={classes.image}/>
                            <button className={`${classes.button} btn `}><i className="bi bi-play-circle-fill"></i></button>
                        </div>
                        <h6 className='text-black font-weight-bold text-center text-name pt-1'>{item.title}</h6>
                    </div>
            )
}

export default Card;