import React from 'react';

interface Props {}
interface State {}

class LoadingSpinner extends React.Component<Props, State> {
  render() {
    return (
        <div className="showbox">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </div>
        </div>
    )
  }
}

export { LoadingSpinner };