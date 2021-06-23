USE tracker_db;

INSERT INTO departments (dpt_name)
VALUES
    ("Sales"),
    ("IT"),
    ("HR"),
    ("Accounting"),
    ("Legal");

INSERT INTO roles (title, salary, dpt_id)
VALUES
    ("Sales Manager", 100000, 1),
    ("Sales Person", 50000, 1),
    ("IT Manager", 150000, 2),
    ("Software Engineer", 100000, 2),
    ("Data Engineer", 100000, 2),
    ("HR Coordinator", 60000, 3),
    ("Accountant", 125000, 4),
    ("Accounting Clerk", 50000, 4),
    ("Lawyer", 150000, 5),
    ("Legal Assistant", 50000, 5);

INSERT INTO employees (first_name, last_name, role_id, mgr_id)
VALUES
    ("Linda", "Chart", 1, null),
    ("David", "Jhon", 2, 1),
    ("Debra", "Chris", 2, 1),
    ("Ada", "Lovelace", 3, null),
    ("Hope", "George", 4, 4),
    ("Aman", "Nic", 4, 4),
    ("Mat", "Damon", 5, 4),
    ("Gerald", "Dan", 6, null),
    ("Emma", "Buffett", 7, null),
    ("Rose", "Noman", 8, 9),
    ("Isaac", "Pit", 9, null),
    ("Smith", "Jacob", 10, 11);