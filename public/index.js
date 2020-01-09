'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance' : 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];



// -------------   Step 1 - Euro-Kilometers  -----------------------

//Updates rental price for a particular rental passed as parameter
function euroKilometers(rental){
    const car = cars.find(car => car.id === rental.carId)
    let pickupDate = new Date(rental.pickupDate)
    let returnDate = new Date(rental.returnDate)
    let nbDays = (returnDate.getTime() - pickupDate.getTime()) / 86400000 //We divide by the nb of millisec in a day because getTime() returns miliseconds
    let distanceComp = car.pricePerKm * rental.distance
    let timeComp = car.pricePerDay * nbDays
    let rentalPrice = distanceComp + timeComp 

    rental.price = rentalPrice
}


rentals.forEach(rental => {
  euroKilometers(rental)
});

console.log("EuroKilometers : ")
console.log("I'm not sure why but the price that is displayed here already takes into consideration the DriveMorePayLess func, even though it hasn't ran yet.")
console.log(rentals)


// -------------   Step 2 - Drive more, pay less  -----------------------

function driveMorePayLess(rental){
  const car = cars.find(car => car.id === rental.carId)
  let pickupDate = new Date(rental.pickupDate)
  let returnDate = new Date(rental.returnDate)
  let nbDays = (returnDate.getTime() - pickupDate.getTime()) / 86400000 //We divide by the nb of millisec in a day because getTime() returns miliseconds
  let distanceComp = car.pricePerKm * rental.distance
  let timeComp = car.pricePerDay * nbDays
  let rentalPrice = distanceComp + timeComp 

  if(nbDays > 1) {
    rentalPrice = rentalPrice - rentalPrice*0.10  //If rental is more than 1 day we apply a 10% coupon to the price
  } else if(nbDays > 4) {
    rentalPrice = rentalPrice - rentalPrice*0.30  //If rental is more than 4 days we apply a 30% coupon to the price 
  } else if(nbDays > 10) {
    rentalPrice = rentalPrice - rentalPrice*0.50  //If rental is more than 10 days we apply a 50% coupon to the price
  }

  rental.price = rentalPrice
}

rentals.forEach(rental => {
  driveMorePayLess(rental)
});

console.log("DriveMorePayLess : ")
console.log(rentals)


// -------------   Step 3 - Give me all your money  -----------------------

function giveMeAllYourMoney(rental) {
  let pickupDate = new Date(rental.pickupDate)
  let returnDate = new Date(rental.returnDate)
  let nbDays = (returnDate.getTime() - pickupDate.getTime()) / 86400000

  const rentalPrice = rental.price
  const totalCommission = rentalPrice * 0.30 //Total com is 30% of rental price
  let insuranceCommission = totalCommission / 2 //Insurance takes half of the total commission
  let treasuryCommission = nbDays //treasury takes 1€ per day
  let virtuoCommission = totalCommission - treasuryCommission - insuranceCommission

  rental.commission.insurance = insuranceCommission
  rental.commission.treasury = treasuryCommission
  rental.commission.virtuo = virtuoCommission
}


rentals.forEach(rental => {
  giveMeAllYourMoney(rental)
});

console.log("GiveMeAllYourMoney : ")
console.log(rentals)


// -------------   Step 4 - The Famous Deductible  -----------------------

function theFamousDeductible(rental){
  let pickupDate = new Date(rental.pickupDate)
  let returnDate = new Date(rental.returnDate)
  let nbDays = (returnDate.getTime() - pickupDate.getTime()) / 86400000

  let rentalPrice = rental.price

  if(rental.deductibleReduction){
    rentalPrice += 4 * nbDays //deductible reduction costs 4€ per day of rent
  }

  rental.price = rentalPrice
}

rentals.forEach(rental => {
  theFamousDeductible(rental)
});

console.log("theFamousDeductible : ")
console.log(rentals)


// -------------  Step 5 - Pay the actors  -----------------------

function payTheActors(actor)
{
  const rental = rentals.find(rental => rental.id === actor.rentalId)


  let pickupDate = new Date(rental.pickupDate)
  let returnDate = new Date(rental.returnDate)
  let nbDays = (returnDate.getTime() - pickupDate.getTime()) / 86400000

  let rentalPrice = rental.price
  let driverDebit = rentalPrice 
  let totalCommission = rentalPrice*0.30
  let deductibleCost = 0
  let partnerCredit = 0
  let virtuoCredit = 0
  let treasuryCredit = 0
  let insuranceCredit = 0

  if(rental.deductibleReduction){
    deductibleCost = 4 * nbDays
    driverDebit += deductibleCost //If he subscribed to the deductible reduction
  }

  partnerCredit = rentalPrice - totalCommission //Rental price minus the commission
  insuranceCredit = totalCommission/2
  treasuryCredit = nbDays
  virtuoCredit = deductibleCost + totalCommission - insuranceCredit - treasuryCredit

  actor.payment[0].amount = driverDebit
  actor.payment[1].amount = partnerCredit
  actor.payment[2].amount = insuranceCredit
  actor.payment[3].amount = treasuryCredit
  actor.payment[4].amount = virtuoCredit
}

actors.forEach(actor => {
  payTheActors(actor)
});

console.log("PayTheActors : ")
console.log(actors)