# What is Redis?

- Redis (Remote Dictionary Server) is an open-source, in-memory data structure store.
- It can be used as a database, cache, or message broker.
- It stores data in RAM (not disk), making it extremely fast (microseconds latency).

Redis supports data types like strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, streams etc.

## Why do we need Redis?

- `Speed`: Fetching data from RAM is much faster than from disk.

- `Caching`: Reduce load on database by storing frequently accessed data (e.g., user sessions, product catalog).

- `Session management`: Store user sessions in web apps.

- `Real-time apps`: Chat apps, leaderboards, pub/sub notifications.

- `Rate limiting`: API request limits, login attempt tracking.

- `Message queue`:  Works as a lightweight message broker.

## When should we use Redis?

1. You need low-latency, high-performance reads/writes.

2. You want to cache frequently accessed data (e.g., user profiles, access tokens).

3. You are building real-time applications (gaming leaderboards, chat, live updates).

4. You need distributed session storage across multiple servers.

5. You want queueing/pub-sub system for microservices.

6. You need atomic counters (e.g., view counts, likes).

## 🔹 When NOT to use Redis?

1. Data persistence is critical → Redis stores data in-memory (though it supports persistence, it’s not as durable as RDBMS like PostgreSQL).

2. Very large datasets → If your data doesn’t fit in memory (RAM is costly compared to disk).

3. Complex queries → Redis is not meant for relational queries (no JOIN, no complex aggregations like SQL/MongoDB).

4. ACID transactions required → Redis provides basic atomic operations, but it’s not a full RDBMS.

5. Long-term storage → Not suitable as a primary database for archival/historical data.

## 👉 In short:

- Use Redis as a cache + performance booster, not as your only database.

- Best for speed-sensitive, real-time, temporary, or frequently accessed data.