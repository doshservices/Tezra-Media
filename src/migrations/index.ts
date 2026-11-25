import * as migration_20261013_003129_initial from './20261013_003129_initial';
import * as migration_20261013_120347_news_byline from './20261013_120347_news_byline';
import * as migration_20261024_153721_s3_object_key from './20261024_153721_s3_object_key';
import * as migration_20261120_053154_news_coverage from './20261120_053154_news_coverage';
import * as migration_20261125_210647_productions from './20261125_210647_productions';

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
    name: '20261024_153721_s3_object_key',
  },
  {
    up: migration_20261120_053154_news_coverage.up,
    down: migration_20261120_053154_news_coverage.down,
    name: '20261120_053154_news_coverage',
  },
  {
    up: migration_20261125_210647_productions.up,
    down: migration_20261125_210647_productions.down,
    name: '20261125_210647_productions'
  },
];
