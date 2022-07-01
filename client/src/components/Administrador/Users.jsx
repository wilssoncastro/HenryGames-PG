import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";

import './Users.css';

export function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h3>Users List: </h3>
      <table className="tableUsers">
        <tr>
          {users.map((e) => (
            <div>
              <tr>
                <th>Id</th>
                <th>Users</th>
                <th>Name</th>
                <th>Email</th>
                <th>Active</th>
                <th>Banned</th>
                <th>Wish List</th>
              </tr>

              <tr>
                <td>{e.id}</td>
                <td>{e.user}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.active}</td>
                <td>{e.banned}</td>
                <td>{e.wishs}</td>
              </tr>
            </div>
          ))}
        </tr>
      </table>
    </div>
  );
}
