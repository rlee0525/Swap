import React from 'react';

interface Props {
  search(query: string) : void;
}

interface State {
}

class SearchNavbar extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      this.props.search(e.target.value);
    }
  }

  private onChange(e: any) {
    this.props.search(e.target.value);
  }

  public render() {
    return (
      <div className="col-md-2 menu">
        <dl>
          <dt>Categories</dt>
          <a href="#/all"><dd>What's New</dd></a>
          <a href="#/textbooks"><dd>Textbooks</dd></a>
          <a href="#/clothing"><dd>Clothing</dd></a>
          <a href="#/furniture"><dd>Furniture</dd></a>
          <a href="#/electronics"><dd>Electronics</dd></a>
          <a href="#/kitchenware"><dd>Kitchenware</dd></a>
          <a href="#/games"><dd>Games</dd></a>
        </dl>
        <div className="input-group">
          <label htmlFor="search-input">Search</label>
          <input id="search-input" type="text" className="form-control" placeholder="Course Name" onChange={this.onChange} />
        </div>
        <br/>
      </div>
    );
  }
}

export { SearchNavbar };



// import React from 'react';
//
// interface Props {}
//
// interface State {}
//
// class SearchNavbar extends React.Component<Props,State> {
//   constructor(props: object) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
//         <div className="container">
//           <div className="navbar-header">
//             <button
//               type="button"
//               className="navbar-toggle collapsed p-x-0"
//               data-toggle="collapse"
//               data-target="#navbar-collapse"
//             >
//               <span className="sr-only">Toggle navigation</span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//             <a className="navbar-brand" href="../">
//               <span>Swap</span>
//             </a>
//           </div>
//           <div className="navbar-collapse collapse" id="navbar-collapse">
//             <ul className="nav navbar-nav navbar-right">
//               <li >
//                 <a href="#">Search</a>
//               </li>
//               <li className="active">
//                 <a href="#">Who are we?</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }
//
// export { SearchNavbar };
