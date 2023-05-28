const Issue = require('../models/Issue');

async function createIssue(req, res) {
    const { issue_name, creator_id, project_id, story_points, priority, labels, assignee_id, goal, description } = req.body;

    if (!issue_name || !description || !goal || !creator_id || !project_id) {
        return res.status(422).json({'message': 'Required information about the issue has not been submitted.'});
    }

    if (labels.length !== new Set(labels).size) {
        return res.status(400).json({'message': 'You cannot have duplicate labels!'});
    }

    const issueExists = await Issue.exists({ issue_name });
    if (issueExists) {
        return res.status(409).json({'message': 'There is an issue with this exact title!\nPlease use a different title.'});
    }

    try {
        await Issue.create({
            issue_name, 
            creator_id, 
            project_id, 
            status: 'open',
            story_points, 
            priority, 
            labels, 
            assignee_id, 
            goal, 
            description
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create issue!'});
    }
}

async function getAll(req, res) {
    try {
        const issues = await Issue.find().exec();
        return res.status(200).json(issues);
    } catch (error) {
        return res.status(400).json({'message': 'Could not get issues!'});
    }
}

async function getProjectIssues(req, res) {
    const { id } = req.params;

    try {
        const issues = await Issue.find({project_id: id}).exec();
        return res.status(200).json(issues);
    } catch (error) {
        return res.status(400).json({'message': 'Could not get issues!'});
    }
}

async function getUserIssues(req, res) {
    const { id } = req.params;

    try {
        const issues = await Issue.find({assignee_id: id}).exec();
        return res.status(200).json(issues);
    } catch (error) {
        return res.status(400).json({'message': 'Could not get issues!'});
    }
}

async function getCreatorIssues(req, res) {
    const { id } = req.params;

    try {
        const issues = await Issue.find({creator_id: id}).exec();
        return res.status(200).json(issues);
    } catch (error) {
        return res.status(400).json({'message': 'Could not get issues!'});
    }
}

async function getIssueById(req, res) {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id).exec();
        return res.status(200).json(issue);
    } catch (error) {
        return res.status(400).json({'message': 'Could not find issue!'});
    }
}

async function pointIssue(req, res) {
    const { id } = req.params;
    const { story_points } = req.body;

    try {
        const result = await Issue.findByIdAndUpdate({ _id: id }, { story_points: story_points });
        if (!result) {
            return res.sendStatus(422);
        }
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(404);
    }
}

module.exports = { createIssue, getAll, getProjectIssues, getUserIssues, getCreatorIssues, getIssueById, pointIssue };