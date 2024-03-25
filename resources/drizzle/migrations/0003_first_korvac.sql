CREATE TABLE `vehicle_table` (
	`id` varchar(50) NOT NULL,
	`user_id` varchar(50),
	`title` varchar(255) NOT NULL,
	`vehicle_reg_number` varchar(255) NOT NULL,
	CONSTRAINT `vehicle_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `vehicle_table` ADD CONSTRAINT `vehicle_table_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE no action ON UPDATE no action;