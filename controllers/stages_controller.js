//DEPENDENCIES
const stages = require ('express').Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require ('sequelize');

//FIND ALL STAGES
stages.get('/', async (req,res) => {
    try{
        const foundStages = await Stage.findAll({
            order: [ [ 'availabe_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: ` %${req.query.name ? req.queryname : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC STAGE
stages.get('/:stage_name', async (req,res) => {
    try{
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.stage_name }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A STAGE
stages.post('/', async (req,res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE A STAGE
stages.put('/:stage_name', async (req,res) => {
    try {
        const updateStages = await Stage.update(req.body, {
            where: {
                stage_name: req.params.stage_name
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updateStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE A STAGE
stages.delete('/:stage_name', async ( req,res) => {
    try{
        const deledStages = await Stage.destroy ({
            where: {
                stage_name: req.params.stage_name
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = stages