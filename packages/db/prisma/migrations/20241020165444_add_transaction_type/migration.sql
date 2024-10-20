-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposit', 'Withdrawal');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'Withdrawal';
