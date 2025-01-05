"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/orm/client";
import { v7 as uuidv7 } from 'uuid';


export default async function createOnRampTxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions)
    const userId = Number(session.user.id)

    const token = uuidv7().toString(); // should ideally come from the bank api

    if (!userId || !session) {
        return {
            msg: "Unauthenticated req"
        }
    }

    const onRampTxn = await prisma.onRampTxn.create({
        data: {
            userId,
            status: "Proccessing",
            amount,
            provider,
            startTime: new Date(),
            token
        }
    })

    return {
        onRampTxn,
        msg: "OnRampTxn added"
    }
}