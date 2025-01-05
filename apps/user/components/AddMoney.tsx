"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import createOnRampTxn from "@/app/lib/actions/createOnRampTx";
import { SUPPORTED_BANKS } from "@/assets/supportedBanks";
import axios from "axios";
import toast from "react-hot-toast";

export const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);

  async function onAddMoneyHandler() {
    const toastId = toast.loading("Processing...");
    const onRampTxn = await createOnRampTxn(Number(amount) * 100, provider);
    await axios.post("http://localhost:8008/bank-webhook", {
      token: onRampTxn.onRampTxn?.token,
      userId: onRampTxn.onRampTxn?.userId,
      amount: onRampTxn.onRampTxn?.amount,
    });

    const newWindow = window.open(
      redirectUrl,
      "_blank",
      "width=600,height=400"
    );

    setTimeout(() => {
      if (newWindow) {
        newWindow.close();
        window.location.href = "/transfer";
        toast.dismiss(toastId);
        toast.success("Money added to your wallet", {
          duration: 4000,
        });
      }
    }, 5000);
  }

  return (
    <div>
      <Card title="Add Money">
        <div className="w-full">
          <TextInput
            placeholder={"Amount"}
            onChange={(value) => {
              setAmount(value);
            }}
          />
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
              );
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
          <div className="flex justify-center pt-4">
            <Button screen="lg" onClick={onAddMoneyHandler}>Add Money</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
