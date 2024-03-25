ALTER TABLE `parking_slot_table` RENAME COLUMN `isMaintain` TO `vehicle_id`;--> statement-breakpoint
ALTER TABLE `parking_slot_table` MODIFY COLUMN `vehicle_id` varchar(50);--> statement-breakpoint
ALTER TABLE `parking_slot_table` ADD `is_maintenance` boolean DEFAULT false NOT NULL;