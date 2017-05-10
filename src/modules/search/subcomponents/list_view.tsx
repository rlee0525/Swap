import React from 'react';

interface Props {
  user: object
}

interface State {

}

class ListView extends React.Component<Props, State> {
  render() {
    return (
      <table className="table table-hover hidden">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Posting Date</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mattress for Sale</td>
            <td>Twin size mattress, 3 months old, no covers</td>
            <td>$34</td>
            <td>3 days ago</td>
            <td>Brand New</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>iPhone 6 32GB Black</td>
            <td>Brand New, unlocked</td>
            <td>$400</td>
            <td>4 hours ago</td>
            <td>Used</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Econ 101</td>
            <td>Economic Basics, barely used</td>
            <td>$40</td>
            <td>10 minutes ago</td>
            <td>Like New</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Econ 101</td>
            <td>Economic Basics, barely used</td>
            <td>$40</td>
            <td>10 minutes ago</td>
            <td>Like New</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Econ 101</td>
            <td>Economic Basics, barely used</td>
            <td>$40</td>
            <td>10 minutes ago</td>
            <td>Brand New</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export { ListView };