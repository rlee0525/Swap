import React from 'react';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.check = this.check.bind(this);
  }

  public componentDidMount() {
    const id = this.props.id
    this.getPost(id);
  }

  public componentWillReceiveProps(nextProps) {
    const nextId = nextProps.id;
    if (nextId !== this.props.id) {
      this.getPost(nextId);
    }
  }

  public getPost(id) {
    $.ajax({
      method: "GET",
      url: `http://localhost:3000/api/posts/${id}`
    }).then(data => { this.setState({ data }) });
  }

  public check() {
    console.log(this.state);
  }

  public render() {
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
                     <div className="row">
                       <div className="col-sm-8 col-sm-offset-2">
                         <p className="lead m-x-auto text-center">
                           Instead of guessing how much time you spend on each of your tasks, why not have automagically record everything and have easy reporting without lifting a finger? <span className="hidden-xs">Well now you can with ease.</span>
                         </p>
                       </div>
                     </div>
                     <img className="img-responsive m-t-lg app-block-game-img" src="https://robohash.org/asdf"/>
                   </div>
                 </div>
               </div>
               <div className="item">
                 <div className="block">
                   <div className="container">
                     <div className="row">
                       <div className="col-sm-8 col-sm-offset-2">
                         <p className="lead m-x-auto text-center">
                           Instead of guessing how much time you spend on each of your tasks, why not have automagically record everything and have easy reporting without lifting a finger? <span className="hidden-xs">Well now you can with ease.</span>
                         </p>
                       </div>
                     </div>
                     <img className="img-responsive m-t-lg app-block-game-img" src="https://robohash.org/asdf"/>
                   </div>
                 </div>
               </div>
               <div className="item">
                 <div className="block">
                   <div className="container">
                     <div className="row">
                       <div className="col-sm-8 col-sm-offset-2">
                         <p className="lead m-x-auto text-center">
                           Instead of guessing how much time you spend on each of your tasks, why not have automagically record everything and have easy reporting without lifting a finger? <span className="hidden-xs">Well now you can with ease.</span>
                         </p>
                       </div>
                     </div>
                     <img className="img-responsive m-t-lg app-block-game-img" src="https://robohash.org/asdf"/>
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
            <button onClick={this.check}>Hello</button>
          </div>
        </div>
      </div>
    )
  }
}

export { PostDetail };
