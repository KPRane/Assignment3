import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Nav, Container, Navbar } from 'react-bootstrap'
import Product from './Components/Product';
import CourseList from './Components/CourseList';
import Userlist from './Components/Userlist';
function App() {
  return (
    <div>
       <Router>
        <Nav variant="pills" className="bg-dark text-white" style={{ height: "40px",marginTop:"2px"}}>
          <Navbar.Brand className="justify-content">
            DECHATALON
          </Navbar.Brand>
          <Container>
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link  ><Link to="/" className="text-white">PRODUCT</Link></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link  ><Link to="/CourseList" className="text-white">LIST</Link></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link  ><Link to="/Userlist" className="text-white">ENQUITY DATA</Link></Nav.Link>
              </Nav.Item>
             
             
            </Nav>
          </Container>
        </Nav> 

        <Switch>
          <Route path="/" exact component={Product}></Route>
          <Route path="/CourseList"  exact component={CourseList}></Route>
          <Route path="/Userlist"  exact component={Userlist}></Route>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
