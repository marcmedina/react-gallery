import React, { PureComponent } from "react";
import { Pane, Button, Heading, Icon, toaster } from 'evergreen-ui';
import {DraggableGrid} from "../components/DraggableGrid";

const backendUrl = "http://localhost:3001";

export class Admin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      section: "Dashboard",
      order: [],
      images: []
    }
  }

  componentWillMount() {
    this.getImages();
  }

  getImages = async () => {
    const request = await fetch(`${backendUrl}/gallery`, {
      method: "GET"
    });

    const response = await request.json();
    this.setState(state => ({
      ...state,
      images: response.images
    }), () => console.log(this.state.images));
  };

  save = async () => {
    const { order } = this.state;

    if (!order.length) {
      return;
    }

    try {
      const request = await fetch(`${backendUrl}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({images: this.state.order})
      });

      const response = await request.json();
      toaster.success("Saved successfully");
    } catch(e) {
      toaster.error("Unable to save gallery");
    }
  };

  onOrderChange = (items) => {
    this.setState(state => ({
      ...state,
      order: items.map(item => item.props.children.props.src)
    }));
  };

  render() {
    const imgGrid = this.state.images.map((image, index) => {
      return (
        <div className={"box"} data-id="1" key={index}>
          <img alt={"rand"} src={image} width={200} height={300} draggable={false} />
        </div>
      )
    });

    return (
      <div>
        <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>Photo Gallery</Heading>
          </Pane>
          <Pane>
            <Button appearance="primary" onClick={this.save}>
              <Icon icon="floppy-disk" marginRight={4} /> Save
            </Button>
          </Pane>
        </Pane>
        <Pane flex={1} padding={16} alignItems="center" display="flex">
          <div>
            {imgGrid.length ? (
              <DraggableGrid
                onOrderChange={this.onOrderChange}
              >
                {imgGrid}
              </DraggableGrid>
              ) : (
              <div>Loading...</div>
              )}
          </div>
        </Pane>
      </div>
    );
  }
}
