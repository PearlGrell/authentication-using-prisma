CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`dob` text NOT NULL,
	`image` text NOT NULL,
	`is_verified` integer DEFAULT 0 NOT NULL,
	`is_logged_in` integer DEFAULT 0 NOT NULL,
	`otp` text,
	`salt` text,
	`temp_password` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
