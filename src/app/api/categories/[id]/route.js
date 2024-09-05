import { connectToDB, Category } from "../../../utils/db";

export async function DELETE(request, { params }) {
  await connectToDB();
  const { id } = params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedCategories = await Category.find({});
    return new Response(JSON.stringify(updatedCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
