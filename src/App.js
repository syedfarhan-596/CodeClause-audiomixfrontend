import { BrowserRouter,Routes,Route } from "react-router-dom";

import MainApp from './main/MainApp/MainApp'

import Song from './main/song/song'

function App(){
  return (
    <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<MainApp />} ></Route>
          <Route path={`/song/:id`} element={<Song />}></Route>
        </Routes>
    </BrowserRouter>
  );
}


export default App;
