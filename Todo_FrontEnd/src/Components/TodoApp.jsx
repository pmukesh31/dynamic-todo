import "./TodoApp.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import LoginComponent from "./Login";
import Welcome from "./Welcome";
import ErrorComponent from "./ErrorComponent";
import TodosComponent from "./TodoListComponent";
import LogOut from "./LogOut";
import FooterComponent from "./FooterComponent";
import { useAuth } from "./security/AuthProvider";
import AuthProvider from "./security/AuthProvider";
import { TodoComponent } from "./TodoComponent";

function Authenticated({ children }) {
  const context = useAuth();
  if (context.isAuthenticated) {
    return children;
  }
  return <Navigate to="/" />;
}
export default function TodoApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/welcome/:username"
            element={
              <Authenticated>
                <Welcome />
              </Authenticated>
            }
          />
          <Route
            path="/todos"
            element={
              <Authenticated>
                <TodosComponent />
              </Authenticated>
            }
          />
          <Route
            path="/:username/todo/:id"
            element={
              <Authenticated>
                <TodoComponent />
              </Authenticated>
            }
          />
          <Route
            path="/logout"
            element={
              <Authenticated>
                <LogOut />
              </Authenticated>
            }
          />

          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}
