INSERT INTO Sekolah (id, nama, email, password)
VALUES
    -- Dummy Admin
    ('1',
     'sekolah1',
     'admin1@sekolah1.com',
     '$2a$08$Laex.0Y2gHmbgDeI1ARLGOHl8bwMUIKXKUdrZBz9oJYDiJBbaewAS'),
ON CONFLICT DO NOTHING;

