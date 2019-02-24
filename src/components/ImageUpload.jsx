import React, {Fragment} from "react";
import {Button, Icon, Pane, TextInput} from "evergreen-ui";

export function ImageUpload(props) {
  let text = "";
  return (
    <Pane padding={16}>
      <Pane>
        <TextInput
          name="text-input-name"
          placeholder="Enter a url to your image"
          width="100%"
          height={34}
          onChange={(event) => text = event.target.value}
        />
        <Button
          appearance="primary"
          height={34}
          marginTop={8}
          onClick={() => props.addImage(text)}
        >
          <Icon icon="plus" marginRight={4} /> Add Image
        </Button>
      </Pane>
    </Pane>
  );
}
