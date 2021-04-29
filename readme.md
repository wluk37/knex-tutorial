Knex Migrations:

- CREATE a new migration file

  - yarn knex migrate:make [migration_filename] --knexfile db/knexfile.js

- ROLLOUT latest migrations

  - yarn knex migrate:latest --knexfile db/knexfile.js

- ROLLBACK migrations

  - yarn knex migrate:rollback --knexfile db/knexfile.js

- CREATE a seed file

  - yarn knex seed:make [seed_filename] --knexfile db/knexfile.js

- ROLLOUT seeds

  - yarn knex seed:run [optional_seed_filename] --knexfile db/knexfile.js
