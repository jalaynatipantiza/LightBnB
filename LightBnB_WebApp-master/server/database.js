// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 123,
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
    .then(res => res.rows[0]);
    
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then(res => res.rows[0])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name
  const email = user.email
  const password = user.password

  return pool.query(`
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING *`, [name, email, password]
  )
  .then(res => res.rows[0])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
 return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`, [guest_id, limit])
.then(res => res.rows)
 };

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
 
  const queryParams = [];
  let queryString = `
  SELECT  properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;

  if(options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length}`;
  };

  if(options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length}\n`;
  };

  if(options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND (cost_per_night >= $${queryParams.length-1} AND cost_per_night <= $${queryParams.length})\n`
  console.log(queryParams);
  };

  queryString +=  `GROUP BY properties.id\n`;

  if(options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(rating) >= $${queryParams.length}\n`
  };

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;


  return pool.query(queryString, queryParams)
  .then(res => res.rows);

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const owner_id = property.owner_id
  const title = property.title
  const description = property.description
  const thumb_nail_url = property.thumbnail_photo_url
  const cover_photo_url = property.cover_photo_url
  const country = property.country
  const street = property.street
  const city = property.city
  const province = property.province
  const post_code = property.post_code
  const cost_per_night = property.cost_per_night
  const parking_spaces = property.parking_spaces
  const number_of_bathrooms = property.number_of_bathrooms
  const number_of_bedrooms = property.number_of_bathrooms


  return pool.query(`
  INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *`, [owner_id, title, description, thumb_nail_url, cover_photo_url, country, street, city, province, post_code, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms]
  )
  .then(res => res.rows[0])
}
exports.addProperty = addProperty;
