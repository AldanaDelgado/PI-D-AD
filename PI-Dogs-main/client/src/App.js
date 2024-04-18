import {Route, Routes } from 'react-router-dom';
import {Landing,Detail,About,Create,Home} from './Components/Views/index';
import Error from "./Components/Views/Error/error";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/newdog" element={<Create/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  ); 
}

export default App;
