-- AddForeignKey
ALTER TABLE `Notebooks` ADD CONSTRAINT `Notebooks_id_fkey` FOREIGN KEY (`id`) REFERENCES `Documents`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
