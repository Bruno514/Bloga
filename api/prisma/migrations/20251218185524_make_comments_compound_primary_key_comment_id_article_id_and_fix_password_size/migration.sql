/*
  Warnings:

  - You are about to alter the column `content` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1048)`.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2048)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "repliedCommentId" INTEGER,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(1048);

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(240),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(2048);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(60);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_repliedCommentId_fkey" FOREIGN KEY ("repliedCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
