import * as React from 'react';
import NavBar from 'modules/navbar';

interface AppProps {
  children?: any;
}

const App: React.SFC<AppProps> = ({ children }) => (
  <div className='home'>
    <NavBar />
    {children}
  </div>
);

export default App;
