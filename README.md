# Atrus

## Core Feature Set (MVP)

- Ability to search for topic
- Ability to discover random content
- Ability to create account
- Ability to submit links and tags
- Ability to upvote/downvote content
- Ability to link save content (?)
- Ability to flag irrelevant content
- Gravatar Images

## Future Feature Set

- Ability to create personal boards
- Pushover Notifications
- Email Digest (Mailchimp)
- Difficulty
- Parent tags, dependent tags (Tag Hierarchy)

## Routes
```
/
/login
/t/:tag
/u/:user
/settings
/q?...
/about (Static)
/contact (Static)
/donate (Static)
```

## API Workflow:
1. User visits route.
2. Do Authentication
3. Get Require data from DB.
4. Populate template
5. Return rendered page to user. 

## Tag Categories

- __Blue__: Computer Science
- __Green__: Design
- __Red__: Literature
- __Yellow__: Engineering
- __Black__: Mathematics
- __White__: Physical Sciences
- __Violet__: Social Sciences

```
.
├── Blue - Computer Science (http://bit.ly/19L8QKw)
│   ├── Web Programming
│   ├── Mathematical Foundations
│   ├── Algorithms
│   ├── Data Structures
│   ├── Artificial Intelligence
│   ├── Communications
│   ├── Security
│   ├── Computer Architecture
│   ├── Computer Graphics
│   ├── Distributed Systems
│   ├── Databases
│   ├── Programming Languages
│   ├── Software Engineering
│   ├── Scientific Computing
│   └── Computation Theory
├── Green - Design (http://bit.ly/19L9hof)
│   ├── Object Design
│   ├── System Design
│   ├── Design Tools
│   ├── Experience Design
│   ├── Environment Design
│   ├── Communications
│   ├── Security
│   ├── Computer Architecture
│   ├── Computer Graphics
│   ├── Distributed Systems
│   ├── Databases
│   ├── Programming Languages
│   ├── Software Engineering
│   ├── Scientific Computing
│   └── Computation Theory
├── Yellow - Engineering
├── Black  - Mathematics
├── White  - Physical Sciences
├── Violet - Social Sciences
│   ├── Anthropology
│   ├── Archeology
│   ├── Economics
│   ├── Education
│   ├── Psychology 
│   └── Sociology
└── Red - Literature
    ├── Oral Literature
    ├── Written Literature
    └── Historical Literature
```

## Permissions

Each permission group gets all the permissions of the ones below

- Banned: Can't log in.
- User: Can log in, submit links, vote, etc.
- Admin: Can:
    - Add tags
    - Remove tags
    - Promote/demote users
    - Modify link titles
    - Remove links
    - Move link between tags
    - Change tag description
    - Ban users


## Stack

- [Express.js](http://expressjs.com/)
- [Node.js](nodejs.org)
- [PostgreSQL](http://www.postgresql.org/)
- [Passport.js](http://passportjs.org/)

# Useful Links or Resources
- PG on Ubuntu: https://help.ubuntu.com/community/PostgreSQL
- Promises: https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example

