import React, { Component } from 'react';
import './App.css';
import { Gallery } from "./components/Gallery";

const items = [
  'https://fedoramagazine.org/wp-content/uploads/2016/10/skamath-HD-Wallpapers1.jpg',
  'https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://wallpaper-house.com/data/out/8/wallpaper2you_247564.jpg',
  'https://store-images.s-microsoft.com/image/apps.56149.13510798887023509.52cb7b9d-27cf-417d-b33e-e4e758263928.1129934f-d053-41a1-935a-20913a56ea70?mode=scale&q=90&h=720&w=1280',
  'https://fedoramagazine.org/wp-content/uploads/2016/10/skamath-HD-Wallpapers1.jpg',
  'https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://wallpaper-house.com/data/out/8/wallpaper2you_247564.jpg',
  'https://store-images.s-microsoft.com/image/apps.56149.13510798887023509.52cb7b9d-27cf-417d-b33e-e4e758263928.1129934f-d053-41a1-935a-20913a56ea70?mode=scale&q=90&h=720&w=1280',
];

class App extends Component {
  render() {
    return (
      <Gallery items={items} />
    );
  }
}

export default App;
