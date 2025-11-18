import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  name: 'vwEvents',
  schema: 'dbo'
})
export class VwEvent {
  @ViewColumn()
  event_id: number;

  @ViewColumn()
  center_id: number | null;

  @ViewColumn()
  event_date: Date | null;

  @ViewColumn()
  event_start_time: string;

  @ViewColumn()
  event_end_time: string;

  @ViewColumn()
  event_cost: string;

  @ViewColumn()
  event_photo: string;

  @ViewColumn()
  event_title: string;

  @ViewColumn()
  event_location: string;

  @ViewColumn()
  event_requirements: string;

  @ViewColumn()
  event_transportation: string;

  @ViewColumn()
  event_Description: string;

  @ViewColumn()
  all_classes: boolean | null;

  @ViewColumn()
  event_response_dead_line: Date | null;

  @ViewColumn()
  Classes: string;

  @ViewColumn()
  All_classes_name: string;

  @ViewColumn()
  ClassesId: string;
}