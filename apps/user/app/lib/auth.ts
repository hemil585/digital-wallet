import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@repo/orm/client"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Phone number',
            credentials: {
                phone: { label: "Phone number", type: "number" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {

                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        phone_no: credentials.phone
                    }
                })

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.username,
                            email: existingUser.email
                        }
                    }
                    return null
                }

                try {
                    const user = await prisma.user.create({
                        data: {
                            phone_no: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.username,
                        email: user.email
                    }
                } catch (e) {
                    console.error(e);
                }


                return {
                    id: '69',
                    name: "abc",
                    email: "abc@gmail.com"
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        },
        async redirect({ url, baseUrl }: any) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}`;
        },
    }
}
