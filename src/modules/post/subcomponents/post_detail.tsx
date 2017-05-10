import React from 'react';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  public componentDidMount() {

  }

  public render() {
    let img_url1;

    if (this.props.post) {
      img_url1 = this.props.post.img_url1;
    }

    console.log(this.props);

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xs-12">
            <div className="block block-bordered-lg p-l-0 p-t-0 p-r-0">
            <div id="carousel-example-generic-2" className="carousel carousel-light slide" data-ride="carousel">
             <ol className="carousel-indicators">
               <li data-target="#carousel-example-generic-2" data-slide-to="0" className="active"></li>
               <li data-target="#carousel-example-generic-2" data-slide-to="1"></li>
               <li data-target="#carousel-example-generic-2" data-slide-to="2"></li>
             </ol>
             <div className="carousel-inner" role="listbox">
               <div className="item active">
                 <div className="block">
                   <div className="container">
                     <div className="col-sm-8">
                        <img className="img-responsive m-t-lg app-block-game-img" src={img_url1} />
                     </div>
                   </div>
                 </div>
               </div>
               <div className="item">
                 <div className="block">
                   <div className="container">
                     <div className="col-sm-8">
                        <img className="img-responsive m-t-lg app-block-game-img" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494382616/textbooks_cgpwt3.jpg"/>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="item">
                 <div className="block">
                   <div className="container">
                     <div className="col-sm-8">
                        <img className="img-responsive m-t-lg app-block-game-img" src="http://res.cloudinary.com/rlee0525/image/upload/c_pad,h_500,w_500/v1494382616/textbooks_cgpwt3.jpg"/>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <a className="left carousel-control" href="#carousel-example-generic-2" role="button" data-slide="prev">
               <span className="icon icon-chevron-thin-left" aria-hidden="true"></span>
               <span className="sr-only">Previous</span>
             </a>
             <a className="right carousel-control" href="#carousel-example-generic-2" role="button" data-slide="next">
               <span className="icon icon-chevron-thin-right" aria-hidden="true"></span>
               <span className="sr-only">Next</span>
             </a>
           </div>
         </div>
          </div>
          <div className="col-lg-6 col-xs-12">
            Hello
          </div>
        </div>
      </div>
    )
  }
}

export { PostDetail };
