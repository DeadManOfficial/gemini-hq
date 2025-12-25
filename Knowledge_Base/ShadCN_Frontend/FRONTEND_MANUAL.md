# ShadCN Frontend Directive: 2025 Edition

## 1. The "Pure Component" Rule
UI Components must be dumb.
- **Anti-Pattern:** A Card component fetching its own data.
- **Pattern:** `Card` receives data via props. Logic lives in Hooks or Server Components.

## 2. Advanced Performance
- **Tree Shaking:** Import specific icons/components.
- **Lazy Loading:** Use `next/dynamic` for heavy components (Charts, Maps, Rich Text Editors).
- **RSC Payload:** Keep Client Components at the leaves of the tree. Minimize what hydration needs to run.

## 3. Composition over Configuration
Stop creating "God Components" with 50 props.
- **Use Slots:**
  ```tsx
  // Bad
  <Card title="X" footer="Y" body="Z" />

  // Good
  <Card>
    <CardHeader>X</CardHeader>
    <CardContent>Z</CardContent>
    <CardFooter>Y</CardFooter>
  </Card>
  ```

## 4. Accessibility (A11y)
- **Keyboard Navigation:** Every interactive element must be reachable via Tab.
- **ARIA:** Use semantic HTML (`button`, `nav`, `main`) before reaching for `aria-` attributes.
