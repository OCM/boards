psql -U atrus -d atrus -h localhost -f schema.sql
psql -U atrus -d atrus -h localhost -f add_users.sql
psql -U atrus -d atrus -h localhost -f add_links.sql
psql -U atrus -d atrus -h localhost -f add_tags.sql
psql -U atrus -d atrus -h localhost -f add_link_tags.sql
