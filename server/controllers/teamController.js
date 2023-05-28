const User = require('../models/User');
const Team = require('../models/Team');

async function createTeam(req, res) {
    const { team_name, members_ids, creator_id, team_leader_id} = req.body;

    if (!team_name ) {
        return res.status(422).json({'message': 'The name of the team is required!\nPlease fill in the name of the team.'});
    }

    const teamExists = await Team.exists({ team_name });
    if (teamExists) {
        return res.status(409).json({'message': 'The team name is already in use!\nPlease use a different name.'});
    }
    
    if (team_name.length < 4) {
        return res.status(422).json({'message': 'The team name is too short!\nPlease use a name that has at least 4 characters.'});
    }

    members_ids.push(creator_id);

    try {
        await Team.create({
            team_name,
            creator_id,
            members_ids,
            team_leader_id,
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).json({'message': 'Could not create team!'});
    }
}

async function getAll(req, res) {
    try {
        const teams = await Team.find({});
        return res.status(200).json(teams);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not find teams!'});
    }
}

async function getTeamById(req, res) {
    const { id } = req.params;

    try {
        const team = await Team.findById(id);
        return res.status(200).json(team);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not find team!'});
    }
}

async function getUserTeams(req, res) {
    const { id } = req.params;

    try {
        const teams = await Team.find({ members_ids: id });
        return res.status(200).json(teams);
    } catch(error) {
        return res.status(400).json({'message': 'Something went wrong! Could not find team!'});
    }
}

module.exports = { createTeam, getAll, getTeamById, getUserTeams };