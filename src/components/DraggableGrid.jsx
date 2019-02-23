import React, { PureComponent } from "react";

export class DraggableGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: props.children,
      isDragging: undefined,
    };
  }

  drag;

  componentDidMount() {
    window.addEventListener('mouseup', this.dragStop);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.dragStop);
  }

  componentDidUpdate() {
    this.setState({
      items: this.props.children
    });
  }

  dragStart(event, key) {
    this.setState({
      isDragging: key
    });
    this.drag = event.target;
  }

  dragStop = () => {
    if (this.state.isDragging !== undefined) {
      this.setState({
        isDragging: undefined
      });
      this.drag = null;
    }
  };

  detectCollision(event, key) {
    if (
      this.state.isDragging !== undefined &&
      key !== this.state.isDragging
    ) {
      const newOrder = swapArrayIndex(this.state.items, this.state.isDragging, key);
      this.props.onOrderChange(newOrder);
      this.setState({
        items: newOrder,
        isDragging: key
      });
    }
  }

  render() {
    return (
      <div className={`grid ${this.state.isDragging ? 'addCursor' : ''}`}>
        {this.state.items.map((child, key) => (
          <div
            key={key}
            className={`gridItem ${this.state.isDragging === key ? 'dragging' : ''}`}
            onMouseDown={(e) => this.dragStart(e, key)}
            onMouseOver={(e) => this.detectCollision(e, key)}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
}

function swapArrayIndex(array, currentIndex, endIndex) {
  const items = Object.assign({}, [...array]);

  items['tmp'] = items[endIndex];
  items[endIndex] = items[currentIndex];
  items[currentIndex] = items['tmp'];
  delete items.tmp;

  return Object.values(items);
}
