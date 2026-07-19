Monospace action-log receipt — the wrench-icon tool cards shown inside agent turns.

```jsx
<ToolLog>
  <span style={{color:'var(--text-strong)',fontWeight:500}}>git ls-remote</span> public repo → success
</ToolLog>

<ToolLog critical>private repo → <strong>403</strong> · public repo → same 403</ToolLog>
```

`critical` adds a red left border + red text. `icon` overrides the wrench.
