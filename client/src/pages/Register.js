import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => (
  <Formik
    //Set initial form values
    initialValues={{
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPass: "",
    }}
    //onSubmit send the data to the backend and if successful/unsuccessful call a toast function
    onSubmit={async (values, { setSubmitting }) => {
      try {
        const res = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });

        const parseRes = await res.json();

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          //User is now authorized if a verified token exists
          setAuth(true);
          toast.success("Registered successfully");
        } else {
          setAuth(false);
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    }}
    //Validate the email, password and confirm password input values
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - 8 characters minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
      confirmPass: Yup.string()
        .required("No password provided.")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <Fragment>
          <div className="content">
            <div className="container-fluid">
              <div className="calendar-main-panel">
                <div className="row justify-content-md-center">
                  <div className="col-md-5 my-auto">
                    <div className="card register-card h-100 bg-dark">
                      <div className="card-header text-center">
                        Register your account
                      </div>
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              placeholder="First Name"
                              value={values.firstName}
                              onChange={handleChange}
                              required
                            ></input>
                          </div>
                          <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              placeholder="Last Name"
                              required
                              value={values.lastName}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              name="userName"
                              placeholder="Username"
                              required
                              onChange={handleChange}
                              value={values.userName}
                            ></input>
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                              type="email"
                              className={
                                (errors.email, touched.email, "form-control")
                              }
                              name="email"
                              aria-describedby="emailHelp"
                              placeholder="Email address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            ></input>
                            {errors.email && touched.email && (
                              <div
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className={
                                (errors.password,
                                touched.password,
                                "form-control")
                              }
                              name="password"
                              placeholder="Password"
                              autoComplete="on"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            ></input>
                            {errors.password && touched.password && (
                              <div
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="confirmPass">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className={
                                (errors.confirmPass,
                                touched.confirmPass,
                                "form-control")
                              }
                              name="confirmPass"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPass}
                            ></input>
                            {errors.confirmPass && touched.confirmPass && (
                              <div
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.confirmPass}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                      <div className="card-footer">
                        <a href="login">Already have an account? Login here!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }}
  </Formik>
);

export default Register;
