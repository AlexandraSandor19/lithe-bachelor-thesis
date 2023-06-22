const Sprint = require('../models/Sprint');

const compareDates = (date1, date2) => {
    const day1 = date1.getDate();
    const month1 = date1.getMonth() + 1;
    const year1 = date1.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth() + 1;
    const year2 = date2.getFullYear();
    
    // date1 < date2
    if (year1 < year2 || (year1 === year2 && month1 < month2) || (year1 === year2 && month1 === month2 && day1 < day2)) {
        console.log('planning')
        return -1;
    } 
    // date1 > date2
    else if (year1 < year2 || (year1 === year2 && month1 < month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
        return 1;
    }
    // date1 = date2 
    else {
        console.log('done')
        return 0;
    }
}

const getStateForIteration = (startDate, endDate) => {
    const dateNow = new Date();
    if (compareDates(dateNow, startDate) < 0) {
        return 'planning';
    }
    else if (compareDates(startDate, dateNow) >= 0 && compareDates(dateNow, endDate) <=0) {
        return 'active';
    }
    else {
        return 'done';
    }
}

async function createSprint(req, res) {
    const { team_id, startDate, endDate, goal } = req.body;

    if (!startDate || !team_id || !endDate || !goal) {
        return res.status(422).json({'message': 'Some mandatory fields have not been completed!'});
    }
    if (startDate >= endDate || startDate < new Date()) {
        return res.status(422).json({'message': 'The start and end dates from the sprints are invalid!'});
    }
    const overlap = await Sprint.find({
        $or: [
            {
                $and: [
                    { startDate: { $gte: startDate } },
                    { startDate: { $lte: endDate } }
                ]
            },
            {
                $and: [
                    { startDate: { $lte: startDate } },
                    { endDate: { $gte: startDate } },
                ]
            }
        ]
    }).exec();
    if (overlap.length) {
        return res.status(422).json({'message': 'The selected sprint timeframe overlaps with a planned sprint!'});
    }

    const state = getStateForIteration(new Date(startDate), new Date(endDate));
    try {
        const sprint = await Sprint.create({
            team_id, 
            startDate: new Date(startDate).toISOString(), 
            endDate: new Date(endDate).toISOString(),
            state,
            goal
        });
        return res.status(200).json(sprint);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create sprint!'});
    }
}

async function getUpcommingSprints(req, res) {
    try {
        const sprints = await Sprint.find({});
        sprints.forEach((sprint) => {
            sprint.state = getStateForIteration(sprint.startDate, sprint.endDate);
            sprint.save();
        })
        const upcomming = sprints.filter(sprint => sprint.state == 'active' || sprint.state == 'planning')
        return res.status(200).json(upcomming);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not get sprint information!'});
    }
}

async function addIssues(req, res) {
    const { issues } = req.body;
    const { id } = req.params;

    try {
        const sprint = await Sprint.findById(id);
        if (!sprint) {
            return res.status(422).json({ "message": "Sprint not found!"});
        }
        const issuesMerged = sprint.issues.concat(issues);
        sprint.issues = [...new Set(issuesMerged)]
        sprint.save();
        return res.status(200).json(sprint);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to add issues!'});
    }
}

async function updateState(req, res) {
    const { id } = req.params;

    try {
        const sprint = await Sprint.findById(id);
        if (!sprint) {
            return res.status(422).json({ "message": "Sprint not found!"});
        }
        sprint.state = getStateForIteration(sprint.startDate, sprint.endDate);
        sprint.save();
        return res.status(200).json(sprint);
    } catch (error) {
        return res.status(400).json({'message': 'Failed to add issues!'});
    }
}

module.exports = { createSprint, addIssues, getUpcommingSprints, updateState }