// Add this to your router file alongside other model definitions

const GroupSchema = new mongoose.Schema(
  {
    group_name: {
      type: String,
      required: true,
      unique: true, // Group names should be unique
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    course_id: {
      // The specific course this group is following
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    members: [
      // Array of user IDs who are part of this group
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    created_by: {
      // The admin/teacher who created the group
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // You could add a `group_leader` field if needed
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", GroupSchema);
