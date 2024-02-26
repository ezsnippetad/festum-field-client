import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Success(msg) {
  toast.success(<h6 className="text-white font-bold">Success: {msg}</h6>, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

export function Secondary(msg) {
  toast.error(<h4 className="text-white font-bold">Oops! {msg}</h4>, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

export function LeftNotifier(msg) {
  toast.warn(<h4 className="text-white font-bold">Warning: {msg}</h4>, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

export function CenterInfo(msg) {
  toast.info(<h4 className="text-white font-bold">Info: {msg}</h4>, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

export const CenterDanger = (msg) => {
  Secondary(<h4 className="text-white font-bold">Error: {msg}</h4>, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
};

export function Centerwarning(msg) {
  toast.warn(<h4 className="text-white font-bold">{msg}</h4>, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

// Side Alerts Notifications

export function SuccessLeft(msg) {
  Success(
    <h4 className="text-white font-bold">
      <h3>Notice!</h3>
      {msg}
    </h4>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    },
  );
}

export function WarningLeft(msg) {
  toast.warn(
    <h4 className="text-white font-bold">
      <h3>Warning!</h3>
      {msg}
    </h4>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    },
  );
}

export function DangerRight(msg) {
  Secondary(<h4 className="text-white font-bold">{msg}</h4>, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    autoClose: 2000,
    theme: "colored",
  });
}

// Gradient Side Alerts Notifications

export function GradientSuccess(msg) {
  Success(
    <h4 className="text-white font-bold">
      <h3>Error!</h3>please check Your details ...file is missing
    </h4>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    },
  );
}

export function GradientWarning() {
  toast.warn(
    <h4 className="text-white font-bold">
      <h3>Error!</h3>please check Your details ...file is missing
    </h4>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    },
  );

  //   return (
  //     <div>
  //       <Button
  //         className="me-2"
  //         variant="warning-gradient"
  //         onClick={Toastslidewarn}
  //       >
  //         Warning
  //       </Button>
  //     </div>
  //   );
}

export function GradientDanger() {
  Secondary(
    <h4 className="text-white font-bold">
      <h3>Error!</h3>please check Your details ...file is missing
    </h4>,

    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 2000,
      theme: "colored",
    },
  );
  //   return (
  //     <div>
  //       <Button
  //         className="me-2"
  //         variant="danger-gradient"
  //         onClick={Toastslidewarn}
  //       >
  //         Danger
  //       </Button>
  //     </div>
  //   );
}

export function ChatNotification(title, body) {
  toast(
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-xs">{body}</p>
    </div>,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    },
  );
}

export function Warn(msg) {
  toast.warn(msg, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
