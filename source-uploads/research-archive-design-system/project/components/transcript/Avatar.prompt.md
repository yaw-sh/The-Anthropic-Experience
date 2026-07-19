Speaker glyph that leads each transcript turn: a round light circle for humans, a dark square tile for the agent.

```jsx
<Avatar variant="user" />
<Avatar variant="agent" />
<Avatar variant="agent" icon="solar:cpu-linear" size={40} />
```

Variants: `user` (round, ringed, light) · `agent` (square, dark). Props: `icon` (any Iconify name), `size` (px, default 32). Requires the `iconify-icon` web component to be loaded on the page.
