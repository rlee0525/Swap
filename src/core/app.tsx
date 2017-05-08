import * as React from 'react';
import Navbar from 'core/navbar';
import Home from 'modules/home';

interface AppProps {
  children?: any;
}

const App: React.SFC<AppProps> = ({ children }) => (
  <div className='home'>
    <Navbar />
    <Home />
    {children}
  </div>
);

export default App;
