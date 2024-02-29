ALTER TABLE `account` DROP FOREIGN KEY `account_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `notebook` DROP FOREIGN KEY `notebook_documentName_document_name_fk`;
--> statement-breakpoint
ALTER TABLE `notebook` DROP FOREIGN KEY `notebook_authorId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_user_id_fk`;
