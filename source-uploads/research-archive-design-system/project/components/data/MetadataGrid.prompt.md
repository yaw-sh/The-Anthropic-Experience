Hairline-separated grid of labelled metadata fields — the document header's Date/Surface/Participants block.

```jsx
<MetadataGrid columns={2} items={[
  { label: 'Date', value: '2026-07-18' },
  { label: 'Surface', value: 'Claude Cowork' },
]} />

// or compose cells for rich values:
<MetadataGrid columns={2}>
  <MetadataGrid.Cell label="Models Used"><Badge mono>fable-5</Badge></MetadataGrid.Cell>
</MetadataGrid>
```

Labels render as uppercase wide-tracked micro-caps; the zinc gaps between white cells create the hairline grid.
