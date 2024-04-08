import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Home = () => {
  return (
    <div>
      <h1>Boilerplate for React Redux Toolkit integrated with API service</h1>
      <p style={{ maxWidth: "600px", margin: "auto" }}>
        A comprehensive template for React projects, incorporating Redux Toolkit to manage state efficiently and seamlessly integrating with API services, providing a robust foundation for building scalable and maintainable web applications.
      </p>
    </div>
  )
}

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
