CREATE TYPE roles AS ENUM ('banned', 'user', 'mod', 'admin');
CREATE TYPE link_status AS ENUM ('review',
                                 'published',
                                 'hidden',
                                 'flagged');
CREATE TYPE flag_reason AS ENUM ('Off-topic',
                                 'Already posted',
                                 'Poorly tagged',
                                 'Poorly titled',
                                 'Spam',
                                 'Against Code of Conduct');
CREATE TYPE email_settings AS ENUM ('none', 'some', 'all');


CREATE TABLE links (
    id          SERIAL          primary key,
    short_name  varchar(6)      not null UNIQUE,

    url         varchar(150)    not null,
    title       varchar(150)    not null,
    description varchar(200)    not null,
    language    varchar(6)      not null default 'en_US',

    upvotes     bigint          not null default 0,
    downvotes   bigint          not null default 0,
    hotness     numeric(20, 10) not null default 0.0,

    status      link_status     not null default 'review',

    user_id     integer         not null,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone
);


CREATE TABLE link_tags (
    link_id integer not null,
    tag_id  integer not null,
    primary key (link_id, tag_id)
);


CREATE TABLE tags (
    id          SERIAL       primary key,

    name        varchar(150) not null UNIQUE,
    description varchar(200) not null,

    user_id     integer      not null,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone
);


CREATE TABLE users (
    id          SERIAL       primary key,

    name        varchar(150) not null UNIQUE,
    username    varchar(150) not null UNIQUE,
    password    varchar(60)  not null,
    email       varchar(254) not null UNIQUE,

    bio         varchar(254) not null default '',
    karma       bigint       not null default 0,
    website     varchar(200) not null default '',
    location    text         not null default '',
    language    varchar(6)   not null default 'en_US',
    role        roles        not null default 'user',

    allow_email email_settings not null default 'all',

    last_login  timestamp with time zone,
    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone
);


CREATE TABLE mod_log (
    id          SERIAL primary key,

    mod_user_id integer not null,
    action      text    not null,
    reason      text    not null,

    src_user_id integer,
    link_id     integer,
    tag_id      integer,
    user_id     integer,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone
);


CREATE TABLE link_flags (
    link_id integer     not null,
    user_id integer     not null,
    reason  flag_reason not null,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone,

    primary key (link_id, user_id)
);


CREATE TABLE hidden_tags (
    user_id integer not null,
    tag_id  integer not null,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone,

    primary key (user_id, tag_id)
);


CREATE TABLE hidden_links (
    user_id integer not null,
    link_id integer not null,

    created_at  timestamp with time zone not null,
    updated_at  timestamp with time zone,

    primary key (user_id, link_id)
);


