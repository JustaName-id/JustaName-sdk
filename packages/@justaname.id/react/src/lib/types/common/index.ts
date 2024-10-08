import { SanitizedRecords, SubnameRecordsRoute } from '@justaname.id/sdk';

export type SubnameRecordResponse = SubnameRecordsRoute['response'];

export interface Records extends SubnameRecordResponse {
  sanitizedRecords: SanitizedRecords;
}
