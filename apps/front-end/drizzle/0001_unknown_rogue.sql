CREATE TABLE `document` (
	`name` char(21) NOT NULL,
	`createdOn` timestamp DEFAULT (now()),
	`modifiedOn` timestamp DEFAULT (now()),
	`data` blob,
	CONSTRAINT `document_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `notebook` (
	`id` int AUTO_INCREMENT NOT NULL,
	`documentName` char(21) NOT NULL,
	`authorId` varchar(255) NOT NULL,
	CONSTRAINT `notebook_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `notebook` ADD CONSTRAINT `notebook_documentName_document_name_fk` FOREIGN KEY (`documentName`) REFERENCES `document`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notebook` ADD CONSTRAINT `notebook_authorId_user_id_fk` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;