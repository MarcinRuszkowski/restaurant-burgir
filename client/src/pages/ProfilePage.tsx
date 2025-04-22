import { AuthFormBox } from "../components/AuthFormBox";
import { useLogout, useUpdateProfile, useUserProfile } from "../hooks/useUser";
import { useUserState } from "../store/userStore";

export const ProfilePage = () => {
  const { data, isLoading, isError } = useUserProfile();
  const logoutStore = useUserState((state) => state.logoutUser);
  const userStore = useUserState((state) => state.isAuth);
  const logout = useLogout();
  const updateProfile = useUpdateProfile();
  console.log(updateProfile);

  const handleLogoutUser = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        logoutStore();
        console.log("LoggedOut");
        // navigate("/auth");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const handleEditUser = () => {};

  if (!userStore) {
    return (
      <div className="flex justify-center items-center h-full">
        <AuthFormBox buttonClassName="text-xl px-4 py-2 rounded-4xl text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 mt-4" />
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile</div>;

  const userData = [
    { label: "Imię i nazwisko", data: data.name },
    { label: "Adres email", data: data.email },
    { label: "Numer Telefonu", data: data.phone },
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
          onClick={handleEditUser}
          className={`text-xl px-4 py-2 rounded-4xl text-white bg-green-600 hover:bg-green-700 active:bg-green-800`}
        >
          Edytuj
        </button>
      </div>

      <div className="flex flex-col gap-5 ml-5">
        <h1 className="text-3xl ml-2 mb-3 font-medium text-black">
          Twoje dane:
        </h1>
        {userData.map((data) => (
          <div key={data.label}>
            <h3 className="text-xl">{data.label}</h3>
            <p className="">{data.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
