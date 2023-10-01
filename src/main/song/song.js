import React, { useEffect, useState } from 'react'

import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import Card2 from '../sections/card2/card2'

import Loader from '../../loader/loader'

import Error from '../../error/error'

import classes from './song.module.css'

const Song = () => {
    const { id } = useParams();

    const songUrl = `http://localhost:5000/api/musicmix/${id}`

    const [song,setSong] = useState([])

    const [allSongData, setAllSongsData] = useState([])

    const [isError,setIsError] = useState(false)

    const allSongs = 'http://localhost:5000/api/musicmix/'

    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate()

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
    const fetchThisSong = async() => {
        setIsLoading(true)
        try{
            const songData = await fetch(songUrl)
            const songJson = await songData.json()
            setSong(songJson)
            setIsLoading(false)
        }catch(e){
            setIsError(true)
        }
    } 
        fetchThisSong()
    },[id,songUrl]) 

    const handleClick =(id) => {
        navigate(`/song/${id}`)
    }
    if(isLoading){
        return(
        <div className={classes.containerbody }>
            <div className={` container ${classes.blurEffect}`}>
              <Loader />
            </div>
        </div>
          )}

    if(isError){
        return(
            <Error />
        )
    }
    const sameSinger = allSongData.filter((item) => item.singer_name === song.singer_name && item.id !== song.id )
        return (
            <div className={classes.containerbody }>
                <div className={` container ${classes.blurEffect}`}>
                    <div className='container'>
                        <div className='d-flex justify-content-evenly'>
                            <img alt={song.title} src={song.cover_img} className={classes.coverImg} />
                            <div className='text-center pt-2'>
                                <h1 className={`${classes.title} ${classes.heading5}`}> {song.title}</h1>
                                <h5 className={` ${classes.heading5} pt-2`}>Language:- {(song.language)&&(song.language).toUpperCase()} </h5>
                                <h5 className={` ${classes.heading5} pt-2`}>Artist:- {(song.singer_name)&&(song.singer_name).toUpperCase()}</h5>
                            <div className={classes.textcontainer}>
                                    <h6 className={`${classes.textstyle} text-black ${classes.heading5} `} > More of {(song.singer_name)}</h6>
                                    {sameSinger.length === 0? <div className={classes.heading5}>Sorry None </div>:
                                    sameSinger.map((item) => {
                                        return(
                                            <div className={` mt-4 ${classes.singercontainer}`}>
                                                <Card2 key={item.id} item={item} handleClick={handleClick} />
                                            </div>
                                        )
                                    }).slice(0,5)}
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={`  d-flex justify-content-around ${classes.containeraudio}`}>
                        <audio className={classes.audio} controls autoPlay src={song.audio_file}></audio>
                        <a href={song.audio_file} className={`text-center font-weight-bold  btn ${classes.heading5} ${classes.button}`}> Download <i className="bi bi-download"></i> </a>
                    </div>
                </div>
            </div>
        )
}
export default Song;

