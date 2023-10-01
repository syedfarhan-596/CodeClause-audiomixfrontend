import Card from '../../card/card'

import Loader from '../../../loader/loader'

import classes from './trending.module.css'

import { useState,useEffect } from 'react'

import Error from '../../../error/error'

const trendMusic = 'http://localhost:5000/api/musicmix/trends/'

const Trending =( ) => {
    const [isLoading,setIsLoading] = useState(false)
    const [musicMixTrends,setMusicMixTrends] = useState([])
    const [isError, setIsError] = useState(false)
    
    useEffect(()=>{
    const fetchMusicMix = async() => {
    setIsLoading(true)
    try{
      const data = await fetch(trendMusic)
      const dataJson = await data.json()
      setMusicMixTrends(dataJson)
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
      setIsError(true)
    }
 }

    fetchMusicMix()
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
  const trending = musicMixTrends.slice(0,6)
    return(
        <div className="trendingSection ">
                <div className="d-flex justify-content-between">
                    <h5 className="text-black">Top Trendings</h5>
                </div>
                <div className={`d-flex justify-content-around`}>
                    {trending.map((item)=> {
                        return(
                            <Card key={item.id} setIsLoading={setIsLoading} item={item} />
                        )
                    })}
                </div>
            </div>
    )
}
export default Trending;