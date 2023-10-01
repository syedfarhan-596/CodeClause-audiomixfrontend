
import classes from './card2.module.css'

const Card2 = ({item,handleClick}) => {
    return(
            <div onClick={()=>handleClick(item.id)}  className={` ${classes.blockcontainer} ${classes.hovertext} d-flex justify-content-between`}>
                <div className={`${classes.cardcontainer} `}>
                        <img src={item.cover_img} alt={item.title} width='30' />
                        <h6 className={` ${classes.hovertext} ${classes.heading6} px-2 `}>{item.title}</h6>
                </div> 
                    <i className={` ${classes.play} bi bi-play-circle-fill`}></i>
            </div>
    )
}
export default Card2;