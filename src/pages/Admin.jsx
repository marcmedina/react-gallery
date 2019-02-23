import React, { PureComponent } from "react";
import { Pane, Button, Heading, Icon, SideSheet, toaster } from 'evergreen-ui';
import {DraggableGrid} from "../components/DraggableGrid";

const backendUrl = "http://localhost:3001";

export class Admin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      showAddModal: false,
      imageAddress: ""
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
    const { images } = this.state;

    try {
      const request = await fetch(`${backendUrl}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          images
        })
      });

      const response = await request.json();
      toaster.success("Saved successfully");
    } catch(e) {
      toaster.error("Unable to save gallery");
    }
  };

  addImage = (image) => {
    console.log("image", image);
    if (image) {
      this.setState(state => ({
        images: [...state.images, image]
      }));
    }
    // Maybe save
  };

  onOrderChange = (items) => {
    this.setState(state => ({
      ...state,
      images: items.map(item => item.props.children.props.src)
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
            <Button marginRight={4} onClick={() => this.setState({
              showAddModal: true
            })}>
              <Icon icon="plus" marginRight={4} /> Add Images
            </Button>
            <Button appearance="primary" onClick={this.save}>
              <Icon icon="check" marginRight={4} /> Save
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
            <SideSheet
              isShown={this.state.showAddModal}
              onCloseComplete={() => this.setState({ showAddModal: false })}
            >
              <input type="text" value={this.state.imageAddress} onChange={(event) => this.setState({
                imageAddress: event.target.value
              })} />
              <Button appearance="primary" onClick={() => this.addImage(this.state.imageAddress)}>
                <Icon icon="plus" marginRight={4} /> Add Image
              </Button>
            </SideSheet>
          </div>
        </Pane>
      </div>
    );
  }
}
