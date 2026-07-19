Quiet trigger + bordered white menu panel. Opens on hover or click.

```jsx
<Dropdown label="Options" items={[
  { label: 'Export PDF', icon: 'solar:printer-linear', href: '#' },
  { label: 'Share Link', icon: 'solar:share-linear', onClick: () => {} },
]} />
```

Items are `{ label, icon, href?, onClick? }`. Menu items get a zinc hover wash and hairline dividers.
