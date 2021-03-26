import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");
  const [DOB, setDOB] = useState("");
  const [sex, setSex] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputStatus, setStatus] = useState("");

  //Get username and profile image
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/profile/", {
          method: "POST",
          headers: { token: localStorage.token },
        });

        const parseData = await res.json();
        setName(parseData.userName);
        setDOB(parseData.DOB);
        setSex(parseData.sex);
        setImage(parseData.profileImage);
      } catch (err) {
        console.error(err.message);
      }
    }

    getProfile();
  }, []);

  //Logout user
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Send uploaded image to Cloudinary
  const fileSelectedHandler = async (e) => {
    const files = e.target.files;
    const fd = new FormData();

    fd.append("file", files[0]);

    //Cloudinary upload preset
    fd.append("upload_preset", "info3604project");

    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtqlgbedo/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    const file = await res.json();

    //Change profile image to file uploaded
    setImage(file.secure_url);
    setLoading(false);
  };

  //Send updated profile name and profile picture to backend server
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {
        profileImage,
        newName,
        DOB,
        sex,
      };

      const res = await fetch("/profile/update", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const uploadStatus = await res.json();
      toast.success(uploadStatus, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  //When newName state is updated then post to backend server to check if name is available
  useEffect(() => {
    const inputSubmitter = async () => {
      try {
        if (newName) {
          const body = { newName };
          const status = await fetch("/profile/userExists", {
            method: "POST",
            headers: {
              token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const parseMessage = await status.json();
          console.log(parseMessage);
          setStatus(parseMessage);
        }
      } catch (err) {
        console.error(err);
      }
    };
    inputSubmitter();
  }, [newName]);

  //Set newName state to the value entered by user
  const inputNameHandler = async (e) => {
    try {
      setNewName(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set date of birth state to the value entered by user
  const inputDOBHandler = async (e) => {
    try {
      setDOB(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set sex state to the value entered by user
  const inputSexHandler = async (e) => {
    try {
      setSex(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="mt-5 text-center">Profile</h1>
      <div className="row justify-content-md-center">
        <div className="col col-lg-10">
          <div className="row align-items-center">
            <div className="col-md2 text-center">
              {loading ? (
                <h5>Loading...</h5>
              ) : (
                <img
                  id="image"
                  src={profileImage}
                  width="171"
                  height="180"
                  alt="loading img"
                />
              )}
            </div>
            <div className="col">
              <h2 className="text-left">Welcome, {name}</h2>
            </div>
          </div>
          <form onSubmit={(e) => fileUploadHandler(e)}>
            <div className="form-group">
              <input
                name="file"
                type="file"
                onChange={(e) => fileSelectedHandler(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                placeholder={name}
                defaultValue={name}
                onChange={(e) => inputNameHandler(e)}
              />
              {
                //Check if username available
                inputStatus === "User already exists" ? (
                  <div style={{ color: "red" }}> {inputStatus} </div>
                ) : inputStatus === "No change" ? (
                  <div></div>
                ) : inputStatus === "Name available!" ? (
                  <div style={{ color: "green" }}> {inputStatus} </div>
                ) : (
                  <div></div>
                )
              }
            </div>
            <div className="form-group">
              <label htmlFor="DOB">DOB</label>
              <input
                type="date"
                className="form-control"
                name="DOB"
                placeholder={DOB}
                defaultValue={DOB}
                onChange={(e) => inputDOBHandler(e)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <select
                className="form-control"
                id="sex"
                placeholder={sex}
                value={sex}
                onChange={(e) => inputSexHandler(e)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col mt-5 text-center">
          <button onClick={(e) => logout(e)} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
