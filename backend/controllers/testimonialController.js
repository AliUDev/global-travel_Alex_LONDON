const modal = require("../models/TestimonailModal");

const post = async(req,res) => {
    try{
        const {name, discritpion,rating} = req.body;
        const create = await modal.create({
            ...req.body,
        })
        return res.status(200).json(create);
    }catch (err) {
        return res.status(400).json("error", err);
    }
}

const get = async(req,res)=>{
    try {
        const data = await modal.find();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// ROute to delete obj
const deleteObj = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await modal.findByIdAndDelete(id);
      res.send(`Document has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

module.exports = {
    post,
    get,
    deleteObj,
};
  