import React, { useState } from "react";
import Base from "./Base";
import { isAuthenticated } from "../auth/helper";
import { updateBook, postIssue } from "./helper/coreapicalls";
import { withRouter } from "react-router-dom";

const Issue = ({ match, history }) => {
  const [values, setvalues] = useState({
    phone: "",
    name: "",
    loading: false,
    error: "",
    isRedirected: "",
  });

  const goback = () => (
    <button
      className="btn text-dark btn-warning mt-3"
      onClick={() => {
        history.push(`/book/${match.params.bookId}`);
      }}
    >
      Back
    </button>
  );
  const { phone, name, loading, error } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    return setvalues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: false, loading: true });
    const formData = new FormData();
    formData.set("status", "Issued");
    updateBook(match.params.bookId, user._id, token, formData).then((data) => {
      console.log(data);
      postIssue(user._id, token, {
        phone: phone,
        name: name,
        book: match.params.bookId,
      }).then((data) => {
        console.log(data);
        setvalues({ ...values, error: false, loading: false });
      });
    });
  };

  const onLoading = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading.....
      </div>
    </div>
  );

  const onError = () => (
    <div className="col-md-6 offset-sm-3 text-left">
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    </div>
  );

  const issueForm = () => {
    return (
      <div className="row mt-3">
        <div className="col-md-6 offset-sm-3 text-left bg-info p-2">
          <form>
            <div className="form-group">
              <label className="text-light">Phone</label>
              <input
                value={phone}
                onChange={handleChange("phone")}
                className="form-control"
                type="number"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                value={name}
                onChange={handleChange("name")}
                className="form-control"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-warning btn-block"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base>
      {goback()}
      {onError()}
      {onLoading()}
      {issueForm()}
    </Base>
  );
};

export default withRouter(Issue);
