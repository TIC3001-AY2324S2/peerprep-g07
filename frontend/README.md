# Frontend Set-up Guide

## Set-up
1. Ensure you have Python 3.10.2. You can download it  [here](https://www.python.org/downloads/release/python-3102/).
    - MacOS: macOS 64-bit universal2 installer
    - Windows: Windows installer (64-bit)
2. Navigate to the frontend directory
```
cd peerprep-g07/frontend
```
3. Create the virtual environment with the following command. This will set up a directory called `env` in your current directory. This `env` directory will store the project's dependencies.
```
python3 -m venv env
```
4. Activate the environment
```
source env/bin/activate
```
5. Install the required dependencies for this project with the following command. This installs the python modules needed for the project to run, such as the `Django` and `requests` modules.
```
pip install -r requirements.txt
```
6. Run the frontend (ensure you are in the same directory as the manage.py file)
```
python manage.py runserver
```
7. Access the frontend from your web browser at this url `http://127.0.0.1:8000/peerprep`
8. Use the command `deactivate` to exit the virtual environment when done.