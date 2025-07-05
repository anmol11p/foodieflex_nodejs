import itemModel from "../model/itemSchema.js";

const addTheProuduct = async (req, res, next) => {
  try {
    const { itemName, price, description, category, imageUrl, available } =
      req.body;

    const item = new itemModel({
      itemName,
      price,
      description,
      category,
      imageUrl,
      available,
    });
    await item.save();

    return res.status(201).json({ message: "item added successfully" });
  } catch (error) {
    next(error);
  }
};

export { addTheProuduct };
