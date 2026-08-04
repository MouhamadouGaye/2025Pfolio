SELECT c.customer_id,
    c.firstname,
    c.lastname,
    AVG(CAST(opc.item_count AS DECIMAL(10, 2))) AS AVG
FROM customer c
    JOIN purchase_order po ON c.customer_id = po.customer_id
    JOIN (
        SELECT order_id COUNT(*) AS item_count
        FROM order_product
        GROUP BY order_id
    ) opc ON opc.order_id = po.order_id
GROUP BY c.customer_id,
    c.firstname,
    c.lastname,
    HAVING AVG(CAST(opc.item_account AS DECIMAL(10, 2))) > 2
ORDER BY AVG DESC;
create unique index idx_kobe_clients ON clients + -----------------+
| Tenant | + -----------------+
| id (PK, UUID) | | name | | plan | | created_at | + -----------------+
| | 1 ─ ─ ─ ─ N | + -----------------+
| User | + -----------------+
| id (PK, UUID) | | tenant_id (FK) | | email | | role (ENUM) | < -- ADMIN, SALES, VIEWER
| created_at | + -----------------+
| | 1 ─ ─ ─ ─ N | + -----------------+
| Opportunity | + -----------------+
| id (PK, UUID) | | tenant_id (FK) | | client_id (FK) | | owner_id (FK) | --> User.id
| title | | amount | | stage | | probability | | close_date | | created_at | | version | + -----------------+
| | 1 ─ ─ ─ ─ N | + -----------------+
| Activity | + -----------------+
| id (PK, UUID) | | tenant_id (FK) | | opportunity_id(FK) | | user_id (FK) | --> User.id
| type (CALL / EMAIL / MEETING) | | notes | | due_date | | completed_at | | created_at | + -----------------+
+ -----------------+
| Client | + -----------------+
| id (PK, UUID) | | tenant_id (FK) | | name | | email | | phone | | status | | created_by(FK) | --> User.id
| created_at | | updated_at | | version | | deleted_at | + -----------------+
| | 1 ─ ─ ─ ─ N | + -----------------+
| Contact | + -----------------+
| id (PK, UUID) | | tenant_id (FK) | | client_id (FK) | | first_name | | last_name | | email | | phone | | created_at | + -----------------+