import React from 'react';

interface Props {
  context: any;
  array: any[];
  headers: string[];
  isFirstColumnPlaceholder?: boolean;
}

interface State {
}

class TableHeaders extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    isFirstColumnPlaceholder: true
  }
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
    });
    let newPolarity = (polarity === -1 ? 1 : -1);
    context.setState({
      bookmarkedPosts: newArray,
      [key]: newPolarity
    });
  }

  render() {
    let { headers, isFirstColumnPlaceholder } = this.props;
    return (
      <thead>
        <tr>
          { isFirstColumnPlaceholder ? <th id="th-no-caret"></th> : null }
          { headers.map(header => (
            <th onClick={() => this.sortBy(header.toLowerCase())} className="hidden-xs">
              { header === 'updated_at' ? 'Posted' : header }
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
