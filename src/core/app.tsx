import * as React from 'react';
import HomeContainer from 'modules/home';

interface AppProps {
  children?: any;
}

const App: React.SFC<AppProps> = ({ children }) => (
  <div className='home'>
    <HomeContainer />
    {children}
  </div>
);

export default App;
