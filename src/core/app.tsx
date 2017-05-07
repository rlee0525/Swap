import * as React from 'react';
import HomeContainer from 'modules/home';


interface IRootProps {
  children?: any;
}

const App: React.SFC<IRootProps> = ({ children }) => (
  <div className="home">
    <div className="home-overlay">
      <HomeContainer />
      { children }
    </div>
  </div>
);

export default App;
