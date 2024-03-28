"use client";

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import toast, { Toaster } from "react-hot-toast";
import { Selection, SortDescriptor } from "@react-types/shared";
import { SearchIcon } from "@/components/icons";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import { PlusIcon } from "@/components/PlusIcon";
import { VerticalDotsIcon } from "@/components/VerticalDotIcon";
import { AnimatePresence, motion } from "framer-motion";

interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  role: "ADMIN" | "TEACHER" | "STUDENT" | null;
  image: string | null;
  password: string | null;
  createdAt: string;
  updatedAt: string;
}

const headerColumns = [
  { uid: "name", name: "名前", sortable: true },
  { uid: "id", name: "ID", sortable: true },
  { uid: "role", name: "ロール" },
  { uid: "createdAt", name: "作成日", sortable: true },
  { uid: "updatedAt", name: "更新日", sortable: true },
  { uid: "actions", name: "アクション" },
];

const roles: Array<{ key: string, label: string, color: "danger" | "warning" | "success" | "default" | "primary" | "secondary" | undefined }> = [
  { key: "ADMIN", label: "管理者", color: "danger" },
  { key: "TEACHER", label: "教師", color: "warning" },
  { key: "STUDENT", label: "生徒", color: "success" },
];

const statusOptions = [
  { name: "管理者", uid: "ADMIN" },
  { name: "教師", uid: "TEACHER" },
  { name: "生徒", uid: "STUDENT" },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const DashboardPage: React.FC = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [roleFilter, setStatusFilter] = React.useState<Selection>("all");
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createdAt",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isBulkDeleteOpen, onOpen: onBulkDeleteOpen, onClose: onBulkDeleteClose } = useDisclosure();
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name && user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (roleFilter !== "all" && Array.from(roleFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(roleFilter).includes(user.role as string),
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, roleFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = (first !== null && second !== null) ? (first < second ? -1 : first > second ? 1 : 0) : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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

  const changeUserInfo = async (id: string, name: string, email: string, password: string, role: string) => {
    const fetchAPI = new Promise<void>((resolve, reject) => {
      fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          email: email,
          password: password,
          role: role,
        }),
      }).then((response) => {
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      }).catch((error) => {
        reject(error);
      });
    });
    toast.promise(fetchAPI, {
      loading: "更新中...",
      success: "ユーザー情報を更新しました",
      error: "ユーザー情報の更新に失敗しました",
    }).then(() => {
      fetchUsers();
    });
  };

  const deleteUser = async (user: IUser) => {
    setEditingUser(user);
    onDeleteOpen();
  };

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    onEditOpen();
  };

  const EditUserModal = () => {
    const [name, setName] = useState<string>(editingUser?.name || "");
    const [email, setEmail] = useState<string>(editingUser?.email || "");
    const [password, setPassword] = useState<string>(editingUser?.password || "");
    const [role, setRole] = useState<string>(editingUser?.role || "");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingUser) return;
      await changeUserInfo(editingUser.id, name, email, password, role);
      onEditClose();
    };

    const validateEmail = (value: string) => value.match(/^[a-zA-Z0-9._-]+@metro.ed.jp$/);

    const isInvalidEmail = useMemo(() => {
      if (email === '') return false;

      return validateEmail(email) ? false : true;
    }, [email]);

    const isInvalidPassword = useMemo(() => {
      if (password === '') return;

      return password.length < 8;
    }, [password]);

    const canSubmit = useMemo(() => {
      return (
        (name && name !== editingUser?.name) ||
        ((email && email !== editingUser?.email) && !isInvalidEmail) ||
        ((password && password !== editingUser?.password) && !isInvalidPassword) ||
        (role && role !== editingUser?.role)
      );
    }, [isInvalidEmail, isInvalidPassword, name, email, password, role]);

    return (
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
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
                type="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                name="email"
                label="メールアドレス"
                variant="underlined"
                type="email"
                value={email || ""}
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? 'danger' : 'default'}
                errorMessage={isInvalidEmail && '学校配布のメールアドレスを使用してください'}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="password"
                label="パスワード"
                variant="underlined"
                type="password"
                autoComplete="new-password"
                value={password || ""}
                isInvalid={isInvalidPassword}
                color={isInvalidPassword ? 'danger' : 'default'}
                errorMessage={isInvalidPassword && 'パスワードは8文字以上にしてください'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Select
                variant="underlined"
                name="role"
                label="ロール"
                defaultSelectedKeys={[role || ""]}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <SelectItem key={role.key} value={role.key}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onEditClose}>
                閉じる
              </Button>
              <Button color="primary" type="submit" isDisabled={!canSubmit}>
                更新
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  const DeleteUserModal = () => {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const fetchAPI = new Promise<void>((resolve, reject) => {
        fetch("/api/users/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingUser?.id,
          }),
        }).then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        }).catch((error) => {
          reject(error);
        });
      });
      toast.promise(fetchAPI, {
        loading: "削除中...",
        success: "ユーザーを削除しました",
        error: "ユーザーの削除に失敗しました",
      }).then(() => {
        fetchUsers();
      });
      onDeleteClose();
      setSelectedKeys(new Set([]));
    }

    return (
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h4 id="modal-title">ユーザーを削除</h4>
            </ModalHeader>
            <ModalBody>
              <p>本当にこのユーザーを削除しますか？</p>
              <p className="text-bold">{editingUser?.name}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onDeleteClose}>
                閉じる
              </Button>
              <Button color="danger" type="submit">
                削除
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }

  const BulkDeleteUserModal = () => {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const fetchAPI = new Promise<void>((resolve, reject) => {
        fetch("/api/users/bulk-delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: Array.from(selectedKeys),
          }),
        }).then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        }).catch((error) => {
          reject(error);
        });
      });
      toast.promise(fetchAPI, {
        loading: "削除中...",
        success: "ユーザーを削除しました",
        error: "ユーザーの削除に失敗しました",
      }).then(() => {
        fetchUsers();
      });
      onBulkDeleteClose();
      setSelectedKeys(new Set([]));
    }

    return (
      <Modal isOpen={isBulkDeleteOpen} onClose={onBulkDeleteClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h4 id="modal-title">ユーザーを削除</h4>
            </ModalHeader>
            <ModalBody>
              <p>本当に選択したユーザーを削除しますか？</p>
              <p className="text-bold">{Array.from(selectedKeys).join(", ")}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onBulkDeleteClose}>
                閉じる
              </Button>
              <Button color="danger" type="submit">
                削除
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }

  const CreateUserModal = () => {
    const [amount, setAmount] = useState<string>("1");
    const createRandomUser = async () => {
      const fetchAPI = new Promise<void>((resolve, reject) => {
        fetch("/api/users/create-random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(amount),
          }),
        }).then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        }).catch((error) => {
          reject(error);
        });
      });

      toast.promise(fetchAPI
        , {
          loading: "作成中...",
          success: "ユーザーを作成しました",
          error: "ユーザーの作成に失敗しました",
        }).then(() => {
          fetchUsers();
        });

      onCreateClose();
    }

    return (
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalContent>
          <form>
            <ModalHeader>
              <h4 id="modal-title">ユーザーを作成</h4>
            </ModalHeader>
            <ModalBody>
              <p>本当にランダムなユーザーを作成しますか？</p>
              <Input
                name="amount"
                label="作成数"
                variant="underlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCreateClose}>
                閉じる
              </Button>
              <Button color="primary" onPress={createRandomUser}>
                作成
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  }

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
            color={roles.find((role) => role.key === user.role)?.color}
            size="sm"
            variant="flat"
          >
            {roles.find((role) => role.key === user.role)?.label}
          </Chip>
        );
      case "createdAt":
        return new Date(cellValue as string).toLocaleString();
      case "updatedAt":
        return new Date(cellValue as string).toLocaleString();
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="ユーザーアクション"
                onAction={(key) => {
                  if (key === "edit") {
                    handleEditUser(user);
                  } else if (key === "delete") {
                    deleteUser(user);
                  }
                }}
              >
                <DropdownItem
                  key="edit"
                  startContent={<EditIcon />}
                >
                  編集
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<DeleteIcon />}
                >
                  消去
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="ユーザー名で検索..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  ロール
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onClick={onCreateOpen}>
              ユーザーを追加
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">合計 {users.length} ユーザー</span>
          <label className="flex items-center text-default-400 text-small">
            表示数:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, roleFilter, onCreateOpen, users.length, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-default text-foreground dark:bg-default dark:text-foreground',
      }} />
      <h1 className="text-3xl font-bold pb-4">ユーザー管理</h1>
      <Table
        aria-label="ユーザー一覧"
        isHeaderSticky
        color="primary"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"ユーザーが見つかりませんでした"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AnimatePresence>
        {(selectedKeys == "all" || selectedKeys.size > 0) && (
          <motion.div className="fixed flex left-0 bottom-0 w-full justify-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="flex gap-2 px-4 py-2 bg-background shadow-lg rounded-lg items-center">
              <span className="text-small text-default-400">
                {selectedKeys === "all"
                  ? "すべてのユーザーを選択"
                  : `${selectedKeys.size} / ${filteredItems.length} 選択`}
              </span>
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={onBulkDeleteOpen}
              >
                <DeleteIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <EditUserModal />
      <DeleteUserModal />
      <BulkDeleteUserModal />
      <CreateUserModal />
    </>
  );
};

export default DashboardPage;