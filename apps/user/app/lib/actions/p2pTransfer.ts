"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/orm/client";

export default async function p2pTransfer(phone_no: string, amount: number) {
    try {
        const session = await getServerSession(authOptions)

        const from = await prisma.user.findFirst({
            where: {
                id: Number(session.user.id)
            },
        })

        const to = await prisma.user.findFirst({
            where: {
                phone_no: phone_no
            },
        })

        await prisma.$transaction(async (tx) => {
            if (to && from) {
                await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from.id)} FOR UPDATE`;
                const sender = await tx.balance.update({
                    data: {
                        amount: {
                            decrement: amount * 100
                        },
                    },
                    where: {
                        userId: from?.id,
                    },
                })

                if ((sender.amount / 100) < 0) {
                    throw new Error(`You don't have enough rupees. Your current balance is ₹${sender.amount} and you're trying to send ₹${amount}.`)
                }

                await tx.balance.upsert({
                    where: {
                        userId: to?.id,
                    },
                    update: {
                        amount: {
                            increment: amount * 100,
                        },
                    },
                    create: {
                        userId: to?.id,
                        amount: amount * 100,
                        locked: Math.random()
                    },
                })

                await tx.p2PTransfer.create({
                    data: {
                        timestamp: new Date(),
                        amount,
                        fromUserId: from.id,
                        toUserId: to.id
                    }
                })                

            } else {
                return {
                    msg: "User not found."
                }
            }
        })
        return true
    } catch (error: any) {
        console.log(error.message);
        return {
            msg: error.message
        }

    }

}  