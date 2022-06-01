#!/bin/bash




python3 -m venv venv
source venv/bin/activate
pip3 install -U -r requirements.txt

rm -f db.sqlite3
rm -r user/migrations posted_app/migrations

python manage.py makemigrations user
python manage.py migrate

python manage.py makemigrations posted_app

python manage.py migrate