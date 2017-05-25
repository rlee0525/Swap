import React from 'react';
import _ from 'lodash';
declare var $;

class Pagination extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      maxPages: 1
    }

    this.setCurrentPage = this.setCurrentPage.bind(this)
    this.goPrevious = this.goPrevious.bind(this)
    this.goNext = this.goNext.bind(this)
  }

  public goPrevious() {
    if (this.props.currentPage > 1) {
      this.props.that.setState({currentPage: this.props.currentPage - 1})
      window.scrollTo(0, 0);
    }
  }

  public goNext() {
    if (this.props.currentPage < this.props.maxPages) {
      this.props.that.setState({currentPage: this.props.currentPage + 1})
      window.scrollTo(0, 0);
    }
  }

  public setCurrentPage(page) {
    this.props.that.setState({currentPage: page})
    window.scrollTo(0, 0);
  }

  public render() {
    $(".pagination").rPage();
    const current = this.props.currentPage;
    const max = this.props.maxPages + 1;
    let range = _.range(1, max);
    let pages = range.map(page => (
      <li key={page}
      className={page === current ? "active" : null}
      onClick={() => this.setCurrentPage(page)}>
        <a>{page}</a>
      </li>
    ))

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li>
            <a onClick={this.goPrevious} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages}
          <li>
            <a onClick={this.goNext} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export { Pagination };
