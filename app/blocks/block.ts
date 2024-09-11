import { Blocks } from "@514labs/moose-lib";

// Define the destination table and materialized view
const DESTINATION_TABLE = "LogSeverityCount";
const MATERIALIZED_VIEW = "LogSeverityCount_mv";


// Create the aggregation
export default {
  setup: [
    `CREATE TABLE ${DESTINATION_TABLE}
        (
          severityLevel String,
          count Int64
        )
        ENGINE = SummingMergeTree
        ORDER BY severityLevel;`,
    `CREATE MATERIALIZED VIEW ${MATERIALIZED_VIEW} TO ${DESTINATION_TABLE}
    as SELECT
        severityLevel,
        count() as count
    FROM ParsedLogs_0_0
    GROUP BY severityLevel`,
  ],
  teardown: [
    `DROP TABLE IF EXISTS ${DESTINATION_TABLE}`,
    `DROP VIEW IF EXISTS ${MATERIALIZED_VIEW}`,
  ],
} as Blocks;