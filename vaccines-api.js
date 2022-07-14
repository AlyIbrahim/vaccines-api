//import AWS from 'aws-sdk'
// import { nanoid } from 'nanoid';

var AWS = require('aws-sdk');
// var { nanoid } = require("nanoid");
var express = require('express')
var router = express.Router();

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const table = 'vaccines'

// Home page route.
router.get('/', async function (req, res) {
  console.log("Get tenants")
  let data = await getAll(table)
  res.send(data);
//  res.send('Wiki home page');
})

router.post('/', async function (req, res) {
//  console.log(req)
  let data = req.body;
//  console.log(JSON.parse(data))
  console.log(data)
  let resp = await insertTenant(data.name, data.species, data.breed, data.recurrance);
  console.log(resp)
  res.send(resp)
})

router.put('/', async function (req, res) {
  let data = req.body;
  console.log(data)
  let resp = await updateTenant(data.name, data.species, data.breed, data.recurrence);
  console.log(resp)
  res.send(resp)

})

router.delete('/', async function (req, res) {
  let data = req.body;
  console.log(data)
  let resp = await deleteTenant(data.name);
  console.log(resp)
  res.send(resp)

})



const insertTenant = async (name, species, breed, recurrsion) => {
  const params = {
    TableName: table,
    Item: {
      name,
      species,
      breed,
      recurrsion
    },
  };
  try {
    const data = await ddb.put(params).promise();
    console.log('Tenant inserted', data);
  } catch (err) {
    console.log(err);
  }
};


const getAll = async (table) => {
  const params = {
    TableName: table,
  };
  try {
    const data = await ddb.scan(params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteTenant = async (name) => {
  const params = {
    TableName: table,
    Key: {
      name,
    }
  };
  try {
    const data = await ddb.delete(params).promise();
    console.log('Tenant deleted', data);
  } catch (err) {
    console.log(err);
  }
};

const updateTenant = async (name, species, breed, recurrence) => {
  const params = {
    TableName: table,
    Item: {
      name,
      species,
      breed,
      recurrence
    },
  };
  try {
    const data = await ddb.put(params).promise();
    console.log('Tenant updated', data);
  } catch (err) {
    console.log(err);
  }
};




module.exports = router;
