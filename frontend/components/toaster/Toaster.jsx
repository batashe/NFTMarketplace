import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @title Toaster / Notifications
 * @author Ritik
 * @about helper functions for toast notifications
 **/

function toastConfig() {
    console.log(process.env);
    const darkMode = JSON.parse(localStorage.getItem('darkMode'))
    return {
        position: process.env.TOASTER_POSITION,
        autoClose: process.env.TOASTER_AUTO_CLOSE || 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: process.env.TOASTER_PAUSE_ON_HOVER || true,
        draggable: true,
        progress: false,
        theme: darkMode ? "dark" : "light",
    }
}

function success(message) {
    dismiss(); // clear the waiting queue
    toast.success(message, toastConfig());
    return;
}

function info(message) {
    dismiss(); // clear the waiting queue
    toast.info(message, toastConfig());
    return;
}

function warning(message) {
    dismiss(); // clear the waiting queue
    toast.warning(message, toastConfig());
    return;
}

function error(message) {
    dismiss(); // clear the waiting queue
    toast.error(message, toastConfig());
    return;
}

function byDefault(message) {
    dismiss(); // clear the waiting queue
    toast(message, toastConfig());
    return;
}

function dismiss() {
    toast.dismiss()
    toast.clearWaitingQueue();
}

export { success, info, warning, error, byDefault, dismiss };