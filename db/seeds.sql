INSERT INTO department (name)
VALUES 
('Professor'),
('Ghosts'),
('Founders'),
('Staff');

INSERT INTO role (title, salary, department_id)
VALUES
('Headmaster', 100000, 1),
('Game Keeper', 20000, 4),
('Defense Against the Dark Arts', 70000, 1), 
('Transfiguration', 70000, 1),
('Nurse', 60000, 4), 
('Caretaker', 10000, 4),
('House Ghost', 1000, 2),
('House Founder', 9000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Albus', 'Dumbledore', 1, null),
('Rubeus', 'Hagrid', 2, 1),
('Dolores', 'Umbridge', 3, null),
('Minerva', 'McGonagall', 4, 1),
('Poppy', 'Pomfrey', 5, 1),
('Argus', 'Filtch', 6, 1),
('Bloody', 'Baron', 7, null),
('Rowena', 'Ravenclaw', 8, null); 