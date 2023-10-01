import classes from './MainApp.module.css'

import {useState, useEffect} from 'react'

import Main from '../main1/main'

import Loader from '../../loader/loader'

import Card2 from '../sections/card2/card2'

import { useNavigate } from 'react-router-dom'

const MainApp = () => {
  let [value,setValue] = useState('')
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=> {
    setValue(e.target.value)
  }
  const searchUrl = `http://localhost:5000/api/musicmix/?search=${value}`
  useEffect(()=>{
      const fetchSearchUrl = async() => {
        setIsLoading(true)
        try{
          const search = await fetch(searchUrl)
          const searchJson = await search.json()
          setSearchData(searchJson)
          setIsLoading(false)
        }catch(e){
          setIsLoading(false)
          console.log(e)
        }
    }
    fetchSearchUrl()
  },[value,searchUrl])
  const handleClick =(id) => {
    navigate(`/song/${id}`)
}
  return (
    <div className={classes.containerbody }>
      <div className={` container ${classes.blurEffect}`}>
        <div className='d-flex justify-content-between'>
          <h1 className={classes.heading1}><span className={classes.content}>M</span><span className={classes.contentx}>X</span></h1>
          <div>
            <input onChange={handleChange} type="text" autoComplete="off" name="text" className={classes.input} placeholder="Looking for something ?"></input>
            {value.length>0? <div className={classes.searchData}>
              { searchData.length===0?<div>
                <h5 className={classes.heading5}>Oops Nothing</h5>
                <h5 className={classes.heading5}>Like That</h5>
              </div>:
              searchData.map((item)=>{
                if(isLoading){
                  return(
                    <Loader />
                  )
                }
                return(
                  <div className='mt-1' key={item.id}>
                    <Card2 item={item} handleClick={handleClick}/>
                  </div>
                )
              }).slice(0,2)}
            </div>:''
            }
          </div>
        </div>
        <Main />
        <div>
        </div>
      </div>
    </div>
  );

}

export default MainApp;
