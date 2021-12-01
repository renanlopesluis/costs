import {Routes, Route} from 'react-router-dom';
import Container from '../Container/Container'
import Home from '../../pages/Home/Home';
import Contact from '../../pages/Contact/Contact';
import About from '../../pages/About/About';
import Projects from '../../pages/Projects/Projects';
import Project from '../../pages/Project/Project';
import NewProject from '../../pages/NewProject/NewProject';

function Menu(){
    return (
        <Container customClass="min-height">
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/projects" element={<Projects/>}/>         
                <Route path="/newproject" element={<NewProject/>}/>  
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={ <Contact/>}/>  
                <Route path="/project/:id" element={ <Project/>}/>  
            </Routes>
        </Container>
    )
}

export default Menu;