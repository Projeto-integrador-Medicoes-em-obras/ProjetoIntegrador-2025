-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_clienteId_fkey`;

-- DropIndex
DROP INDEX `Endereco_clienteId_fkey` ON `endereco`;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
