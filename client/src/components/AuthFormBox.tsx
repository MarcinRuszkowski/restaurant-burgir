import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form } from "./Form";
import { useLogin, useRegister } from "../hooks/useUser";
import { loginInputs, registerInputs } from "../data/inputData";
import { useUserState } from "../store/userStore";
import { useAlertStore } from "../store/alertStore";

interface AuthFormBoxProps {
  buttonClassName?: string;
}

export const AuthFormBox: React.FC<AuthFormBoxProps> = ({
  buttonClassName,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const login = useLogin();
  const register = useRegister();

  const setUser = useUserState((state) => state.setUser);
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleLogin = (form: { [key: string]: string }) => {
    const loginData = {
      email: form["Email"],
      password: form["Hasło"],
    };
    login.mutate(loginData, {
      onSuccess: (res) => {
        setUser(res);
        showAlert("pass", "Zalogowano pomyślnie");
        console.log("Zalogowano!", res);
      },
      onError: (err) => {
        showAlert("fail", "Logowanie nie powiodło się");
        console.error(err);
      },
    });
  };

  const handleRegister = (form: { [key: string]: string }) => {
    const registerData = {
      name: form["Imie i Nazwisko"],
      email: form["Email"],
      password: form["Hasło"],
      phone: form["Numer telefonu"],
    };
    register.mutate(registerData, {
      onSuccess: (res) => {
        setUser(res);
        showAlert("pass", "Rejestracja powiodła się");

        console.log(res);
      },
      onError: (err) => {
        showAlert("fail", "Błąd podczas rejestracji");
        console.error(err);
      },
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-medium mb-6">
        {isLogin ? "Zaloguj się" : "Zarejestruj się"}
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
          transition={{ duration: 0.3 }}
        >
          <Form
            inputs={isLogin ? loginInputs : registerInputs}
            onSubmit={isLogin ? handleLogin : handleRegister}
            toggleLink={
              isLogin
                ? "Nie masz konta? Zarejestruj się"
                : "Masz konto? Zaloguj się"
            }
            toggle={() => setIsLogin(!isLogin)}
            buttonLabel={isLogin ? "Zaloguj się" : "Zarejestruj się"}
            buttonClassName={
              buttonClassName ||
              "text-xl px-4 py-2 rounded-4xl bg-white text-yellow-500 hover:bg-gray-200 active:bg-gray-300 mt-4"
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
