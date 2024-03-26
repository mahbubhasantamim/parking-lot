ALTER TABLE `vehicle_table` ADD `on_parking` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD `parking_lot` varchar(50);--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD `parking_slot` varchar(50);--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD CONSTRAINT `vehicle_table_parking_lot_parking_lot_table_id_fk` FOREIGN KEY (`parking_lot`) REFERENCES `parking_lot_table`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD CONSTRAINT `vehicle_table_parking_slot_parking_slot_table_id_fk` FOREIGN KEY (`parking_slot`) REFERENCES `parking_slot_table`(`id`) ON DELETE set null ON UPDATE no action;