CREATE TABLE `notebook_document` (
	`notebookId` char(21) NOT NULL,
	`documentName` char(21) NOT NULL,
	CONSTRAINT `notebook_document_notebookId` PRIMARY KEY(`notebookId`)
);
--> statement-breakpoint
ALTER TABLE `document` ADD `id` char(21) NOT NULL;--> statement-breakpoint
ALTER TABLE `notebook` DROP COLUMN `documentName`;