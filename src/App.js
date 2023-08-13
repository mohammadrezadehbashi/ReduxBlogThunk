// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './app/Navbar';
import PostList from './feature/posts/PostList';
import AddPost from './feature/posts/AddPost';
import UsersList from './feature/users/UsersList';
import UserPage from './feature/users/UserPage';
import { Fragment } from 'react';
import PostPage from './feature/posts/singlePost/PostPage';

function App() {
  
  return (
    < >
      <Router>
        <Navbar />

        <div className='App'>
          <Routes>
            <Route>
              {/* <Route element={<AddPost />} />
              <Route element={<PostList />} /> */}
              <Route path='/' element={<Home />} exact/>
              <Route />
            </Route>
            <Route >
              <Route path="/users" element={<UsersList />} exact/>
            </Route>
            <Route>
              <Route path="/users/:id" element={<UserPage />} exact/>
            </Route>
            <Route>
              <Route path="/posts/:id" element={<PostPage/>} exact/>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

function Home(params) {
  return (
    <>
      <AddPost />
      <PostList />
    </>
  )
}
{/* <Router>
<Fragment>
<Navbar />

<div className='App'>
  <Routes>
    <Route path='/' exact>
      <AddPost />
      <PostList />
    </Route>
    <Route path="/users" exact>
      <UsersList />
    </Route>
    <Route path="/users/:userid" exact>
      <UserPage />
    </Route>
  </Routes>
</div>
</Fragment>
</Router> */}