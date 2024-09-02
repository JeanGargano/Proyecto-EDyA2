import '../Stylesheet/output.css';
import Navbar from './Navbar.js';
import Publisher from './Publisher.js';
import LeftSidebar from './LeftNavbar.js';
import RightSidebar from './ListFriend.js';
import Post from './Post.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        <Navbar />
        </nav>
        <div className='contenedor-feed'>
          <Publisher />
          <LeftSidebar />
          <RightSidebar />
          <Post />
        </div>
          
      </header>
    </div>
  );
}

export default App;
