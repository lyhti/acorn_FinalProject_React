import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import MainPage from './main/mainPage';

function App() 
{
  return (
  <BrowserRouter>
      {/* '/'(root) 로 시작 할 시 무조건  '/Mo_kyeonny' 이 주소로 이동한다. */}
     <Route exact path="/" component={() => (<Redirect to='/Mo_kyeonny'/>)}/>
      <Route path="/Mo_kyeonny" component={MainPage}/>     
  </BrowserRouter>
  );
}

export default App;
