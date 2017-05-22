import React from 'react';

import { About, Careers, Contact, FAQ } from './subcomponents';

class Infos extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    let page = this.props.location.search.slice(1);

    switch (page) {
      case 'about':
        return <About />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
    }

    return null;
  }
}

export default Infos;
