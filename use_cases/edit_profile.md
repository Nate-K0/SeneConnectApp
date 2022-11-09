## Edit User Profile (Tony Deleanu)

### Actors
User (primary)<br>System

### Preconditions
- User created an account and is logged into System
- User is viewing profile while logged in

### Postconditions
- System updates user profile information

### Main Flow
| User | System |
| ----------- |  ----------- |
| 1. Request to edit profile | Display profile information (username, email, password, profile picture, bio) |
| 2. Select information to edit | Display section to modify |
| 3. Change information and submit | If valid input, process request, save profile in database, display user profile.<br>Otherwise, show error: try again, repeat step 3 |

### Alternate Flows
| Alternate Flow | Description |
| ----------- |  ----------- |
| Error displayed | Entered incorrect information during edit |
| Removed information | User removes profile picture or bio |
| Cancel edit profile | No action needed |
