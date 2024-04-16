import Query from "../../models/query.js";
import GovernmentEmployee from "../../models/govermentEmployee.js";
import { getLocationData } from "../../utils/getLocation.js";
import ResolvedQuery from "../../models/resolvedQuery.js";
import User from "../../models/user.js"


export const getAllqueriesRelatedToDepartment = async (req, res) => {
    try {
        let { category } = req.params;
        console.log(category);

        // Await the result of Query.find() to get the actual documents
        let queries = await Query.find({ category: category });

        if (queries.length === 0) {
            return res.status(200).json({ message: `There are no queries belonging to the ${category} category` });
        }

        console.log(queries);
        res.status(200).json(queries);
    } catch (error) {
        console.log("Error in gov --> query --> getAllqueriesRelatedToDepartment controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const takeChargeOnTask = async (req, res) => {
    const { queryId, empId } = req.body;

    try {
        // Find the query
        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(400).json({ error: "Query does not exist" });
        }

        // Update the status of the query to "In Progress"
        query.status = "In Progress";
        await query.save();
        // Find the government employee
        const govEmp = await GovernmentEmployee.findById(empId);
        if (!govEmp) {
            return res.status(400).json({ error: "Government employee does not exist" });
        }

        // Checking if the query is already assigned to that employee 
        if (govEmp.queryIncharge.includes(queryId)) {
            return res.status(200).json({ message: "Query is already assigned to you" });
        }

        // Push the queryId into queryIncharge field
        govEmp.queryIncharge.push(queryId);

        // Save the updated government employee and query
        await Promise.all([govEmp.save(), query.save()]);

        return res.status(200).json({ message: "Query assigned successfully" });
    } catch (error) {
        console.log("Error in gov --> query --> takeChargeOnTask controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const commitOfResolvation = async (req, res) => {
    try {
        let { originalQueryId, location, description, img } = req.body;
        let { id } = req.params;

        let employee = await GovernmentEmployee.findById(id);
        if (!employee) {
            return res.status(400).json({ error: "you are not a government employee" });
        }

        if (!employee.queryIncharge.includes(originalQueryId)) {
            return res.status(400).json({ error: "you are not a resolver of this query" });
        }
        // Get address data
        let address = await getLocationData(location[0], location[1]);

        // Create a new ResolvedQuery instance
        let newQuery = new ResolvedQuery({
            resolverId: id,
            location: {
                village: address.village,
                county: address.county,
                district: address.district,
                state: address.state,
                country: address.country
            },
            latitude: location[0],
            longitude: location[1],
            description: description,
            img: img
        });

        // Find the original query and populate the 'raisedBy' field
        let originalQuery = await Query.findById(originalQueryId).populate("raisedBy");
        if (!originalQuery) {
            return res.status(400).json({ error: "the specified query you are solving is not valid" });
        }

        // Create a new resolved query
        newQuery = await newQuery.save();

        let originalQueryAuthor = await User.findOne({ _id: originalQuery.raisedBy._id });

        console.log(originalQueryAuthor);

        // Initialize 'pendingToApprove' array if it doesn't exist
        if (!originalQueryAuthor) {
            return res.status(400).json({ error: "User who raised the query not found" });
        }

        originalQueryAuthor.pendingToApprove = originalQueryAuthor.pendingToApprove || [];

        // Push the new resolved query ID to 'pendingToApprove'
        originalQueryAuthor.pendingToApprove.push(newQuery._id);

        // Save the updated originalQueryAuthor document
        await originalQueryAuthor.save();


        res.status(200).json(newQuery);

    } catch (error) {
        console.log("Error in gov --> query --> commitOfResolvation controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
