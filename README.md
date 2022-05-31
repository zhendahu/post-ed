# Post-Ed

## To create a super user

* ``cd server``
* ``python manage.py createsuperuser``

## To run server
* `rm -f db.sqlite3`
* `rm -r user/migrations posted_app/migrations`
* `python manage.py makemigrations`
* `python manage.py migrate`