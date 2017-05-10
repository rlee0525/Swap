import * as React from 'react';
import NavBar from 'core/navbar';

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
