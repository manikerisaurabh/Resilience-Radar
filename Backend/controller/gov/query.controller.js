import Query from "../../models/query.js";

export const takeChargeOnTask = async (req, res) => {
    let { queryId, empId } = req.body;
    let query = await Query.findById(queryId);
    if (!query) {
        return res.status(400).json({ erroe: "query is no more longer valid" });
    }


}