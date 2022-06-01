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

### Creating an account:
* Create an account by clicking _Sign Up_ from the log-in screen
* Provide a name, username, avatar, email, and password to make an account

### Logging in:
* Existing users can log in by entering their username and password

### Managing Groups
Creating a group
* Go to Groups (on the nav bar) > Create Group
* Enter a group ID and password to create a group  

Joining a group
* Go to Groups (on the nav bar) > Join Group
* Enter a group ID and password to join a group  

Leaving a group
* ???

### Managing Tasks
* create a task
* edit a task
* remove a task

### Editing Profile
* change name
* change pfp
* change email
