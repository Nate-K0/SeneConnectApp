## Creating Account (by Nathan Kenopic)

### Actor
User

### Pre-conditions
- Accounts database is set up and ready to add new accounts
- User is not already logged in

### Main Flow
| User | System |
| ----------- |  ----------- |
| Clicks sign up button in the account info tab if the user is not already logged in | Shows the signup screen, asks for username, email, and password |
| Enter username, email, and password | Check if the users account info is valid, if yes then activate the submit button |
| Click the submit button | Saves the account info into the database and shows account created confirmation message |

### Alternate Flows
| User | System |
| ----------- |  ----------- |
| If the user is already logged in | Shows the account info and a signout button |
| If the user entered invalid info | Asks user to reenter account info |

### Postconditions
User successfully creates an account
