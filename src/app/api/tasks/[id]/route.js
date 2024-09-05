import { connectToDB, Task } from "../../../utils/db";

export async function POST(request, { params }) {
  await connectToDB();
  const { id } = params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    task.completed = !task.completed;
    await task.save();

    return new Response(JSON.stringify(task), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error toggling task:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request, { params }) {
  await connectToDB();
  const { id } = params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
