# Post-Ed

## TO create a super user

### ``cd server``
### ``python manage.py createsuperuser``

`rm -f db.sqlite3
rm -r snippets/migrations
python manage.py makemigrations snippets
python manage.py migrate`