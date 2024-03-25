import React from "react";

const Form2 = () => {
  return (
    <div className="row bg-slate-900 flex items-center justify-center">
      <form className="row col-8 g-3 bg-white rounded-md p-2 my-4">
        <div className="col-md-6">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="inputUsername" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>
        <hr />
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label" >
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputDistrict" className="form-label" >
            District
          </label>
          <input type="text" className="form-control" id="inputDistrict" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label" >
            Country
          </label>
          <input type="text" className="form-control" id="inputCountry" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label" >
            State
          </label>
          <select id="inputState" className="form-select">
            <option defaultValue={"Choose"}>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-12 flex flex-row space-x-4">
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              id="gridCheck2"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12 flex">
          <button type="submit" className="btn btn-primary mx-auto px-4 md:w-1/2">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form2;
