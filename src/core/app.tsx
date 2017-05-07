import React from 'react';
import HomeContainer from 'modules/home'
const App = ({ children }) => (
  <div className="home">
    <div className="home-overlay">
      <HomeContainer />
      { children }
    </div>
  </div>
);

export default App;
