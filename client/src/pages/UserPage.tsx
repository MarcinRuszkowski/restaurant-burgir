import { Link } from "react-router";
import { Form } from "../components/Form";
import { YellowButton } from "../components/YellowButton";

const guestInputs = [
  {
    title: "Wprowadź imie i nazwisko",
    name: "Imie i Nazwisko",
    placeholder: "Jan Kowlaski",
  },
  {
    title: "Wprowadź email",
    name: "Email",
    placeholder: "jan.kowalski@poczta.pl",
    type: "email",
  },
  {
    title: "wprowadź numer telefonu",
    name: "Numer telefonu",
    placeholder: "000 000 000",
    type: "phone",
  },
];

const userInputs = [
  {
    title: "Wprowadź email",
    name: "Email",
    placeholder: "jan.kowalski@poczta.pl",
    type: "email",
  },
  {
    title: "wprowadź hasło",
    name: "Hasło",
    placeholder: "************",
    type: "password",
  },
];

export const UserPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col items-center justify-center rounded-4xl p-4">
        <h1 className="text-2xl font-medium mb-6">Kontynuuj jako gość</h1>
        <Form inputs={guestInputs} />
        <YellowButton
          text="Potwierdź"
          onClick={() => {}}
          className="mt-6"
          type="submit"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-between bg-yellow-500 rounded-4xl p-4 text-white ">
        <div className="w-full">
          <h1 className="text-2xl font-medium mb-6">Zaloguj się</h1>
          <Form inputs={userInputs} />
          <Link to="">Nie masz konta? Zarejestruj się</Link>
        </div>

        <button
          onClick={() => {}}
          className="text-2xl px-3 py-1 rounded-4xl text-yellow-500 bg-white mt-6"
          type="submit"
        >
          Zaloguj się
        </button>
      </div>
    </div>
  );
};
