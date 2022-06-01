_Post-Ed_
=======
Setting Up
=======
To create a super user:
-----------

* ``cd server``
* ``python manage.py createsuperuser``

To run server:
-----------
* `rm -f db.sqlite3`
* `rm -r user/migrations posted_app/migrations`
* `pip install django djangorestframework-simplejwt djangorestframework`
* `python manage.py makemigrations`
* `python manage.py migrate`
* `python manage.py runserver`

To run client:
-----------
* `cd client`
* `npm install`
* `npm start`


How to Use
=======
Logging in:
-------
