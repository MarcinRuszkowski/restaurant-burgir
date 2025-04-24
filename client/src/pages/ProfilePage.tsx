import { useEffect, useState } from "react";
import { AuthFormBox } from "../components/AuthFormBox";
import { useLogout, useUpdateProfile, useUserProfile } from "../hooks/useUser";
import { useUserState } from "../store/userStore";
import { FormField } from "../types/types";
import { useOrderHistory } from "../hooks/useOrder";
import { OrderHistoryList } from "../components/OrderHistoryList";
import { Alert } from "../components/Alert";
import { useAlertStore } from "../store/alertStore";

export const ProfilePage = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useUserProfile();
  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useOrderHistory();

  const logout = useLogout();
  const updateProfile = useUpdateProfile();
  const logoutStore = useUserState((state) => state.logoutUser);
  const userStore = useUserState((state) => state.isAuth);
  const showAlert = useAlertStore((state) => state.showAlert);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form, setForm] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      });
    }
  }, [userData]);

  const handleLogoutUser = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        logoutStore();
        showAlert("pass", "Wylogowano pomyślnie");
      },
      onError: (err) => {
        showAlert("fail", "Wylogowanie nie powiodło się");
        console.error(err);
      },
    });
  };
  const handleEditUser = () => {
    updateProfile.mutate(form, {
      onSuccess: () => {
        showAlert("pass", "Dane zostały zaktualizowane");
        setIsEditing(false);
      },
      onError: (err) => {
        showAlert("fail", "Edycja danych nie powiodła się");
        console.error(err);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!userStore) {
    return (
      <div className="flex justify-center items-center h-full">
        <AuthFormBox buttonClassName="text-xl px-4 py-2 rounded-4xl text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 mt-4" />
      </div>
    );
  }

  if (userLoading || orderLoading) return <div>Loading...</div>;
  if (userError || orderError) return <div>Error loading profile</div>;

  const userInfo: { label: string; value: FormField; data: string }[] = [
    { label: "Imię i nazwisko:", value: "name", data: userData.name },
    { label: "Adres email:", value: "email", data: userData.email },
    { label: "Numer Telefonu:", value: "phone", data: userData.phone },
    { label: "Hasło:", value: "password", data: userData.password },
  ];

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex flex-col gap-4">
        <button
          onClick={handleLogoutUser}
          className=" text-xl px-4 py-2 rounded-4xl text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 "
        >
          Wyloguj
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className={`${
            isEditing && "hidden"
          } text-xl px-4 py-2 rounded-4xl text-white bg-green-600 hover:bg-green-700 active:bg-green-800`}
        >
          Edytuj
        </button>
        <button
          onClick={handleEditUser}
          className={`${
            !isEditing && "hidden"
          } text-xl px-4 py-2 rounded-4xl text-white bg-green-600 hover:bg-green-700 active:bg-green-800`}
        >
          Zapisz
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className={`${
            !isEditing && "hidden"
          } text-xl px-4 py-2 rounded-4xl text-white bg-gray-300 hover:bg-gray-400 active:bg-gray-500`}
        >
          Anuluj
        </button>
      </div>

      <div className="flex flex-col gap-5 ml-5">
        <h1 className="text-2xl ml-2 font-medium text-black">Twoje dane:</h1>
        {userInfo
          .filter((item) => isEditing || item.value !== "password")
          .map((item) => (
            <div key={item.value}>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <label htmlFor={item.value} className="text-xl">
                    {item.label}
                  </label>
                  <input
                    className="outline-2 px-2 py-0.5 rounded-4xl w-1/2 "
                    title={item.label}
                    name={item.value}
                    value={form[item.value]}
                    onChange={handleChange}
                    type={item.value === "password" ? "password" : "text"}
                    placeholder={
                      item.value === "password" ? "Wprowadź nowe hasło" : ""
                    }
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-xl">{item.label}</h3>
                  <p className="">{item.data}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <hr className="my-8 border-[1px]" />
      <div className="">
        <h1 className="text-2xl ml-2 font-medium text-black">
          Twoja historia zamówień:
        </h1>
        <OrderHistoryList orderData={orderData} />
      </div>
    </div>
  );
};
