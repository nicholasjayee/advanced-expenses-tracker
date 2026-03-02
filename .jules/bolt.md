## 2024-05-14 - List component N+1 optimizations
**Learning:** List components repeatedly doing `find` over a shared list causes N+1 problems.
**Action:** Use `useMemo` to construct lookup maps (N * 1) vs doing `.find` on each render loop (N * M).
