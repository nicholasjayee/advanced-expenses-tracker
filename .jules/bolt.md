## 2024-05-24 - [Date Parsing Bottleneck]
**Learning:** `new Date()` is expensive in loops and prone to timezone inconsistencies when parsing "YYYY-MM-DD" strings.
**Action:** Use `String.localeCompare` for sorting ISO dates and `parseInt(dateStr.split('-')[2], 10)` for extracting days, avoiding object allocation and timezone shifts.

## 2024-05-24 - [Missing Entry Point]
**Learning:** `index.html` was missing the `<script type="module" src="/index.tsx"></script>` tag, causing the app to render a blank page in development and preventing JS generation during build.
**Action:** Always verify `index.html` entry points when diagnosing "blank page" issues or empty build outputs.
