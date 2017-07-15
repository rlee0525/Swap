import React from 'react';

class About extends React.Component<any, any> {
  public componentWillMount() {
    window.scrollTo(0, 0);
  }

  public render() {
    return (
      <div className="block app-price-plans">
        <div className="container text-center">
          <div className="row m-b-lg">
            <div className="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
              <h3 className="m-t-0 text-uppercase letter-spacing">About Swap</h3>
            </div>
          </div>
          <div className="row">
            <p className="about-text"> 
              Swap is a free online platform that allows students to connect 
              with fellow classmates and exchange goods.<br/><br/>
              
              Swap allows students to post items they don’t need while giving others the opportunity to find exactly what they want. 
              We offer exclusivity, convenience, and specialized features 
              which are not available on conventional forums or typical free and for sale message boards.
              One such features, allows students to enter their courses to find items that are directly related.  
              This makes finding textbooks, lab equipment, and other course material seamless 
              and tailored to individual students needs.<br/><br/>

              As hungry students themselves, the founders of Swap wanted to contribute to the community and provide 
              a platform where students can connect and add to their school life.
              As an exclusive marketplace for Berkeley students, it is safer, more local, and more convenient.
              <br/><br/>
              For more information, send an email to <strong>swapnowio@gmail.com.</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export { About };
