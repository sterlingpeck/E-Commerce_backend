const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
  Category.findAll({
    // Include associated products
    include: {
      model: Product,
    },
  })
    .then((dbCategoryInfo) => res.json(dbCategoryInfo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // Include associated products
    include: {
      model: Product,
    },
  })
    .then((dbCategoryInfo) => {
      if (!dbCategoryInfo) {
        res.status(404).json({
          message: "This product ID does not exist",
        });
        return;
      }
      res.json(dbCategoryInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryInfo) => res.json(dbCategoryInfo))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategoryInfo) => {
      if (!dbCategoryInfo) {
        res.status(404).json({
          message: "This category ID does not exist",
        });
        return;
      }
      res.json(dbCategoryInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryInfo) => {
      if (!dbCategoryInfo) {
        res.status(404).json({
          message: "This category ID does not exist",
        });
        return;
      }
      res.json(dbCategoryInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
