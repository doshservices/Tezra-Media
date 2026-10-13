import * as migration_20261013_003129_initial from './20261013_003129_initial';
import * as migration_20261013_120347_news_byline from './20261013_120347_news_byline';

export const migrations = [
  {
    up: migration_20261013_003129_initial.up,
    down: migration_20261013_003129_initial.down,
    name: '20261013_003129_initial',
  },
  {
    up: migration_20261013_120347_news_byline.up,
    down: migration_20261013_120347_news_byline.down,
    name: '20261013_120347_news_byline'
  },
];
