INSERT INTO users (username, email, password_digest) 
VALUES
    ('Gingertonic', 'beth@getfutureproof.co.uk', 'hummushummushummus' ),
    ('Sparrow', 'jack@sparrow.com', 'rumrumrum' ),
    ('trumpetgems', 'friend@circus.dk', 'teateatea' );

INSERT INTO posts (user_id, body)
VALUES
    (1, 'futurebook is so secure'),
    (2, 'But why is the rum gone?'),
    (3, 'I like tea'),
    (1, 'I love hummus')