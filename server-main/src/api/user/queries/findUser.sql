SELECT email,
       password,
       first_name,
       middle_name,
       last_name,
       university,
       created_at,
       updated_at
FROM users
WHERE user = ?

