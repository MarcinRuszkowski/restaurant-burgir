import { FormInput } from "../types/types";

export const guestInputs: FormInput[] = [
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

export const loginInputs: FormInput[] = [
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

export const registerInputs: FormInput[] = [
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
    title: "wprowadź hasło",
    name: "Hasło",
    placeholder: "************",
    type: "password",
  },
  {
    title: "wprowadź numer telefonu",
    name: "Numer telefonu",
    placeholder: "000 000 000",
    type: "phone",
  },
];
