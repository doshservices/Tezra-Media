import * as migration_20261013_003129_initial from './20261013_003129_initial';
import * as migration_20261013_120347_news_byline from './20261013_120347_news_byline';
import * as migration_20261024_153721_s3_object_key from './20261024_153721_s3_object_key';

export const migrations = [
  {
    up: migration_20261013_003129_initial.up,
    down: migration_20261013_003129_initial.down,
    name: '20261013_003129_initial',
  },
  {
    up: migration_20261013_120347_news_byline.up,
    down: migration_20261013_120347_news_byline.down,
    name: '20261013_120347_news_byline',
  },
  {
    up: migration_20261024_153721_s3_object_key.up,
    down: migration_20261024_153721_s3_object_key.down,
    name: '20261024_153721_s3_object_key'
  },
];
