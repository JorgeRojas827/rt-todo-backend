-- AlterTable
ALTER TABLE "state" ADD COLUMN     "fk_enviroment" INTEGER;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "fk_enviroment" FOREIGN KEY ("fk_enviroment") REFERENCES "enviroment"("id_enviro") ON DELETE NO ACTION ON UPDATE NO ACTION;
