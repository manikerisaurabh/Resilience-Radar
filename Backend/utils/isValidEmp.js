import onBoardGovEmp from "../GovEmpDB/onBoardGovEmp.js";
import totalGovArray from "../GovEmpDB/totalGov.js";

export const isValidGov = (govId) => {
    //onsole.log(totalGovArray);
    govId = parseInt(govId)
    console.log(typeof (govId))
    console.log(typeof (totalGovArray[2]))
    if (!totalGovArray.includes(govId)) {
        console.log("inc;lude")
        return false;
    }
    return true;
}


export const isAlreadySignedUp = (govId) => {
    govId = parseInt(govId)
    if (!onBoardGovEmp.includes(govId)) {
        console.log("inc;lude")
        return false;
    }
    return true;
}