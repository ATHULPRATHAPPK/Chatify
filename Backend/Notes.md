database Model Diagram

+-----------------------------------+
|               Users               |
+-----------------------------------+
| _id: ObjectId (PK)                |
| username: String (Unique)         |
| email: String (Unique)            |
| contacts: []         |
| password: String                  |
| created_at: Date                  |
+-----------------------------------+

+-----------------------------------+
|              Messages             |
+-----------------------------------+
| _id: ObjectId (PK)                |
| sender_id: ObjectId (FK to Users) |
| recipient_id: ObjectId (FK to Users) |
| content: String                   |
| timestamp: Date                   |
+-----------------------------------+




u1u2




+-----------------------------------+
|              Users                |
+-----------------------------------+
| _id: ObjectId (PK)                |
| username: String (Unique)         |
| email: String (Unique)            |
| password: String                  |
| profile_picture: String           |
| status: String                    |
| last_active: Date                 |
| contacts: [ObjectId (FK)]         |
| created_at: Date                  |
| updated_at: Date                  |
+-----------------------------------+

+-----------------------------------+
|            Messages               |
+-----------------------------------+
| _id: ObjectId (PK)                |
| conversation_id: ObjectId (FK)    |
| sender_id: ObjectId (FK)          |
| content: String                   |
| timestamp: Date                   |
| message_type: String              |
| status: String                    |
| attachments: [String]             |
| reactions: [                      |
|   {                               |
|     user_id: ObjectId (FK)        |
|     reaction: String              |
|   }                               |
| ]                                 |
| is_deleted: Boolean               |
+-----------------------------------+

+-----------------------------------+
|          Conversations            |
+-----------------------------------+
| _id: ObjectId (PK)                |
| type: String                      |
| participants: [                   |
|   {                               |
|     user_id: ObjectId (FK)        |
|     role: String                  |
|   }                               |
| ]                                 |
| last_message: ObjectId (FK)       |
| created_at: Date                  |
| updated_at: Date                  |
+-----------------------------------+
<!-- ================================================ -->
<!-- ================================================ -->
<!-- ================================================ -->
<!-- ================================================ -->
<!-- ================================================ -->
<!-- ================================================ -->

+-----------------------------------+
|              Users                |
+-----------------------------------+
| _id: ObjectId (PK)                |
| username: String (Unique)         |
| email: String (Unique)            |
| password: String                  |
| profile_picture: String           |
| status: String                    |
| last_active: Date                 |
| contacts: [ObjectId (FK)]         |
| groups: [ObjectId (FK)]           |
| settings: ObjectId (FK)           |
| created_at: Date                  |
| updated_at: Date                  |
+-----------------------------------+

+-----------------------------------+
|            Messages               |
+-----------------------------------+
| _id: ObjectId (PK)                |
| conversation_id: ObjectId (FK)    |
| sender_id: ObjectId (FK)          |
| content: String                   |
| timestamp: Date                   |
| message_type: String              |
| status: String                    |
| attachments: [String]             |
| reactions: [                      |
|   {                               |
|     user_id: ObjectId (FK)        |
|     reaction: String              |
|   }                               |
| ]                                 |
| is_deleted: Boolean               |
+-----------------------------------+

+-----------------------------------+
|          Conversations            |
+-----------------------------------+
| _id: ObjectId (PK)                |
| type: String                      |
| participants: [                   |
|   {                               |
|     user_id: ObjectId (FK)        |
|     role: String                  |
|   }                               |
| ]                                 |
| last_message: ObjectId (FK)       |
| created_at: Date                  |
| updated_at: Date                  |
+-----------------------------------+

+-----------------------------------+
|          ReadReceipts             |
+-----------------------------------+
| _id: ObjectId (PK)                |
| message_id: ObjectId (FK)         |
| user_id: ObjectId (FK)            |
| read_at: Date                     |
+-----------------------------------+

+-----------------------------------+
|         UserSettings              |
+-----------------------------------+
| _id: ObjectId (PK)                |
| user_id: ObjectId (FK)            |
| theme: String                     |
| notifications: Boolean            |
| privacy: {                        |
|   last_seen: String               |
|   profile_picture: String         |
|   status: String                  |
| }                                 |
+-----------------------------------+

