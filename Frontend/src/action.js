export const SET_EMPLOYMENT_STATUS = "SET_EMPLOYMENT_STATUS";

export const setEmploymentStatus = (isEmp) => ({
    type: SET_EMPLOYMENT_STATUS,
    payload: isEmp,
});
