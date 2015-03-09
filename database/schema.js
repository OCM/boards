var schema = {
    links: {
      id: {type: 'bigIncrements', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      title: {type: 'string', maxlength: 150, nullable: false},
      upvotes: {type: 'integer', maxlength: 65535, nullable: true},
      downvotes: {type: 'integer', maxlength: 65535, nullable: true},
      meta_title: {type: 'string', maxlength: 150, nullable: true},
      meta_description: {type: 'string', maxlength: 200, nullable: true},
      submitter: {type: 'integer', nullable: false}, // references user
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      status: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'review'},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      tags: {type: 'integer', nullable: false} // references tags
    },
    tags: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true},
      links: {type: 'integer', nullable: true}, // references link(s)
      submitter: {type: 'string', nullable: false} // references user
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
      karma: {type: 'bigInteger', maxlength: 65535, nullable: true},
      website: {type: 'text', maxlength: 2000, nullable: true},
      location: {type: 'text', maxlength: 65535, nullable: true},
      language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
      last_login: {type: 'dateTime', nullable: true},
      created_at: {type: 'dateTime', nullable: false},
      updated_at: {type: 'dateTime', nullable: true},
      submissions: {type: 'integer', nullable: true}, // references links
      roles: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'active'},
    },
    roles: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      description: {type: 'string', maxlength: 200, nullable: true}
    }
    /* TODO: Permissions and Defined Roles
    roles_users: {
      id: {type: 'increments', nullable: false, primary: true},
      role_id: {type: 'integer', nullable: false},
      user_id: {type: 'integer', nullable: false}
    },
    permissions: {
      id: {type: 'increments', nullable: false, primary: true},
      uuid: {type: 'string', maxlength: 36, nullable: false},
      name: {type: 'string', maxlength: 150, nullable: false},
      object_type: {type: 'string', maxlength: 150, nullable: false},
      action_type: {type: 'string', maxlength: 150, nullable: false},
      object_id: {type: 'integer', nullable: true}
    },
    permissions_users: {
      id: {type: 'increments', nullable: false, primary: true},
      user_id: {type: 'integer', nullable: false},
      permission_id: {type: 'integer', nullable: false}
    },
    permissions_roles: {
      id: {type: 'increments', nullable: false, primary: true},
      role_id: {type: 'integer', nullable: false},
      permission_id: {type: 'integer', nullable: false}
    }*/
  };

module.exports = schema;
