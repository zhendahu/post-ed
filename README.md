# _Post-Ed_

## Setting Up

### Creating a super user:
* ``cd server``
* ``python manage.py createsuperuser``

### Running a server:
* `rm -f db.sqlite3`
* `rm -r user/migrations posted_app/migrations`
* `pip install django djangorestframework-simplejwt djangorestframework`
* `python manage.py makemigrations`
* `python manage.py migrate`
* `python manage.py runserver`

### Running a client:
* `cd client`
* `npm install`
* `npm start`

## How to Use

### Logging in:
* how to make an account
* how to log in

### Managing Groups
* how to create a group
* how to join a group

### Managing Tasks
* create a task
* edit a task
* remove a task
