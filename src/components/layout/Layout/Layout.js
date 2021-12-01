import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import Menu from '../Menu/Menu'
import Footer from '../Footer/Footer'

function Layout(){
    return (
      <Router>
        <NavBar/>
        <Menu/>
        <Footer/>
      </Router>
    )
}

export default Layout;