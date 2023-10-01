import {useState,useEffect} from 'react';

import { useNavigate } from 'react-router-dom'

import classes from './allsongs.module.css';

import Card2 from '../card2/card2'

import Loader from '../../../loader/loader'

import Error from '../../../error/error'

const allSongs = 'http://localhost:5000/api/musicmix/'


const itemsPerPage = 8



const AllSongs = ()=>{
    const navigate = useNavigate()

    const [isLoading,setIsLoading] = useState(false)

    const [isError, setIsError] = useState(false)

    const [allSongsData,setAllSongsData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)


    const startingIndex = (currentPage-1)*itemsPerPage;
    const endingIndex = startingIndex+itemsPerPage;
    const totalPages = Math.ceil(allSongsData.length/itemsPerPage)

    const nextPage = () => {
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }

    const prevPage = () => {
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }

    const handleClick = (id) =>{
        navigate(`/song/${id}`)
    }
    useEffect(()=>{
        const fetchAllSongs = async() => {
            setIsLoading(true)
            try{
                const alldata = await fetch(allSongs)
                const allJson = await alldata.json()
                setAllSongsData(allJson)
                setIsLoading(false)
            }catch(e){
                setIsLoading(false)
                setIsError(true)
            }
        }

        fetchAllSongs()
    },[])
    if(isLoading){
        return(
          <div className={classes.containerbody }>
          <div className={` container ${classes.blurEffect}`}>
            <Loader />
          </div>
        </div>
        )
      }

    if(isError){
        return(
            <Error />
        )
    }
    return(
        <div>
            <h3 className={`text-center ${classes.hovertext} ${classes.hovertextfamily} mt-2`}>All Songs</h3>
            <div className={` d-flex flex-wrap`}>
                {allSongsData.map((item)=>{
                    return(
                        <div key={item.id} className={classes.cardContainer}>
                            <Card2  item={item} handleClick={handleClick}/>
                        </div>
                    )
                }).slice(startingIndex,endingIndex)}
            </div>
            <div className={`d-flex mx-4 center `} >
                <button className={`${classes.button}`} onClick={prevPage}><i className={`bi bi-chevron-double-left`}></i></button >
                <h5 className={` ${classes.pagetext} px-4`}> page: {currentPage}</h5>
                <button className={`${classes.button}`} onClick={nextPage}><i className={`bi bi-chevron-double-right`}></i></button>
            </div>
        </div>
    )
}


export default AllSongs;