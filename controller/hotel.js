import Hotel from "../models/Hotels.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
  const newhotel = new Hotel(req.body);
  try {
    const savedhotel = await newhotel.save();
    res.status(200).json(savedhotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatehotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatehotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
export const getallHotels = async (req, res, next) => {
  const { min, max, ...other } = req.query;
  try {
    const hotels = await Hotel.find({
      ...other,
      cheapestPrice: {
        $gt: min | 1,
        $lt: max || 999,
      },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const city = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      city.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
