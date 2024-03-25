CREATE TABLE `parking_slot_table` (
	`id` varchar(50) NOT NULL,
	`slot_title` varchar(255) NOT NULL,
	`isMaintain` boolean NOT NULL DEFAULT false,
	CONSTRAINT `parking_slot_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `vehicle_table` DROP FOREIGN KEY `vehicle_table_user_id_user_table_id_fk`;
--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD CONSTRAINT `vehicle_table_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE cascade ON UPDATE no action;