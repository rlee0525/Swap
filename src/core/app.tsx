import * as React from 'react';
import Home from 'modules/home';

interface AppProps {
  children?: any;
}

const App: React.SFC<AppProps> = ({ children }) => (
  <div className='home'>
    <Home />
    {children}
  </div>
);

export default App;
