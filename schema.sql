CREATE DATABASE bamazon;

CREATE TABLE hero_products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL
  PRIMARY KEY (item_id)
);

CREATE TABLE villian_products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO hero_products (
  product_name,
  department_name,
  price,
  stock_quantity
)
VALUES 
  (
    'Blue Cape',
    'costume',
    24.95,
    107
  ),
  (
    'Incognito Glasses',
    'costume',
    12,
    234
  ),
  (
    'Shield (round)',
    'weaponry',
    259.99,
    5
  ),
  (
    'Steel Toed Boots',
    'costume',
    46.50,
    53
  ),
  (
    'Red Emergency Phone',
    'gadgets',
    60,
    14
  ),
  (
    'Side-kick Mask',
    'costume',
    14.95,
    491
  ),
  (
    'Sword of Justice',
    'weaponry',
    600,
    3
  );
  (
    'Rocket Boots',
    'gadgets',
    67.97,
    27
  ),
  ( 
    'Superhero Pepper Spray',
    'weaponry',
    12,
    862
  ),
  (
    'Bulletproof Bracelets',
    'weaponry',
    98,
    45
  ),
  (
    'Night Vision Googles',
    'gadgets',
    175.50,
    2
  );

INSERT INTO villian_products (
  product_name,
  department_name,
  price,
  stock_quantity
)
VALUES 
  (
    'Freeze Gun',
    'weaponry',
    124.95,
    10
  ),
  (
    'Diabolical Cat',
    'accessories',
    75,
    2
  ),
  (
    'Black Gloves (pair)',
    'costume',
    22,
    304
  ),
  (
    'Sword Cane',
    'weaponry',
    78.50,
    7
  ),
  (
    'Gold Tooth',
    'accessories',
    30,
    11
  ),
  (
    'End of the World Bomb',
    'weaponry',
    10000000,
    1
  ),
  (
    'Black Trenchcoat',
    'costume',
    67.99,
    34
  ),
  (
    'Maniacal Laugh',
    'accessories',
    56.75,
    4
  ),
  ( 
    'Signet Ring',
    'costume',
    67.99,
    8
  ),
  (
    'Lint Brush',
    'accessories',
    10,
    300
  );
