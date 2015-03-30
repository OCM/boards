CREATE TYPE link_status as enum ('review', 'published', 'hidden');

CREATE TABLE links {
    id          SERIAL,
    uuid        varchar(36)  not null,

    link        varchar(150) not null,
    title       varchar(150) not null,
    description varchar(200) not null,
    language    varchar(6)   not null default 'en_US',

    upvotes     bigint       not null default 0,
    downvotes   bigint       not null default 0,
    status      link_status  not null default 'review',

    submitter   integer      not null references users(id),
    tags        integer      not null references tags(id),

    created_at timestamp[6] with time zone not null,
    updated_at timestamp[6] with time zone
};

CREATE TABLE tags {
    id          SERIAL,
    uuid        varchar(36)  not null,

    link        varchar(150) not null,
    title       varchar(150) not null,
    description varchar(200) not null,
    language    varchar(6)   not null default 'en_US',

    upvotes     bigint       not null default 0,
    downvotes   bigint       not null default 0,
    status      link_status  not null default 'review',

    submitter   integer      not null references users(id),
    tags        integer      not null references tags(id),

    created_at timestamp[6] with time zone not null,
    updated_at timestamp[6] with time zone
};

CREATE TABLE users {

};

CREATE TABLE roles {

};

    tags: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: false},
      links: {type: 'integer', nullable: true}, // references link(s)
      creator: {type: 'string', nullable: false} // references user
    },
    users: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false, unique: true},
      username: {type: 'string', maxlength: 150, nullable: false, unique: true},
      password: {type: 'string', maxlength: 60, nullable: false},
      email: {type: 'string', maxlength: 254, nullable: false, unique: true},
      image: {type: 'text', maxlength: 2000, nullable: true},
      bio: {type: 'string', maxlength: 200, nullable: true},
      karma: {type: 'bigInteger', maxlength: 65535, nullable: false},
      website: {type: 'text', maxlength: 2000, nullable: true},
      location: {type: 'text', maxlength: 65535, nullable: true},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      last_login: {type: 'dateTime', nullable: true},
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      submissions: {type: 'integer', nullable: true}, // references links
      role: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'active'},
    },
    roles: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true}
    }
  };

