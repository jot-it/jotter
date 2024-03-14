CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `document` (
	`name` text PRIMARY KEY NOT NULL,
	`createdOn` integer,
	`modifiedOn` integer,
	`data` blob,
	`id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notebook_document` (
	`notebookId` text PRIMARY KEY NOT NULL,
	`documentName` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notebook` (
	`id` text PRIMARY KEY NOT NULL,
	`authorId` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`emailVerified` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
