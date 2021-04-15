import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Tools = ({ report }) => {
  const [DeleteAction, setDeleteAction] = useState(false);

  const DeletePost = async () => {
    try {
      setDeleteAction(true);
      let userreportID = report.id;
      const body = { userreportID };
      const res = await fetch("/userreports/delete", {
        method: "DELETE",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();
      if (parseData === "Report deleted!") {
        toast.success(parseData, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => window.location.reload(true),
        });
        setDeleteAction(false);
      } else {
        toast.error("Couldn't deleting report");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div class="card-footer text-muted">
      <span>
        <i class="fa fa-comment" title="Coming soon...">
          {" "}
        </i>{" "}
        &nbsp;&nbsp;{" "}
        <i class="fa fa-pencil" title="Coming soon...">
          {" "}
        </i>{" "}
        &nbsp;&nbsp;{" "}
        <i
          class="fa fa-trash-o"
          title="Delete Report"
          onClick={() => {
            if (window.confirm("Delete this post?")) {
              DeletePost(report.id);
            }
          }}
        ></i>
      </span>
    </div>
  );
};

export default Tools;
