//DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db;

//FIND ALL EVENTS
events.get('/',async (req,res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [[ 'available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%{req.query.name}%`}
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})
//FIND A SPECIFIC EVENT
events.get('/:id', async (req,res) => {
    try{
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE A EVENT
events.post('/', async (req,res) => {
    try {
        const newEvent = await event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE A EVENT
events.put('/:id', async (req,res) => {
    try{
        const updateEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
    }catch(err) {
        res.status(500).json(err)
    }
})

//DELETE A EVENT
events.delete('/:id', async(req,res) => {
    try{
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORT
module.exportas = events