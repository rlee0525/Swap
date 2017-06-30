declare var $;

import _ from 'lodash';
import React from 'react';
import { merge } from 'lodash';

class Pagination extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.setCurrentPage = this.setCurrentPage.bind(this)
    this.goPrevNext = this.goPrevNext.bind(this)
  }

  public goPrevNext(polarity) {
    if ((this.props.currentPage > 1 && polarity === -1) ||
      (this.props.currentPage < this.props.maxPages) && polarity === 1) {
      const currentQuery = this.props.currentQuery;
      const nextQuery = merge({}, currentQuery, {page_idx: this.props.currentPage + polarity});
      this.props.saveQuery(nextQuery);
      this.props.search(nextQuery);
      window.scrollTo(0, 0);
    }
  }

  public setCurrentPage(page_idx) {
    const currentQuery = this.props.currentQuery;
    const nextQuery = merge({}, currentQuery, {page_idx});
    this.props.saveQuery(nextQuery);
    this.props.search(nextQuery);
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
            <a onClick={() => this.goPrevNext(-1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages}
          <li>
            <a onClick={() => this.goPrevNext(1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export { Pagination };
