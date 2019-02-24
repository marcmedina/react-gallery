import React, { Component, Fragment } from 'react';
import './App.css';
import { Admin } from "./pages/Admin";
import {Gallery} from "./components/Gallery";
import {Button, Heading, Menu, Pane, Popover, Position, toaster} from "evergreen-ui";

const backendUrl = "http://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "Admin",
      images: []
    };
  }

  componentDidMount() {
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
    }));
  };

  updateImages = (images) => {
    console.log("images", images);
    this.setState({
      images
    })
  };

  save = async () => {
    const { images } = this.state;

    try {
      await fetch(`${backendUrl}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          images
        })
      });
      this.message("success", "Saved successfully");
      this.setState({
        edited: false
      });
    } catch(e) {
      this.message("error", "Unable to save gallery");
    }
  };

  message = (type, text) => {
    toaster[type](text);
  };

  render() {
    const page = (() => {
      switch(this.state.page) {
        case "Gallery":
          return <Gallery
            items={this.state.images}
          />;
        case "Admin":
        default:
          return <Admin
            save={this.save}
            images={this.state.images}
            updateImages={this.updateImages}
          />;
      }
    })();

    return (
      <Fragment>
        <Pane display="flex" padding={16} background="overlay" borderRadius={3}>
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>New Hotness</Heading>
          </Pane>
          <Pane>
            <Popover
              position={Position.BOTTOM_LEFT}
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item
                      onSelect={() => this.setState({page: "Gallery"})}
                    >
                      Gallery
                    </Menu.Item>
                    <Menu.Item
                      onSelect={() => this.setState({page: "Admin"})}
                    >
                      Admin
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }>
              <Button appearance="primary" marginRight={16}>Menu</Button>
            </Popover>
          </Pane>
        </Pane>
        <Pane>
          {page}
        </Pane>
      </Fragment>
    );
  }
}

export default App;
