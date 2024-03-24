CREATE TABLE `parking_lot_table` (
	`id` varchar(50) NOT NULL,
	`lot_name` varchar(255) NOT NULL,
	`city` varchar(50),
	`state` varchar(50),
	`zip_code` varchar(50),
	`address` varchar(255),
	`time_zone` varchar(50) NOT NULL DEFAULT 'Asia/Dhaka',
	`last_update` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `parking_lot_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_table` ADD `user_type` enum('user','manager') DEFAULT 'user' NOT NULL;