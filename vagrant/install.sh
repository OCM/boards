##############################
# Declare Versions
##############################
PG_VERSION=9.3
HOST=localhost


##############################
# Install JQ for JSON parsing
##############################
wget http://stedolan.github.io/jq/download/linux64/jq
chmod +x ./jq
sudo cp jq /usr/bin


##############################
# Install PostGres
# ##############################

sudo apt-get update -y
sudo apt-get install -y postgresql postgresql-contrib

# PG_REPO_APT_SOURCE=/etc/apt/sources.list.d/pgdg.list

# if [ ! -f "$PG_REPO_APT_SOURCE" ]
# then
#   # Add PG apt repo:
#   echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" > "$PG_REPO_APT_SOURCE"

#   # Add PGDG repo key:
#   wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
# fi

# sudo apt-get update
# sudo apt-get -y upgrade

# sudo apt-get -y install "postgresql-$PG_VERSION" "postgresql-contrib-$PG_VERSION"
# PG_CONF="/etc/postgresql/$PG_VERSION/main/postgresql.conf"
# PG_HBA="/etc/postgresql/$PG_VERSION/main/pg_hba.conf"
# PG_DIR="/var/lib/postgresql/$PG_VERSION/main"
# sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_CONF"
# service postgresql restart


##############################
# Configure Database
##############################
DATABASE_USERNAME="atrus"
DATABASE_USERNAME_PASSWORD="atrus"
DATABASE_PASSWORD=sudo cat ../../vagrant/db.json | jq '.password'
DATABASE_NAME="atrus"

cat << EOF | su - postgres -c psql
-- Create the database user:
CREATE USER $DATABASE_USERNAME WITH PASSWORD 'DATABASE_USERNAME_PASSWORD';

-- Create the database:
CREATE DATABASE $DATABASE_NAME WITH OWNER=$DATABASE_USERNAME
                                  LC_COLLATE='en_US.utf8'
                                  LC_CTYPE='en_US.utf8'
                                  ENCODING='UTF8'
                                  TEMPLATE=template0;
EOF
echo "Successfully created PostgreSQL dev virtual machine."
echo ""

# sh ../../vagrant/scripts/build_db.sh

# sudo psql -U $DATABASE_USERNAME -d $DATABASE_NAME -h $HOST -f ./scripts/schema.sql
# sudo psql -U $DATABASE_USERNAME -d $DATABASE_NAME -h $HOST -f ./scripts/add_users.sql
# sudo psql -U $DATABASE_USERNAME -d $DATABASE_NAME -h $HOST -f ./scripts/add_links.sql
# sudo psql -U $DATABASE_USERNAME -d $DATABASE_NAME -h $HOST -f ./scripts/add_tags.sql
# sudo psql -U $DATABASE_USERNAME -d $DATABASE_NAME -h $HOST -f ./scripts/add_link_tags.sql
# sudo psql -U postgres -d $DATABASE_NAME -h $HOST -c "REVOKE connect ON DATABASE atrus FROM PUBLIC;"
# sudo psql -U postgres -d $DATABASE_NAME -h $HOST -c "GRANT connect ON DATABASE atrus TO atrus;"


##############################
# Download/Update Node.js
##############################
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
apt-get install -y build-essential
cd /vagrant/
npm install -g


##############################
# Install Tools
##############################
sudo apt-get install -y vim

