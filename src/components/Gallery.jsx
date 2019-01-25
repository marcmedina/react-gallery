import React, { Component } from "react";

export class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      showFeatured: true
    }
  }

  itemClick = () => {
    this.setState({
      showFeatured: false
    });
  };

  updateFeatured = (itemIndex) => {
    this.setState({
      active: itemIndex,
      showFeatured: true
    });
  };

  render() {
    const items = this.props.items.map((item, key) => (
      <a
        key={key}
        onMouseDown={() => this.itemClick()}
        onMouseUp={() => this.updateFeatured(key)}
        className={`item ${this.state.active === key ? 'active' : ''}`}
      >
        <img src={item} />
      </a>
    ));

    return (
      <div className={"gallery"}>
        <div className={"featured"}>
          <img src={this.props.items[this.state.active]} className={this.state.showFeatured ? 'show' : ''}/>
        </div>
        <div className={"items"}>
          {items}
        </div>
      </div>
    );
  }
}