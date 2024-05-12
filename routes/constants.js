const environment_prompt = `
I want to recreate the flappy bird game with completely new graphics. This game has 3 main components: the bird, the pipes, and the background.

The bird component should be small and simple. It should be a small bird facing right.
The pipes should be simple and straight. They should be vertical and have a simple design.
The background should be detailed and specific. It should be a detailed outdoor environment with trees, grass, and a sky. The background should be detailed and specific.


Below is the description of the new environment I want to create:
"
[description]
"

Based on the description above, I want you to create descriptions for the image of the bird, the pipes, and the background.

RESPONSE FORMAT:
-description of the bird component
-description of the pipes component
-description of the background component

THE subject of bird componet MUST face right.
DO not add background information or context to the descriptions for the bird and pipes.
DO not include anything but the descriptions of the bird, pipes, and background components in your response.
DO not address the  componenets name in your response. Just the description.
ALWAYS make the descriptions as precise as possible.
ALWAYS make the background description as detailed as possible. Background should not be colorful or plain. It should be detailed and specific.
`;

module.exports = {
  environment_prompt,
};
