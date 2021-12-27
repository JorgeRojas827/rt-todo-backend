-- CreateTable
CREATE TABLE "enviroment" (
    "id_enviro" SERIAL NOT NULL,
    "enviro_name" TEXT,
    "fk_member" INTEGER,

    CONSTRAINT "Enviroment_pkey" PRIMARY KEY ("id_enviro")
);

-- CreateTable
CREATE TABLE "member" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT,
    "picture" TEXT,
    "email" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "state" (
    "id_state" SERIAL NOT NULL,
    "name" TEXT,
    "cantity" INTEGER,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id_state")
);

-- CreateTable
CREATE TABLE "task" (
    "id_task" SERIAL NOT NULL,
    "description" TEXT,
    "fk_state" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id_task")
);

-- AddForeignKey
ALTER TABLE "enviroment" ADD CONSTRAINT "fk_enviro" FOREIGN KEY ("fk_member") REFERENCES "member"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_state" FOREIGN KEY ("fk_state") REFERENCES "state"("id_state") ON DELETE NO ACTION ON UPDATE NO ACTION;
