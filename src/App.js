import React, { useEffect } from 'react';
import SignUp from './components/SignUp'
import Login from './components/Login'
import { api } from './services/api';
import './App.css';

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          api.auth.getCurrentUser().then(user => {
            /// finish this 
          })
        } 
	}, [])

  // componentDidMount() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     api.auth.getCurrentUser().then(user => {
  //       if (user.error) return alert(user.error)
  //       const updatedState = { ...this.state.auth, user: user };
  //       this.setState({ 
  //         auth: updatedState,
  //        });
  //     }).catch(error => console.log(error))
  //   } 
  // }


  const login = (username, password) => {
    api.auth.login(username, password)
    .then(data => localStorage.setItem("token", data.jwt))
  }


  return (
    <div className="App">
      {/* <SignUp /> */}
      <Login onLogin={login} />
    </div>
  );
}

export default App;
