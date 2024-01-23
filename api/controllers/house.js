import House from "../models/House.js";
import Room from "../models/Room.js";

export const createHouse = async (req, res, next) => {
    const newHouse = new House(req.body);

    try {
        const savedHouse = await newHouse.save();
        res.status(200).json(savedHouse);
    } catch (err) {
        next(err);
    }
}
export const updateHouse = async (req, res, next) => {
    try {
      const updatedHouse = await House.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHouse);
    } catch (err) {
      next(err);
    }
  };
  export const deleteHouse = async (req, res, next) => {
    try {
      await House.findByIdAndDelete(req.params.id);
      res.status(200).json("House has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getHouse = async (req, res, next) => {
    try {
      const house = await House.findById(req.params.id);
      res.status(200).json(house);
    } catch (err) {
      next(err);
    }
  };

  export const getHouses = async (req, res, next) => {
    const { minimum, maximum, limit, city, type, showPopular } = req.query;
    const queryObj = {};

    if (showPopular === 'true' || type === 'hot') {
      queryObj.rating = { $gt: 4.5 };
    }

    if (minimum || maximum) {
        queryObj.cheapestPrice = {};
        if (minimum) {
            queryObj.cheapestPrice.$gte = minimum;
        }
        if (maximum) {
            queryObj.cheapestPrice.$lte = maximum;
        }
    }

    if (type && type !== 'hot') {
        queryObj.type = type;
    }

    if (city) {
        queryObj.city = city;
    }

    try {
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;
        const houses = await House.find(queryObj).limit(parsedLimit);
        res.status(200).json(houses);
    } catch (err) {
        next(err);
    }
};

  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return House.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
  export const countByType = async (req, res, next) => {
    try {
      const houseCount = await House.countDocuments({ type: "house" });
      const flatCount = await House.countDocuments({ type: "flat" });
      const villageCount= await House.countDocuments({ type: "village" });
      const cityCount = await House.countDocuments({ type: "city" });
      const apartmentCount = await House.countDocuments({ type: "apartment" });
      const villaCount = await House.countDocuments({ type: "villa" });
      res.status(200).json([
        { type: "house", count: houseCount },
        { type: "flat", count: flatCount },
        { type: "village", count: villageCount },
        { type: "city", count: cityCount },
        { type: "apartment", count: apartmentCount },
        { type: "villa", count: villaCount },
      ]);
    } catch (err) {
      next(err);
    }
  };
  
  export const getHouseRooms = async (req, res, next) => {
    try {
      const house = await House.findById(req.params.id);
      const list = await Promise.all(
        house.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

  export const housesByType = async (req, res, next) => {
    const { type, rating } = req.query;
    let queryObj = { type: type };

    if (type === "hot") {
        queryObj = { rating: { $gte: 4.5 } }; 
    } else if (rating) {
        queryObj.rating = { $gte: parseFloat(rating) };
    }

    try {
        const houses = await House.find(queryObj);
        res.status(200).json(houses);
    } catch (err) {
        next(err);
    }
};