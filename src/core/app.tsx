import * as React from 'react';
import HomeContainer from 'modules/home';

interface IAppProps {
  children?: any;
}

const App: React.SFC<IAppProps> = ({ children }) => (
  <div className="home">
    <HomeContainer />
    { children }
  </div>
);

export default App;
