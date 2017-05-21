import React from 'react';

class About extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="block app-price-plans">
        <div className="container text-center">

          <div className="row m-b-lg">
            <div className="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
              <h3 className="m-t-0">Meet the team</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 p-x m-b-lg">
              <div className="p-x">
                <img className="m-b img-circle" src="http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/001/691/medium/Raymond_Lee.jpg?1479426917"/>
                <h6 className="text-muted text-uppercase m-b">Raymond Lee</h6>
                <p></p>
              </div>

              <ul className="list-unstyled list-bordered text-left m-y-md">
                <li className="p-y"><a href="https://www.linkedin.com/in/rlee0525/" target="_blank"><strong>LinkedIn</strong></a></li>
              </ul>
            </div>

            <div className="col-sm-4 p-x m-b-lg">
              <div className="p-x">
                <img className="m-b img-circle" src="http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/001/697/medium/Randy_Jap.jpg?1479426910"/>
                <h6 className="text-muted text-uppercase m-b">Randy Jap</h6>
                <p></p>
              </div>

              <ul className="list-unstyled list-bordered text-left m-y-md">
                <li className="p-y"><a href="https://www.linkedin.com/in/randyjap/" target="_blank"><strong>LinkedIn</strong></a></li>
              </ul>
            </div>

            <div className="col-sm-4 p-x m-b-lg">
              <div className="p-x">
                <img className="m-b img-circle" src="http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/001/683/medium/David_Hu.jpg?1479424778"/>
                <h6 className="text-muted text-uppercase m-b">David Hu</h6>
                <p></p>
              </div>

              <ul className="list-unstyled list-bordered text-left m-y-md">
                <li className="p-y"><a href="https://www.linkedin.com/in/davidhu2000/" target="_blank"><strong>LinkedIn</strong></a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export { About };
