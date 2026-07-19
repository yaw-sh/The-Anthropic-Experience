One message in a transcript/archive thread — the core building block of the Research Archive surface.

```jsx
<TranscriptTurn variant="user" turn={5}>
  I'm talking about my personal private repo.
</TranscriptTurn>

<TranscriptTurn variant="agent" model="fable-5" turn={8} timestamp="1530">
  <ToolLog>env | grep → GH_TOKEN <strong>SET</strong></ToolLog>
  Correct — I can't. Zero access right now.
</TranscriptTurn>
```

Human turns render inside a left-ruled quote block; agent turns render prose with an optional blue `model` chip and a trailing `timestamp`. Put `ToolLog` cards as children *before* the prose text on agent turns.
