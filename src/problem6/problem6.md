Problem 6

[Diagram](https://drive.google.com/file/d/16rV_N1U_s7Qwz_s5YKzgcm8ReKjiAbL3/view?usp=sharing)

1. Authenticate User Upon Receiving Their Action:
   - End the process if validation fails.
   - Contitnue To Update Score Service.
2. In the Update Score Service, publish user data and score to the user-score Kafka topic.
3. The user-score Kafka topic has two consumers (services): the DB Consumer and the Redis Consumer.
4. The DB Consumer consumes data and batches requests. When the count reaches an allowed number (based on the number of inputs), assume it’s 100 requests. At 100 requests, flush them into the database.
5. Redis Consumer saves user data as key-value pairs and stores users with scores in a sorted set.
6. Redis Consumer also publishes a change timestamp event to the score-board Kafka topic.
7. The score-board Kafka topic consumer checks the last update timestamp. If the interval between updates is less than the allowed time, we will bypass this change to avoid overwhelming client UI with a high volume of updates.
8. If the interval has passed, save the new leaderboard to the Redis key-value store for the WebSocket Service and publish to the leaderboard Kafka topic.
9. Finally, the WebSocket Service consumes from the leaderboard Kafka topic, compares it with the previous cached version in Redis, and if there’s a difference, updates the users' clients via WebSocket.

---

Comments:

- Redis can be replaced with Elasticsearch.
- Step 3-4, we can use transaction to ensure data consistency, only continue if updating DB success.
