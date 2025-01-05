"use client";
import p2pTransfer from "@/app/lib/actions/p2pTransfer";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import toast from "react-hot-toast";

export function SendCard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const onSendHandler = async () => {
    const toastId = toast.loading("Processing...");
    const transfer = await p2pTransfer(phoneNumber, Number(amount));
    if (transfer) {
      toast.success("Successfully sent", {
        duration: 4000,
      });
      toast.dismiss(toastId);
      window.location.href = "/p2p";
    } else {
      toast.success("Transaction failed", {
        duration: 4000,
      });
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-56">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setPhoneNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button screen="lg" onClick={onSendHandler}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
