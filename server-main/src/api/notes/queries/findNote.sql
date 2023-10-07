SELECT id,
       user,
       content,
       created_at,
       updated_at
FROM notes
WHERE user = ? AND id = ?


