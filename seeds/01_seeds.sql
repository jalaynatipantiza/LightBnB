DELETE FROM users;
DELETE FROM properties;
DELETE FROM reservations;
DELETE FROM property_reviews;

INSERT INTO users (name, email, password) 
VALUES ('Landon', 'landon@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Jalayna', 'jalayna@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Jane', 'jane@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES(1, 'Minimalist Corner', 'description', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fglobalnews.booking.com%2F7deVaw2jwUlkod5FB5oL7oJayo5c&ust=1593121401171000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC16-u1m-oCFQAAAAAdAAAAABAE', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3dBq4gj-XDKMhr2FYIpR8jX9XwhD4ij967A&usqp=CAU', 'Canada', '123 Smith Court', 'Saskatoon', 'Saskatchewan', 'S7M 9U5'),
      (2, 'The Gardens', 'description', 'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2018/3/27/0/CI_William-Pitt-Sothebys_Washington-Connecticut-estate-1.jpg.rend.hgtvcom.966.644.suffix/1522159327398.jpeg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjlMMAzSNDaJ563nbF_s-KcwMd9tsm5gs8_g&usqp=CAU', 'Canada','124 Smith Court', 'Victoria', 'British Colombia', 'H8L 2E3'),
      (2, 'Blank Corner', 'description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAHgrNTBwdD0c0bumbgRn5RtWETv3JyR6MOg&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMGljoQSaluR2czNCGdIZMBc-9mUuc5glGyg&usqp=CAU', 'Canada', '125 Smith Court', 'Calgary', 'Alberta', 'S7H 5L3');

INSERT INTO reservations(start_date, end_date, property_id, guest_id) 
VALUES('2020-02-15', '2020-02-20', 1, 1),
      ('2020-03-02', '2020-03-05', 2, 2),
      ('2020-04-19', '2020-04-22', 2, 1);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) 
VALUES(1, 1, 1, 4, 'message'),
      (2, 2, 2, 5, 'message'),
      (1, 2, 3, 2, 'message');