const Sprint = require('../models/Sprint');

async function startSprint(req, res) {
    const { team_id, startDate, endDate, goal} = req.body;

    if (!startDate || !team_id || !endDate || !goal) {
        return res.status(422).json({'message': 'Some mandatory fields have not been completed!'});
    }

    try {
        const sprint = await Sprint.create({
            team_id, 
            startDate, 
            endDate, 
            goal
        });
        return res.status(200).json(sprint);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create sprint!'});
    }
}

async function addIssues(req, res) {
    const { issues } = req.body;
    const { id } = req.params;

    try {
        const sprint = await Sprint.findById(id);
        if (!sprint) {
            return res.status(422).json({ "message": "Team not found!"});
        }
        const issuesMerged = sprint.issues.concat(issues);
        sprint.issues = [...new Set(issuesMerged)]
        sprint.save();
        return res.status(200).json(sprint);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to add issues!'});
    }
}

module.exports = { startSprint, addIssues }