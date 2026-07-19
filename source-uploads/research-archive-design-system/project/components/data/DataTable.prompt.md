Bordered ledger table with a sunken header and hairline dividers — the session ledger and deliverables tables.

```jsx
<DataTable
  columns={[
    { key: 'n', header: '#', width: '48px', align: 'center' },
    { key: 'event', header: 'Event', width: '12rem' },
    { key: 'evidence', header: 'Evidence' },
  ]}
  rows={[
    { n: '1', event: 'Strike one', evidence: <>Proposed building a connector…</> },
  ]}
/>
```

`columns[].mono` renders a column in JetBrains Mono. `zebra` (default true) washes alternating rows. Cell values accept React nodes (use `Chip`, `Badge` inside).
