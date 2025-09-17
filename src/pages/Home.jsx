import React from "react";
import { isLogged, getUserFromToken } from "../utils/auth";
import { Link } from "react-router-dom";
export default function Home() {
  const logged = isLogged();
  const user = getUserFromToken();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-6">
      <div className="md:col-span-2 bg-white card">
        <h2 className="text-xl font-semibold mb-2">Welcome to Todo</h2>
        <p className="small mb-4">
          Secure registration/login with JWT and full CRUD tasks.
        </p>
        {!logged && (
          <div>
            <p className="mb-2">
              Please{" "}
              <Link to="/login" className="text-blue-600">
                login
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-blue-600">
                register
              </Link>{" "}
              to continue.
            </p>
          </div>
        )}
        {logged && (
          <div>
            <p className="mb-2">
              Welcome back{user?.email ? `, ${user.email}` : ""}!
            </p>
            <Link to="/tasks" className="text-blue-400">
              Go to Tasks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
