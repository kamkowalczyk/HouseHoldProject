import express from "express";
import { 
    createHouse,
    updateHouse, 
    deleteHouse, 
    getHouse,
    getHouses,
    countByCity,
    countByType,
    getHouseRooms,
    housesByType

} from "../controllers/house.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//Create
router.post("/", verifyAdmin, createHouse);

//Update
router.put("/:id", verifyAdmin, updateHouse);

//Delete
router.delete("/:id",  deleteHouse);

//Get
router.get("/find/:id", getHouse);

//Get All
router.get("/", getHouses);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHouseRooms);
router.get('/housesByType', housesByType);


export default router;