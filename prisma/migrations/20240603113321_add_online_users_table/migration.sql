-- CreateTable
CREATE TABLE "onlines" (
    "id" SERIAL NOT NULL,
    "socket_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "onlines_pkey" PRIMARY KEY ("id")
);
