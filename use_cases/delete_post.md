
## Delete a post (Tom Schwartz)

## Actors
User (Primary)

## Preconditions
- Account must be in database.
- User is logged in.
- User must have at least 1 post.

## Postconditions.
- Deleted post is gone and unseen from all users in the database (deleted).

## Main Flow
| User | System |
| ----------------------- | ----------------------- |
| Once logged in, clicks on "delete post" (This option is under each of the users personal posts) | Display new post screen |
| Enter the confirmation numbers to confirm deletion | update screen to show user's input |
| Click on "Delete" | Change screen to user's feed and show the existing post (obviously the delete post will not show) |

## Alternate Flow
| User | System |
| ----------------------- | ----------------------- |
| Error on confirmation numbers | The numbers entered are not matching the confirmation ones |
| If the post is not the user's | no "Delete" button will show |
