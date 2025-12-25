# Figma Design-to-Code Directive

## 1. The Source of Truth
- **Tokens:** Design Tokens (Colors, Spacing, Typography) must match `tailwind.config.ts` exactly.
- **Assets:** Export SVGs/Images *before* coding. Do not use placeholders.

## 2. Layout Translation
- **Auto-Layout = Flexbox:** Translate Figma Auto-Layout directly to Flex/Grid classes.
- **Constraints = Responsive:** Figma constraints determine `w-full`, `max-w`, and breakpoints (`md:`, `lg:`).

## 3. Interaction Specs
- **States:** Define Hover, Active, and Focus states explicitly in CSS variables (e.g., `--primary-hover`).
- **Animation:** Use `tailwindcss-animate` for standard transitions.
