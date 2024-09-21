import Query from "../models/query.js"
import User from "../models/user.js";
import { getLocationData } from "../utils/getLocation.js";

//returns all the queries present in db
export const allQueries = async (req, res) => {
    try {
        let allQueries = await Query.find();

        if (allQueries.length == 0) {
            return res.status(200).json({ message: "No Queries Uploaded" });
        }

        return res.status(201).json(allQueries);
    } catch (error) {
        console.log("error in addQuery controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}

//adds new query in db
export const addQuery = async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id);
        let { location, description, img, category, urgency, status, estimatedImpact, targetPopulation } = req.body;

        // if (!location || !description || !img || !category || !urgency || !estimatedImpact || !targetPopulation) {
        //     return res.status({ error: "all fields are required" });
        // }
        let address = await getLocationData(location[0], location[1]);
        console.log(address)
        const newQuery = new Query({
            raisedBy: id,
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
            img: img,
            category: category,
            urgency: urgency,
            status, status,
            estimatedImpact: estimatedImpact,
            targetPopulation: targetPopulation,
        });

        let savedQuery = await newQuery.save();
        console.log("this is saved query : " + savedQuery)
        res.send(savedQuery);
    } catch (error) {
        console.log("error in addQuery controller" + error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//get information of the perticular query which user want  to edit
export const getEditQueryInfo = async (req, res) => {
    try {
        let { id } = req.params;

        let foundQuery = await Query.findById(id);
        return res.status(200).json(foundQuery);
    } catch (error) {
        console.log("error in getEditQueryInfo controller");
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// edit existing query
export const editQuery = async (req, res) => {
    try {

        let { id } = req.params;
        let { raisedBy, queryId } = req.body;

        console.log(req.body);
        if (!raisedBy || !queryId) {
            return res.status(400).json({ error: "raisedBy and queryId are required fields" });
        }

        let query = await Query.findById(queryId);
        if (!query) {
            return res.status(400).json({ error: "Query not found" });
        }
        console.log("this is owner : " + id);
        console.log("this is query : " + raisedBy);
        if (id !== raisedBy) {
            return res.status(402).json({ error: "you are not the author of this query" });
        }


        const { location, description, img, category, urgency, status, targetPopulation } = req.body;
        const address = await getLocationData(location[0], location[1]);
        const updatedQuery = await Query.findOneAndUpdate(
            { _id: queryId }, // Match the document by its _id
            {
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
                img: img,
                category: category,
                urgency: urgency,
                status: status,
                targetPopulation: targetPopulation,
            },
            { new: true } // Set to true if you want to return the updated document

        );
        res.status(200).json(updatedQuery);
    } catch (error) {
        console.log("error in editQuery controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}

export const pendingQueries = async (req, res) => {
    try {
        let { id } = req.params;
        const pendingQueries = await Query.find({ raisedBy: id, status: 'In Progress' });

        if (pendingQueries.length == 0) {
            return res.status(200).json({ message: "No pending Queris" });
        }

        res.status(200).json(pendingQueries);
    } catch (error) {
        console.log("error in pendingQueries controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}
export const totalQueris = async (req, res) => {
    try {
        let { id } = req.params;
        const allQueries = await Query.find({ raisedBy: id });
        
        if (allQueries.length == 0) {
            return res.status(200).json({ message: "No Queries" });
        }

        res.status(200).json(allQueries);
    } catch (error) {
        console.log("error in totalQueris controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }

}

export const completedQueries = async (req, res) => {
    try {
        let { id } = req.params;
        const completedQuery = await Query.find({ raisedBy: id, status: 'Resolved' });

        if (completedQuery.length == 0) {
            return res.status(200).json({ message: "No Queris" });
        }

        res.status(200).json(completedQuery);
    } catch (error) {
        console.log("error in completedQueries controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}

export const pendinfForApprovationQueriess = async (req, res) => {
    try {
        let { id } = req.params;
        const pendingQueries = await Query.find({ raisedBy: id, status: 'Commit' });

        if (pendingQueries.length == 0) {
            return res.status(200).json({ message: "No Queris" });
        }

        res.status(200).json(pendingQueries);
    } catch (error) {
        console.log("error in pendinfForApprovationQueriess controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}


export const getApprovationCount = async (req, res) => {
    try {
        let { id } = req.params;
        const pendingQueries = await Query.find({ raisedBy: id, status: 'Commit' });
        const user = await User.findById(id);
        res.status(200).json({
            count: pendingQueries.length,
            avatar: user.profilepic

        });

    } catch (error) {
        console.log("error in getApprovationCount controller");
        return res.state(500).json({ error: "Internal Server Error" });
    }
}

export const approveCommit = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        // Find the query by ID
        let query = await Query.findById(id);
        console.log("this is qu : ======" + query);
        // If the query doesn't exist, return 404 Not Found
        if (!query) {
            return res.status(404).json({ error: "Query not found" });
        }

        // Check if the user is authorized to approve the query
        if (query.raisedBy != userId) {
            console.log("------------------- : " + userId);
            return res.status(400).json({ error: "You can't approve this query" });
        }

        if (query.status == "Resolved") {
            return res.status(200).json({ message: "Query is already approved" });
        }
        // Update the status of the query
        query.status = "Resolved";

        // Save the updated query
        await query.save();

        // Return success message
        return res.status(200).json({
            message: "Query approved successfully",
            query: query
        });

    } catch (error) {
        // Log and return internal server error if any error occurs
        console.log("Error in pendingForApprovalQueries controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
