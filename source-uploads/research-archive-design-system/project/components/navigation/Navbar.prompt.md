Sticky glass top bar with a dark monogram tile, wordmark, and right-aligned actions.

```jsx
<Navbar monogram="AE" title="Research Archive">
  <Badge variant="status" dot>Verified</Badge>
  <Dropdown items={[{ label: 'Export PDF', icon: 'solar:printer-linear' }]} />
</Navbar>
```

This system ships no logo — the monogram tile stands in for a mark. Right-side `children` hold badges/menus.
