const Project = require('../models/Project');

async function createProject(req, res) {
    const { project_name, team_id, creator_id, repository_url, labels, po_id } = req.body;

    if (!project_name || !team_id ) {
        return res.status(422).json({'message': 'Some mandatory fields have not been completed!\nPlease make sure you enter the project name and assign a team.'});
    }

    const projectExists = await Project.exists({ project_name });
    if (projectExists) {
        return res.status(409).json({'message': 'The project name is already in use!\nPlease use a different name.'});
    }
    
    if (project_name.length < 4) {
        return res.status(422).json({'message': 'The project name is too short!\nPlease use a name that has at least 4 characters.'});
    }

    try {
        await Project.create({
            project_name,
            team_id, 
            creator_id,
            repository_url,
            labels,
            po_id
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create project!'});
    }
}

async function getAll(req, res) {
    try {
        const projects = await Project.find({});
        return res.status(200).json(projects);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not get projects!'});
    }
}

async function getProjectById(req, res) {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        return res.status(200).json(project);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not get project!'});
    }
}

async function getTeamProjects(req, res) {
    const { id } = req.params;

    try {
        const projects = await Project.find({ team_id: id });
        return res.status(200).json(projects);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not get projects!'});
    }
}

module.exports = { createProject, getAll, getProjectById, getTeamProjects };