var schema = {
    links: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      title: {type: 'string', maxlength: 150, nullable: false},
      upvotes: {},
      downvotes: {},
      meta_title: {type: 'string', maxlength: 150, nullable: true},
      meta_description: {type: 'string', maxlength: 200, nullable: true},
      submitter: {type: 'integer', nullable: false},
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      status: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'review'},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      featured: {type: 'bool', nullable: false, defaultTo: false}
    },
    users: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false, unique: true},
      password: {type: 'string', maxlength: 60, nullable: false},
      email: {type: 'string', maxlength: 254, nullable: false, unique: true},
      image: {type: 'text', maxlength: 2000, nullable: true},
      bio: {type: 'string', maxlength: 200, nullable: true},
      website: {type: 'text', maxlength: 2000, nullable: true},
      location: {type: 'text', maxlength: 65535, nullable: true},
      status: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'active'},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      meta_title: {type: 'string', maxlength: 150, nullable: true},
      meta_description: {type: 'string', maxlength: 200, nullable: true},
      last_login: {type: 'dateTime', nullable: true},
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      submissions: {},
      permissions: {},
    },
    roles: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true},
      created_at: {type: 'dateTime',  nullable: false},
      created_by: {type: 'integer',  nullable: false},
      updated_at: {type: 'dateTime',  nullable: true},
      updated_by: {type: 'integer',  nullable: true}
    },
    permissions: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      object_type: {type: 'string', maxlength: 150, nullable: false},
      action_type: {type: 'string', maxlength: 150, nullable: false},
      object_id: {type: 'integer', nullable: true},
      created_at: {type: 'dateTime', nullable: false},
      created_by: {type: 'integer', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      updated_by: {type: 'integer', nullable: true}
    },
    tags: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true},
      parent_id: {type: 'integer', nullable: true},
      links: {},
      created_at: {type: 'dateTime', nullable: false},
      created_by: {type: 'string', nullable: false},
    }
  };

module.exports = schema;

/*




    Links have:
        id *[bigserial]
        name [varchar(1024)]
        link [varchar(1024)]
        upvotes [integer]
        downvotes [integer]
        tags -> reference to tag
        submitter -> reference to user
        timestamp [timestamp(0)]

    Users have:
        id *[serial]
        username [varchar(255)]
        email [varchar(255)]
        password [char(82)]
        description [text]
        website [varchar(1024)]
        karma [bigint]
        creation [timestamp(0)]
        submitted links -> reference to links
        rank [???]
        api_token [char(82)]
        Applications -> reference to applications

    Tags have:
        id *[serial]
        links -> reference to links
        description [varchar(255)]
        title [varchar(255)]

    Applications have:
        id *[serial]
        Name [varchar(255)]
        Description [text]
        Requested endpoints -> reference to endpoints

    Endpoints have:
        Name
        Purpose

* means primary key

You might consider using UUIDs for links, users, and tags to allow the database to be sharded properly in the future.

How do you plan on doing references to tags? Just an array of IDs?

Assumed 256-bit scrypt encoded in base64 for passwords. Length should be updated appropriately for different approaches.

For user access control, you may want to consider both text-based and integer-based solutions.

Karma has been specified as a bigint for scaling purposes, but this will likely be incompatible with your code. I think you mentioned using something like Django, so this may need to be integer type.

API access should be done with tokens or ssh keys, so I've assumed a scrypt hash for the "API User?" field. False would correspond with an empty field.

How many tags are we talking? If it's fewer than a thousand, a bitmap would be a really intelligent and efficient approach, which would allow you to do some sophisticated data analysis for searching and what not.

0001 -> Tag for "Physics"
0010 -> Tag for "Computer Science"
0011 -> Tags: Computer Science & Physics.
*/
