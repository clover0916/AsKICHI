"use client";

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { EditIcon } from "@/app/(dashboard)/dashboard/components/EditIcon";
import { DeleteIcon } from "@/app/(dashboard)/dashboard/components/DeleteIcon";

interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  image: string | null;
  password: string | null;
}

const DashboardPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/all");
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const changeUserRole = async (user: IUser) => {
    try {
      const res = await fetch("/api/users/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          role: user.role,
        }),
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (user: IUser) => {
    if (confirm("本当にこのユーザーを削除しますか？")) {
      try {
        const res = await fetch("/api/users/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        const data = await res.json();
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
    { uid: "name", name: "名前" },
    { uid: "id", name: "ID" },
    { uid: "role", name: "ロール" },
    { uid: "actions", name: "アクション" },
  ];

  const statusColorMap: {
    [key: string]: "danger" | "warning" | "success" | "default" | "primary" | "secondary" | undefined;
  } = useMemo(
    () => ({
      admin: "danger",
      teacher: "warning",
      student: "success",
    }),
    []
  );

  const roles = [
    { value: "admin", label: "管理者" },
    { value: "teacher", label: "教師" },
    { value: "student", label: "生徒" },
  ];

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    onOpen();
  };

  const renderCell = (user: IUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User description={user.email} name={cellValue}>
            {user.email}
          </User>
        );
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "role":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.role || ""] || "default"}
            size="sm"
            variant="flat"
          >
            {roles.find((role) => role.value === user.role)?.label || "未設定"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEditUser(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteUser(user)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const EditUserModal = () => {
    const [editedUser, setEditedUser] = useState<IUser>(editingUser ?? ({} as IUser));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await changeUserRole(editedUser);
      onClose();
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h4 id="modal-title">ユーザー情報を編集</h4>
            </ModalHeader>
            <ModalBody>
              <Input
                name="name"
                label="名前"
                variant="underlined"
                value={editedUser.name || ""}
                onChange={handleInputChange}
              />
              <Input
                name="email"
                label="メールアドレス"
                variant="underlined"
                value={editedUser.email || ""}
                onChange={handleInputChange}
              />
              <Input
                name="password"
                label="パスワード"
                variant="underlined"
                type="password"
                value={editedUser.password || ""}
                onChange={handleInputChange}
              />
              <Select
                variant="underlined"
                name="role"
                label="ロール"
                defaultSelectedKeys={[editedUser.role || ""]}
                onChange={(e) => {
                  setEditedUser({ ...editedUser, role: e.target.value });
                }}
              >
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                更新
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold pb-3">ユーザー管理</h1>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditUserModal />
    </>
  );
};

export default DashboardPage;