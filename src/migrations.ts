type Migration = () => {
    name: string;
    up: string;
    down: string;
}

const createMigrationsTable: Migration = () => ({
    name: "create_migrations_table",
    up: `CREATE TABLE migrations (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        group_id INT NOT NULL DEFAULT 0,
        name VARCHAR(100) NOT NULL,
        created DATETIME DEFAULT NOW()
    );`,
    down: "DROP TABLE migrations;"
});

const createRanksTable: Migration = () => ({
    name: "create_ranks_table",
    up: `CREATE TABLE ranks (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        points INT NOT NULL DEFAULT 0
    );`,
    down: "DROP TABLE ranks;"
});

const createUsersTable: Migration = () => ({
    name: "create_users_table",
    up: `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        handle VARCHAR(55) NOT NULL UNIQUE,
        bio TEXT NOT NULL,
        email VARCHAR(100) NOT NULL,
        auth INT NOT NULL DEFAULT 1,
        rank INT NOT NULL DEFAULT 1,
        points INT NOT NULL DEFAULT 0,
        upvotes INT NOT NULL DEFAULT 0,
        downvotes INT NOT NULL DEFAULT 0,
        FOREIGN KEY (rank)
            REFERENCES ranks (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE users;"
});

const createLocationsTable: Migration = () => ({
    name: "create_locations_table",
    up: `CREATE TABLE locations (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        address VARCHAR(255),
        lat FLOAT NOT NULL,
        lng FLOAT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT false,
        upvotes INT NOT NULL DEFAULT 0,
        downvotes INT NOT NULL DEFAULT 0,
        FOREIGN KEY (author)
            REFERENCES users (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE locations;"
});

const createAlbumsTable: Migration = () => ({
    name: "create_albums_table",
    up: `CREATE TABLE albums (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author INT,
        location INT,
        name VARCHAR(100),
        FOREIGN KEY (author)
            REFERENCES users (id)
            ON DELETE CASCADE,
        FOREIGN KEY (location)
            REFERENCES locations (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE albums;"
});

const createMediaTable: Migration = () => ({
    name: "create_media_table",
    up: `CREATE TABLE media (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author INT NOT NULL,
        album INT NOT NULL,
        type INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        header_order INT,
        FOREIGN KEY (author)
            REFERENCES users (id)
            ON DELETE CASCADE,
        FOREIGN KEY (album)
            REFERENCES albums (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE media;"
});

const createCommentsTable: Migration = () => ({
    name: "create_comments_table",
    up: `CREATE TABLE comments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author INT NOT NULL,
        parent_id INT,
        location INT NOT NULL,
        FOREIGN KEY (author)
            REFERENCES users (id)
            ON DELETE CASCADE,
        FOREIGN KEY (location)
            REFERENCES locations (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE comments;"
});

const createVotesTable: Migration = () => ({
    name: "create_votes_table",
    up: `CREATE TABLE votes (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        voter_id INT NOT NULL,
        user_id INT,
        location_id INT,
        vote INT NOT NULL DEFAULT 0,
        FOREIGN KEY (voter_id)
            REFERENCES users (id)
            ON DELETE CASCADE,
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE,
        FOREIGN KEY (location_id)
            REFERENCES locations (id)
            ON DELETE CASCADE
    );`,
    down: "DROP TABLE votes;"
});

export default [
    createMigrationsTable,
    createRanksTable,
    createUsersTable,
    createLocationsTable,
    createAlbumsTable,
    createMediaTable,
    createCommentsTable,
    createVotesTable,
];
