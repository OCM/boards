var schema = {
    links: {
      id: {type: 'bigIncrements', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      link: {type: 'string', maxlength: 150, nullable: false},
      upvotes: {type: 'integer', maxlength: 65535, nullable: false},
      downvotes: {type: 'integer', maxlength: 65535, nullable: false},
      title: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true},
      submitter: {type: 'integer', nullable: false}, // references user
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      status: {type: 'string', maxlength: 30, nullable: false, defaultTo: 'review'},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      tags: {type: 'integer', nullable: false} // references tags
    },
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

module.exports = schema;
