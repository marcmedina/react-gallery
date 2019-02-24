import {Button, Icon, Popover, Menu, Position} from "evergreen-ui";
import React from "react";

export function MainMenu(props) {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={({close}) =>
        <Menu>
          <Menu.Group title="Pages">
            {props.items.map(
              (item, index) => (
                  <Menu.Item
                    key={index}
                    onSelect={() => {
                      props.onSelect(item);
                      close();
                    }}
                  >
                    { item }
                  </Menu.Item>
            ))}
          </Menu.Group>
        </Menu>
      }>
      <Button height={40}>
        <Icon icon="menu" />
      </Button>
    </Popover>
  );
}
