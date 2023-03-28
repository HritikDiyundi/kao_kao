import toast from "react-hot-toast"

toast.promise(saveSettings(settings), {
  loading: 'Saving...',
  success: <b>Settings saved!</b>,
  error: <b>Could not save.</b>,
});
