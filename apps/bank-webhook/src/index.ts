import express from "express";
import prisma from "@repo/orm/client"
import cors from "cors"

const server = express()
const PORT = 8008

server.use(cors())
server.use(express.json())

server.post("/bank-webhook", async (req, res) => {
    const paytmentInfo = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }

    try {
        await prisma.$transaction([
            prisma.balance.upsert({
                where: {
                    userId: Number(paytmentInfo.userId),
                },
                update: {
                    amount: {
                        increment: Number(paytmentInfo.amount),
                    },
                },
                create: {
                    userId: Number(paytmentInfo.userId),
                    amount: Number(paytmentInfo.amount),
                    locked: Math.random()
                },
            }),
            prisma.onRampTxn.updateMany({
                where: {
                    token: paytmentInfo.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);


        res.json({
            message: "Captured"
        })

    } catch (e) {
        console.log('erorror: ', e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

server.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
})