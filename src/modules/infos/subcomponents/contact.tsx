import React from 'react';

class Contact extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="block app-price-plans">
        <div className="container text-center">
          <div className="row m-b-lg">
            <div className="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
              <h6 className="text-muted text-uppercase">We'd love to hear from you</h6>
              <h6 className="text-muted text-uppercase">Drop us a line at</h6>
              <h6 className="text-muted text-uppercase">swapnowio[at]gmail.com</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Contact };
