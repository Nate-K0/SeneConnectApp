
### Create a new Post (Tom Schwartz)

### Actors
User (Primary)

### Preconditions
- Account must be in database.
- User is logged into the system.

### Postconditions
- New post is shown on user's account/linked to.
- (optional) Post can be searched up linking to the user.

### Main Flow

| User | System |
| -------------------- | -------------------- |
| Once logged in, clicks on "create a new post" | Display new post screen |
| Enter words, pictures or a video in the post | update screen to show user's input |
| Click on "post" | Change screen to user's feed and newly created post |

### Alternate Flow
| User | System |
| -------------------- | -------------------- |
| Error on post detail | The post may have words that are not appropriate or not know |
| If there is no user logged in | Prompt to first loggin before posting anything |
