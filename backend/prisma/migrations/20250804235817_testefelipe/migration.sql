-- AlterTable
ALTER TABLE `medicao` ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `imagem` VARCHAR(191) NULL,
    MODIFY `dataAgendada` DATETIME(3) NULL;
