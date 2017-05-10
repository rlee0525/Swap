import * as React from 'react';
import NavBar from 'core/navbar';
import Footer from './footer';

interface AppProps {
  children?: any;
}

const App: React.SFC<AppProps> = ({ children }) => (
  <div className='home'>
    <NavBar />
    {children}
    <Footer />
  </div>
);

export default App;
