const express = require('express');
const app = express();
const budgetRoute = express.Router();

let Budget = require('../models/Budget');

budgetRoute.route('/create').post((req, res, next) => {
  Budget.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

budgetRoute.route('/update/:id').put((req, res, next) => {
  Budget.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
    }
  })
})

budgetRoute.route('/delete/:id').delete((req, res, next) => {
  Budget.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

budgetRoute.route('/').get((req, res) => {
  Budget.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

budgetRoute.route('/read/:id').get((req, res) => {
  Budget.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = budgetRoute;