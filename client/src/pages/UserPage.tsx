import { Form } from "../components/Form";
import { AuthFormBox } from "../components/AuthFormBox";
import { guestInputs } from "../data/inputData";

export const UserPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col items-center justify-between rounded-4xl p-4 h-full">
        <div className="w-full">
          <h1 className="text-2xl font-medium mb-6">Kontynuuj jako gość</h1>
          <Form
            inputs={guestInputs}
            onSubmit={() => {}}
            buttonLabel="Potwierdź"
            buttonClassName="text-xl px-4 py-2 rounded-4xl bg-yellow-500 text-white hover:bg-yellow-600 mt-4"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-between bg-yellow-500 rounded-4xl p-4 text-white">
        <AuthFormBox />
      </div>
    </div>
  );
};
