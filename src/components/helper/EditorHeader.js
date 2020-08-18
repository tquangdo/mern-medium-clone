import React, { Component } from 'react'

class EditorHeader extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid col-md-10 col-md-offset-1">
            <div className="navbar-header">
              <a className="navbar-brand" id="logo" href="/">
                <img alt="Stories" src="/assets/img/stories-logo.svg" height="40" />
              </a>
            </div>
            <ul className="nav navbar-nav filter-links">
            </ul>
            <div className="collapse navbar-collapse">
              <div>
                <button onClick={() => this.props.publish()} className={this.props.loading === true ? "button green-inner-button dropdown-toggle" : "button green-border-button dropdown-toggle"}>
                  {this.props.loading === true ? 'Publishing' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default EditorHeader