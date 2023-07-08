const express = require("express");
const mongoose = require('mongoose');
const { dbLink } = require('./db.config');
const { hallData } = require("./hallSchema");


mongoose.connect(dbLink);

const PORT = 8000;

const app = express();

app.use(express.json());

app.get('/get', async (req, res) => {

    try {
        const hall = await hallData.find()
        const { ifBooked } = req.query;
        if (ifBooked) {
            const bookedHall =hall.filter((hall)=> hall.ifBooked === ifBooked)
            res.status(200).send({
                bookedHall
            })
        }else{
            res.status(202).send({
                message:"am working",
                hall
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error
        })
    }
})


app.post('/newHall', async (req, res) => {
    try {
        let newhall = await hallData.findOne({ roomNo: req.body.roomNo })

        if (!newhall) {
            let newRoom = await hallData.create(req.body)
            res.status(200).send({
                message: "Hey am working good, welcome",
                newRoom
            })
        } else {
            res.status(400).send({
                message: "Hall Already Exists"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
})

app.put("/hallbooking", async (req,res)=>{
    try {
        const freeHall = await hallData.findOne({roomNo :req.body.roomNo})
        console.log(freeHall)
        if(freeHall.ifBooked === 'true'){
            res.status(400).send({
                message:"Hall is already booked"
            })
        }else{
            freeHall.customerName = req.body.customerName;
            freeHall.startTime = req.body.startTime;
            freeHall.endTime = req.body.endTime;
            freeHall.date = req.body.date;
            freeHall.ifBooked = req.body.ifBooked;
            freeHall.save();
            res.status(200).send({
                message:"Hall Booked Successfully"
            })
        }  
    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error
        })
    }
})


app.listen(PORT, () => console.log("Server Listening in 8000 Port"))