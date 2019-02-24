import React from "react";
import Loadable from 'react-loadable';

export function Router(name, props) {
    const Page = Loadable({
      loader: () => import(`../pages/${name}`),
      loading: () => <div>Loading...</div>
    });
    return React.createElement(Page, props);
}
