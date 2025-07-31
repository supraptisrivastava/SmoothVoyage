import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccess = msg => toast.success(msg);
export const showError = msg => toast.error(msg);

const ToastProvider = () => <ToastContainer position="top-right" autoClose={3000} />;

export default ToastProvider;
