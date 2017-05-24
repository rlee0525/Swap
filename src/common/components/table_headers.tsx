import React from 'react';

interface Props {
  context: any;
  array: any[];
  headers: string[];
}

interface State {
}

class TableHeaders extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  sortBy(key) {
    const { context, array } = this.props;
    let polarity = context.state[key];
    let newArray = array.sort(function(a: object, b: object) {
      if (a[key] < b[key]) return (-1 * polarity);
      if (a[key] > b[key]) return (1 * polarity);
      return 0;
    })
    let newPolarity = (polarity === -1 ? 1 : -1);
    context.setState({
      bookmarkedPosts: newArray,
      [key]: newPolarity
    });
  }

  render() {
    let { headers } = this.props;
    return (
      <thead>
        <tr>
          <th id="th-no-caret"></th>

          { headers.map(header => (
            <th onClick={() => this.sortBy(header.toLowerCase())} className="hidden-xs">
              { header === 'created_at' ? 'Posted' : header }
              <a onClick={() => this.sortBy(header.toLowerCase())} className="btn btn-xs" id="caret-container">
                <span className="caret" />
              </a>
            </th>    
          ))}
        
        </tr>
      </thead>
    );
  }
}

export { TableHeaders };