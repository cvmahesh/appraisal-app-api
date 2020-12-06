var express = require('express');
var mongoose = require('mongoose');
var Item = require('../models/models.item');

var itemRouter = express.Router();

console.log('Welcome to items');


itemRouter
  .route('/items')//working
  .post(function (request, response) {

    console.log('M- POST /items');

    var item = new Item({
      id:new mongoose.Types.ObjectId(), 
      name:request.body.name,
      description:request.body.description,
      quantity:request.body.quantity
    });

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {//working

    console.log('GET-> /items');

    Item.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }
      console.log(items);
      response.json(items);
    });
  });



//UrL depends on route

itemRouter
  .route('/items/:itemId')//working
  .get(function (request, response) {

    console.log('M- GET /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(item);

      response.json(item);

    });
  })
  .put(function (request, response) {//working

    console.log('->PUT /items/:itemId');
//http://localhost:8080/items/items/5fc26500c77b950e198d0b2e

    var itemId = request.params.itemId;
   //var itemId = request.body.itemId;
    console.log('itemId in Put '+itemId);  
    Item.findOne({ id: itemId }, function (error, item) {
      console.log('Error  ');  
      if (error || (!request.body.name|| !request.body.description || !request.body.quantity )) {
        console.log('Error in Put ');  
       
        response.status(500).send(error);
        return;
      }

 

        item.name = request.body.name;
        item.description = request.body.description;
        item.quantity = request.body.quantity;
        
        console.log('item.name: '+item.name);  
        console.log('item.description: '+item.description); 
        console.log('item.quantity: '+item.quantity); 

        
      if (item) {
        
        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      console.log('Inside  in findOne ');  
      if (error) {
        console.log('Error in findOne ');  
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   item.name = request.body.name;
        // }

        // if (request.body.description) {
        //   item.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   item.quantity = request.body.quantity;
        // }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {//working

    console.log('DELETE /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Item with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      }
    });
  });

module.exports = itemRouter;