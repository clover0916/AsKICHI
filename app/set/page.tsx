"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

type Event = {
  id: string;
  host: string;
  title: string;
  place: string;
  floor: string;
  crowded: number;
  createdAt: string;
  updatedAt: string;
};

const crowdedText = [
  "混んでいない",
  "それほど混んでいない",
  "混んでいる",
  "とても混んでいる",
  "満員",
];

const crowdedColor = [
  "bg-green-500/10",
  "bg-sky-500/10",
  "bg-yellow-400/10",
  "bg-orange-600/10",
  "bg-red-600/10",
];

export default function Set() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    onOpen();
    fetch("/api/all")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  });

  const updateCrowded = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.name;
    const crowded = parseInt(event.target.value);

    console.log(event);

    console.log(id, crowded);

    fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, crowded }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          console.log("success");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }
      });
  };

  const Login = (onClose: () => void) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoggedIn(true);
          onClose();
        } else {
          setIsIncorrect(true);
        }
      });
  };

  return (
    <>
      {!loggedIn ? (
        <div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            hideCloseButton
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Login
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      errorMessage={
                        isIncorrect ? "パスワードが間違っています" : ""
                      }
                      validationState={isIncorrect ? "invalid" : "valid"}
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      variant="bordered"
                      onValueChange={setPassword}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={() => Login(onClose)}>
                      Login
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={isSuccess ? "visible" : "hidden"}
            className="popup fixed top-0 right-0 bg-green-500 rounded-md m-8 pl-6 pr-8 py-4 z-50 text-xl font-bold flex items-center"
          >
            <BsCheckCircleFill className="inline-block mr-4" />
            正常に変更されました
          </motion.div>
          <main className="p-16 mx-auto">
            <h1 className="text-4xl font-bold">混雑状況管理</h1>
            <div className="grid gap-8 p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {events.length == 0 && (
                <div>
                  <Spinner />
                </div>
              )}
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <div className="text-xl font-bold">{event.title}</div>
                      <div className="text-md">{event.host}</div>
                      <div className="text-md">{event.place}</div>
                      <div className="text-md">{event.floor}</div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Select
                      name={event.id}
                      label=""
                      aria-label="crowded"
                      labelPlacement="outside"
                      defaultSelectedKeys={[event.crowded.toString()]}
                      onChange={updateCrowded}
                    >
                      {crowdedText.map((text, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {text}
                        </SelectItem>
                      ))}
                    </Select>
                  </CardBody>

                  <CardFooter>
                    最終更新：
                    {new Date(event.updatedAt).toLocaleString("ja-JP", {
                      timeZone: "Asia/Tokyo",
                    })}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </>
      )}
    </>
  );
}
