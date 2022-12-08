import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthPages } from "../auth/routes/AuthPages";
import { CheckingAuthItem } from "../calendar/components";
import { CalendarPage } from "../calendar/pages";

import { useAuthStore } from "../hooks";

export const RouterApp = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <CheckingAuthItem/>;
  }

  return (
    <>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<AuthPages />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};
