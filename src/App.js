import React, { PureComponent, Fragment } from 'react';
import './App.css';
import { MainMenu } from "./components/MainMenu";
import {Heading, Pane, toaster} from "evergreen-ui";
import {Router} from "./modules/Router";

const backendUrl = "http://localhost:3001";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "Gallery",
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

  getConfig = () => ({
    pages: [
      {
        name: "Gallery",
        props: {
          items: this.state.images
        }
      },
      {
        name: "Admin",
        props: {
          save: this.save,
          images: this.state.images,
          updateImages: this.updateImages
        }
      }
    ]
  });

  render() {
    const config = this.getConfig();
    let menuItems =[];
    const page = config.pages.reduce((page, currentPage) => {
      const {name, props} = currentPage;
      menuItems = [...menuItems, name];
      if (name === this.state.page) {
        page = Router(name, props);
      }
      return page;
    }, <div>404 not found</div>);

    return (
      <Fragment>
        <Pane
          display="flex"
          padding={16}
          background="tint2"
          elevation={1}
        >
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600}>Photo Gallery</Heading>
          </Pane>
          <Pane>
            <MainMenu
              items={menuItems}
              onSelect={(page) => this.setState({ page })}
            />
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
