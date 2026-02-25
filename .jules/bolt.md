# Bolt's Journal

## Philosophy
- Speed is a feature
- Every millisecond counts
- Measure first, optimize second
- Don't sacrifice readability for micro-optimizations

## Entries

## 2024-05-24 - Efficient Date Handling
**Learning:** Frequent creation of `Date` objects in sort comparators and map loops is a significant performance bottleneck in React render cycles, especially for list processing.
**Action:** Use string comparison for ISO dates (YYYY-MM-DD) and direct property access for Date objects instead of re-instantiating them.
