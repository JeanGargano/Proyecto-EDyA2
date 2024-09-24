import '../../Stylesheet/Home/output.css';
import Navbar from './Navbar.js';
import LeftSidebar from './LeftNavbar.js';
import RightSidebar from './ListFriend.js';
import PostFeed from './Post/PostFeed.js';
import { context, useAuth } from '../../Context/AuthProvider.js';
import { useContext } from 'react';

function Home() {

  const {user} = useAuth()
  console.log(user)

  
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Navbar />
        </nav>
        <div className="contenedor-feed">
          <LeftSidebar />
          <RightSidebar />
          {/* Renderizamos las publicaciones */}
          <PostFeed />
        </div>
      </header>
    </div>
  );
}

export default Home;
