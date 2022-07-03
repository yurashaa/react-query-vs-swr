# React Query vs SWR

---

### The most common problems with data fetching in React includes:

- *Data is shared across all app instance and can be changed by other people.*
- *Data could be “stale” and needs to be refreshed.*
- *Handle caching and invalidating data to optimize the request operation.*

## React Query

*Fetch, cache and update data in your React and React Native applications all without touching any “global state”.*

### Advantages

- React-Query **automates the request process**, including the requests’ state cycle.

- It provides valuable tools **to improve reliability of server data** (invalidating data and marking data as stale).

- It provides **Tools to improve fetch UX** (prefetching, re-fetching, caching, and more).

### Disadvantages

- **This lego piece is big, and can only fit in a specific way to a specific structure**. React-Query package was built
to be consumed by a specific kind of architecture.

- **Do not provide fine-grained control over the sequence of the network requests**. Just not the ideal tool for that
fine-grained control needed. Something like RxJS is more like it.

---

## React vs SWR 

### Similarities

- **Fetching and caching data**. `useSWR` and React Query use the `stale-while-revalidate`.

- **Suspense mode**. Both libraries support React Suspense.

- **Fast and reactive app state**. `useSWR()` comes out on top here, with 0.23ms to 0.55ms, React Query 0.14ms to 1.33ms.

- **Auto caching**. `useSWR` and React Query automatically cache data when it is received from the network.

- **Polling**. `useSWR` and React Query both support polling, which involves constantly requesting data in intervals.
Both libraries can poll data based on the intervals passed to them, or, when no interval is passed, they use a default interval time.

### Differences

- **Global fetcher**. Unlike React Query, where you have to call the fetcher as the second argument, `useSWR` enables us
to define a global fetcher function in the configuration provider.

- **Garbage collection**. React Query automatically handles garbage collection of stale and unused query data.

- **Request cancellation**. In React Query, queries can be aborted or cancelled when the query becomes unresponsive,
stale, or out-of-date. All queries in React Query are cancelled, and they can be automatic or manually triggered. This
feature is not found `useSWR`.

- **Background fetching indicator**. Both `useSWR` and React Query include an indicator that tells users that data is
loading. But, React Query also goes a step further with a background loading indicator that tells the user that refetching
is being done in the background.

- **Methods**. SWR is more intended to get data, not update it, usually you have another function to update and after 
it you will run mutate to update the cache and trigger a revalidation (SWR will fetch it again).

## Comparing features

| Queries                               | 	 React query 	 | SWR |
|---------------------------------------|-----------------|-----|
| Caching                               | 	 ✅             | 	 ✅ |
| Intervals	                            | ✅               | 	 ✅ |
| Dev tools                             | 	 ✅             |
| Paginated Queries                     | 	 ✅ 	           | ✅   |
| Parallel Queries                      | 	 ✅             | 	✅  |
| Selectors                             | 	 ✅             |
| Scroll Recovery                       | 	✅	             | ✅   |
| Cache Manipulation	                   | ✅               | 	✅  |
| Auto Garbage Collection               | 	✅              |
| Prefetching APIs                      | 	✅              | 	✅  |
| Network Status Refetching             | 	✅              | 	✅  |
| General Cache Dehydration/Rehydration | 	✅              |
| React Suspense (Experimental)         | 	✅              | 	✅  |