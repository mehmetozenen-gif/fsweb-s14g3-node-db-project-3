
-- SORGU 1
-- Tüm ürünlerin adını ve kategori adını getir
-- Beklenen: 77 kayıt

SELECT
    p.ProductName,
    c.CategoryName
FROM Products AS p
INNER JOIN Categories AS c
    ON p.CategoryId = c.Id;


-- SORGU 2
-- 9 Ağustos 2012 tarihinden önceki siparişler
-- Sipariş ID ve gönderici şirket adı
-- Beklenen: 429 kayıt

SELECT
    o.Id,
    s.CompanyName
FROM Orders AS o
INNER JOIN Shippers AS s
    ON o.ShipVia = s.Id
WHERE o.OrderDate < '2012-08-09';


-- SORGU 3
-- 10251 numaralı siparişin ürünleri
-- Ürün adı ve miktar
-- Beklenen: 3 kayıt

SELECT
    p.ProductName,
    od.Quantity
FROM OrderDetails AS od
INNER JOIN Products AS p
    ON od.ProductId = p.Id
WHERE od.OrderId = 10251
ORDER BY p.ProductName ASC;


-- SORGU 4
-- Her sipariş için sipariş ID,
-- müşteri şirketi ve çalışan soyadı
-- Beklenen: 16789 kayıt

SELECT
    o.Id AS OrderId,
    c.CompanyName AS CustomerName,
    e.LastName AS EmployeeLastName
FROM Orders AS o
INNER JOIN Customers AS c
    ON o.CustomerId = c.Id
INNER JOIN Employees AS e
    ON o.EmployeeId = e.Id;

SELECT
    s.ShipperName,
    COUNT(o.OrderID) AS TotalOrders
FROM Shippers AS s
LEFT JOIN Orders AS o
    ON s.ShipperID = o.ShipperID
GROUP BY s.ShipperID, s.ShipperName
ORDER BY TotalOrders DESC;
SELECT TOP 5
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    COUNT(o.OrderID) AS TotalOrders
FROM Employees AS e
INNER JOIN Orders AS o
    ON e.EmployeeID = o.EmployeeID
GROUP BY
    e.EmployeeID,
    e.FirstName,
    e.LastName
ORDER BY TotalOrders DESC;

SELECT TOP 5
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    SUM(od.Quantity * p.Price) AS TotalRevenue
FROM Employees AS e
INNER JOIN Orders AS o
    ON e.EmployeeID = o.EmployeeID
INNER JOIN OrderDetails AS od
    ON o.OrderID = od.OrderID
INNER JOIN Products AS p
    ON od.ProductID = p.ProductID
GROUP BY
    e.EmployeeID,
    e.FirstName,
    e.LastName
ORDER BY TotalRevenue DESC;

SELECT TOP 1
    c.CategoryName,
    SUM(od.Quantity * p.Price) AS TotalRevenue
FROM Categories AS c
INNER JOIN Products AS p
    ON c.CategoryID = p.CategoryID
INNER JOIN OrderDetails AS od
    ON p.ProductID = od.ProductID
GROUP BY
    c.CategoryID,
    c.CategoryName
ORDER BY TotalRevenue ASC;

SELECT TOP 1
    c.Country,
    COUNT(o.OrderID) AS TotalOrders
FROM Customers AS c
INNER JOIN Orders AS o
    ON c.CustomerID = o.CustomerID
GROUP BY c.Country
ORDER BY TotalOrders DESC;

