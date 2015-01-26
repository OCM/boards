# api

## Structure

## Database Schema
### Tables

Links have:
    - name
    - link
    - upvotes
    - downvotes
    - tags -> reference to tag
    - submitter -> reference to user
    - timestamp

Users have
    - username
    - email
    - password
    - description
    - website
    - karma (upvotes and downvotes for submissions)
    - account creation date
    - submitted links -> reference to links
    - rank (admin, banned, standard)
    - API user?
    - Applications -> reference to applications

Tags have
    - links -> reference to links
    - description
    - title

Applications have
    - Name
    - Description
    - Requested endpoints -> reference to endpoints

Endpoints have
    - Name
    - Purpose


### Permissions

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


## Stack Used
[Express.js](http://expressjs.com/)
[Node.js](nodejs.org)
[PostgreSQL](http://www.postgresql.org/)
[Passport.js](http://passportjs.org/)

