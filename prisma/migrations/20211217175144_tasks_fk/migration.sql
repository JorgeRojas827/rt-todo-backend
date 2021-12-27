-- AlterTable
ALTER TABLE "task" ADD COLUMN     "fk_enviroment" INTEGER;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_enviroment" FOREIGN KEY ("fk_enviroment") REFERENCES "enviroment"("id_enviro") ON DELETE NO ACTION ON UPDATE NO ACTION;
