CREATE TABLE `vehicle_parking_table` (
	`id` varchar(50) NOT NULL,
	`user_id` varchar(50) NOT NULL,
	`vehicle_id` varchar(50) NOT NULL,
	`parking_lot` varchar(50) NOT NULL,
	`parking_slot` varchar(50) NOT NULL,
	`parking_time` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`un_parking_time` datetime,
	`parking_cost` int,
	CONSTRAINT `vehicle_parking_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `vehicle_parking_table` ADD CONSTRAINT `vehicle_parking_table_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle_parking_table` ADD CONSTRAINT `vehicle_parking_table_vehicle_id_vehicle_table_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle_parking_table` ADD CONSTRAINT `vehicle_parking_table_parking_lot_parking_lot_table_id_fk` FOREIGN KEY (`parking_lot`) REFERENCES `parking_lot_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle_parking_table` ADD CONSTRAINT `vehicle_parking_table_parking_slot_parking_slot_table_id_fk` FOREIGN KEY (`parking_slot`) REFERENCES `parking_slot_table`(`id`) ON DELETE no action ON UPDATE no action;