import { useEffect, useState } from "react";
import { AuthFormBox } from "../components/AuthFormBox";
import { useLogout, useUpdateProfile, useUserProfile } from "../hooks/useUser";
import { useUserState } from "../store/userStore";
import { FormField } from "../types/types";

export const ProfilePage = () => {
  const { data, isLoading, isError } = useUserProfile();
  const logout = useLogout();
  const updateProfile = useUpdateProfile();
  const logoutStore = useUserState((state) => state.logoutUser);
  const userStore = useUserState((state) => state.isAuth);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Record<FormField, string>>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
    }
  }, [data]);

  const handleLogoutUser = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        logoutStore();
        console.log("LoggedOut");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };
  const handleEditUser = () => {
    updateProfile.mutate(form, {
      onSuccess: () => {
        setIsEditing(false);
      },
      onError: (err) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile</div>;

  const userData: { label: string; value: FormField; data: string }[] = [
    { label: "Imię i nazwisko:", value: "name", data: data.name },
    { label: "Adres email:", value: "email", data: data.email },
    { label: "Numer Telefonu:", value: "phone", data: data.phone },
    { label: "Hasło:", value: "password", data: data.password },
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
        <h1 className="text-3xl ml-2 mb-3 font-medium text-black">
          Twoje dane:
        </h1>
        {userData
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
    </div>
  );
};
