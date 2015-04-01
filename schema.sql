CREATE TYPE roles as enum ("user", "mod", "admin");
CREATE TYPE link_status as enum ("review",
                                 "published",
                                 "hidden",
                                 "flagged");
CREATE TYPE flag_reason as enum ("Off-topic",
                                 "Already posted",
                                 "Poorly tagged",
                                 "Poorly titled",
                                 "Spam",
                                 "Against Code of Conduct");

CREATE TABLE links {
    # IDs
    id          SERIAL       primary key,
    uuid        varchar(36)  not null UNIQUE,

    # Public link info
    link        varchar(150) not null,
    title       varchar(150) not null,
    description varchar(200) not null,
    language    varchar(6)   not null default "en_US",

    # Metadata
    upvotes     bigint       not null default 0,
    downvotes   bigint       not null default 0,
    hotness     numeric(20, 10) not null default 0.0,

    status      link_status  not null default "review",

    # Foreign keys
    submitter   integer      not null references users(id),
    tags        integer      not null references link_tags(tag),
    flags       integer      not null references link_flags(link),

    # Timestamps
    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};

# Join table between links and tags
CREATE TABLE link_tags {
    link not null references links(id),
    tag  not null references tags(id),
    primary key (link, tag)
};

CREATE TABLE tags {
    # ID
    id SERIAL primary key,

    # Tag info
    name        varchar(150) not null UNIQUE,
    description varchar(200) not null,

    # Foreign keys
    links       integer      not null references link_tags(link),
    creator     integer      not null references users(id),

    # Timestamps
    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};

CREATE TABLE users {
    # ID
    id          SERIAL       primary key,

    # Important user info
    name        varchar(150) not null UNIQUE,
    username    varchar(150) not null UNIQUE,
    password    varchar(60)  not null,
    email       varchar(254) not null UNIQUE,

    # Optional user info
    bio         varchar(254) not null default "",
    karma       bigint       not null default 0,
    website     varchar(200) not null default "",
    location    text         not null default "",
    language    varchar(6)   not null default "en_US",
    role        roles        not null default "user",

    # Foreign keys
    links       integer      not null references links(id),
    tags        integer      not null references tags(id),

    # Timestamps
    last_login  timestamp[6] with time zone,
    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};

# List of moderator actions
CREATE TABLE mod_log {
    id          SERIAL primary key,

    mod         integer not null references user(id),
    action      text not null,
    reason      text not null,

    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};

CREATE TABLE link_flags {
    link   integer not null references links(id),
    user   integer not null references users(id),
    reason flag_reason not null,
    primary key (link, user)
};

CREATE TABLE tag_filters {
    user integer not null references users(id),
    tag  integer not null references tags(id),

    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};

CREATE TABLE boards {
    id          SERIAL       primary key,
    uuid        varchar(36)  not null UNIQUE,

    user integer not null references users(id),
    links integer not null references board_links(id),
    description text not null default "",

    upvotes     bigint       not null default 0,
    downvotes   bigint       not null default 0,
    hotness     numeric(20, 10) not null default 0.0,

    created_at  timestamp[6] with time zone not null,
    updated_at  timestamp[6] with time zone
};


