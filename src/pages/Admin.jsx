import React, { PureComponent, Fragment } from "react";
import {
  Pane,
  Button,
  Icon,
  SideSheet,
  Tooltip
} from 'evergreen-ui';
import {DraggableGrid} from "../components/DraggableGrid";
import {ImageUpload} from "../components/ImageUpload";

export class Admin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      showAddModal: false,
      imageAddress: ""
    }
  }

  update = (images) => {
    this.props.updateImages(images);
    this.setState({
      edited: true
    });
  };

  save = () => {
    this.setState({
      edited: false
    });
    this.props.save();
  };

  render() {
    const imgGrid = this.props.images.map((image, index) => {
      return (
        <div className={"box"} data-id="1" key={index}>
          <img alt={"rand"} src={image} draggable={false} />
        </div>
      )
    });

    return (
      <Fragment>
        <Pane display="flex" padding={16} color="tint2" borderRadius={3}>
          <Pane>
            <Button marginRight={4} onClick={() => this.setState({
              showAddModal: true
            })}>
              <Icon icon="plus" marginRight={4} /> Add Images
            </Button>
            <Button appearance="primary" onClick={this.save}>
              {this.state.edited &&
                <Tooltip content="You have unsaved changes">
                  <Icon icon="warning-sign" marginRight={4} />
                </Tooltip>
              } Save
            </Button>
          </Pane>
        </Pane>
        <div>
          {imgGrid.length ? (
            <DraggableGrid
              onOrderChange={
                (items) => this.update(items.map(item => item.props.children.props.src))
              }
            >
              {imgGrid}
            </DraggableGrid>
            ) : (
            <div>Loading...</div>
          )}
          <SideSheet
            isShown={this.state.showAddModal}
            onCloseComplete={() => this.setState({
              showAddModal: false
            })}
          >
            <ImageUpload
              addImage={(image) => this.update([...this.props.images, image])}
            />
          </SideSheet>
        </div>
      </Fragment>
    );
  }
}
