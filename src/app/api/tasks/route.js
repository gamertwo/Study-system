import { connectToDB, Task, Category } from "../../utils/db";

export async function GET(request) {
  await connectToDB();
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const time = searchParams.get("time");
  const date = searchParams.get("date");
  const priority = searchParams.get("priority");

  let query = {};

  if (category) {
    query.category = category;
  }

  if (time) {
    query.dueDate = { $gte: new Date(time) };
  }

  if (date) {
    query.dueDate = { $gte: new Date(date), $lt: new Date(date) + 86400000 };
  }

  if (priority) {
    query.priority = priority;
  }

  const tasks = await Task.find(query).populate("category");
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  await connectToDB();
  const taskData = await request.json();
  
  try {
    let category = await Category.findOne({ name: taskData.category });
    if (!category) {
      category = new Category({ name: taskData.category });
      await category.save();
    }

    const newTask = new Task({
      ...taskData,
      category: category._id
    });
    await newTask.save();

    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request) {
  await connectToDB();
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  try {
    await Task.findByIdAndDelete(id);
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
