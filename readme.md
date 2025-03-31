requirement => 
1. get a short url from a long url (done)
2. get the long url using given short url and redirect the request to there. (done)
3. Now too many read request could be there so having one and only centralized server could be a problem as no reliability if it fails
then whole system will be down. (done)
4. Will have multiple server behind one LB which will delegate requests. (done)
5. Now one issue is database is still one, so too many read request from client will cause the db overloaded and it might get down.
6. For 5th to improve need to have case 1: if read operation is too much , then read replica could have worked, but storing  1TB(refer medium blog calculation)
   data in single server(master and standby) also wont be enought, might need to do the sharding in worst case. ( multiple server of database).
7. No for pg have to handle shard logic on client end( wiill try to implement), for no-sql , it supports natively.
8. To make read faster -
   a. will create b-tree index on (short-url) now redirect request will be done in log(N). (done).
   b. can use cache on top, for frequently used one. and will set the TTL to 1day.

Note : sharding is remaning,
Approach => can use consistenhashing to map shortUrl to one of the database.
