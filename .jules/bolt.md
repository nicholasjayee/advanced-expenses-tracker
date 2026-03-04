
# Bolt's Journal

## Philosophy
- Speed is a feature
- Every millisecond counts
- Measure first, optimize second
- Don't sacrifice readability for micro-optimizations

## Entries

## 2024-05-24 - [Date Parsing Bottleneck]
**Learning:** `new Date()` is expensive in loops and prone to timezone inconsistencies when parsing "YYYY-MM-DD" strings.
**Action:** Use `String.localeCompare` for sorting ISO dates and `parseInt(dateStr.split('-')[2], 10)` for extracting days, avoiding object allocation and timezone shifts.

## 2024-05-24 - [Missing Entry Point]
**Learning:** `index.html` was missing the `<script type="module" src="/index.tsx"></script>` tag, causing the app to render a blank page in development and preventing JS generation during build.
**Action:** Always verify `index.html` entry points when diagnosing "blank page" issues or empty build outputs.

## 2024-05-14 - List component N+1 optimizations
**Learning:** List components repeatedly doing `find` over a shared list causes N+1 problems.
**Action:** Use `useMemo` to construct lookup maps (N * 1) vs doing `.find` on each render loop (N * M).

## 2026-03-02 - Single-pass array reduction
**Learning:** Chaining array methods like `.reduce()` and `.sort()` inside `useMemo` requires multiple passes over the same array, which can be a performance hit (O(N) + O(N) + O(N log N)).
**Action:** Optimize calculations over a collection by iterating through the list once with a simple `for...of` loop to aggregate totals and locate max/min items in O(N) time.

## 2026-03-02 - Single-pass array reduction
**Learning:** Chaining array methods like `.reduce()` inside `useMemo` requires multiple passes over the same array, which can be a performance hit (O(2N)).
**Action:** Optimize calculations over a collection by iterating through the list once with a simple `for...of` loop to aggregate multiple totals in a single O(N) pass.
