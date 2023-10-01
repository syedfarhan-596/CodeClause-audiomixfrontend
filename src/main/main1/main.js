import classes from './main.module.css'

import Trending from '../sections/trending/trending'

import AllSongs from '../sections/allsongs/allsongs'

const Main = ()=>{
    return(
            <div>
                <div className={classes.sections}>
                    <Trending />
                </div>
                <div className={classes.allSongs}>
                    <AllSongs />
                </div>
            </div>
    )
}
export default Main