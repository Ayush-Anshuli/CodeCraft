import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";


function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [UserIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const res = await fetch(`/api/user/getusers`);
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error( error.message);
      }
    };

    if (currentUser.isAdmin) {
      console.log("Current user is admin:", currentUser);
      fetchUsers();
    } else {
      console.warn("Current user is not an admin or undefined:", currentUser);
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setShowModal(false);
      const res = await fetch(`/api/user/delete/${UserIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== UserIdToDelete));
        showModal(false)
      } else {
        console.error( data.message);
      }
    } catch (error) {
      console.error("Error while deleting user:", error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-2 mb-5">
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800 text-gray-900 dark:text-white">
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? <span className="text-green-500" ><FaCheck/></span> : <span className="text-red-500"><ImCross/></span>}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="text-red-500 cursor-pointer font-medium hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showmore && (
            <button className="w-full text-teal-500 self-center text-sm py-7" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no user yet</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body className="text-center">
          <div className="th-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto text-5xl">
            <RiErrorWarningLine />
          </div>
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
            Are you sure you want to delete this user?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteUser}>
              Yes, I am sure
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              No, Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashUsers;
