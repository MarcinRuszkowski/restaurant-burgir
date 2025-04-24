import { Alert } from "../components/Alert";
import { useAlertStore } from "../store/alertStore";
import { AnimatePresence } from "framer-motion";

export const AlertDisplay = () => {
  const { alert } = useAlertStore();

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <AnimatePresence>
        {alert && <Alert status={alert.status} message={alert.message} />}
      </AnimatePresence>
    </div>
  );
};