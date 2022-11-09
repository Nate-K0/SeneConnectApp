## Search for User (Tony Deleanu)

### Actors
User (primary)<br>System

### Preconditions
- Accounts database is ready to search for users by username
- User created an account and is logged into System
- Username being searched for already exists in System

### Postconditions
- User performs action after searching by username
- System updates followers and following counts for every user
- System sends new follower notification

### Main Flow
| User | System |
| ----------- |  ----------- |
| 1. Request to search for user | Display search field |
| 2. Enter username and search | If user exists, display list of possible users from keyword.<br>Otherwise, show error: cannot find user, repeat step 2 |
| 3. Select user | Display user account details (username, followers, following,<br>posts, profile picture) |
| 4. If user found, follow account. Otherwise,<br>perform another action | Process request, save followers and following count in<br> database, display new follower notification |

### Alternate Flows
| Alternate Flow | Description |
| ----------- |  ----------- |
| Error displayed | Entered incorrect information during search |
| Blocked | User blocks account |
| Unfollowed | User unfollows account already following |
| Return to search | No action needed |
