CREATE TABLE `assistantFeedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`edition` varchar(32) NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`rating` enum('helpful','unhelpful') NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assistantFeedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unansweredQuestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`edition` varchar(32) NOT NULL,
	`question` text NOT NULL,
	`reason` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `unansweredQuestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
